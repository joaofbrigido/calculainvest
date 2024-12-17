/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState, useTransition } from "react";

interface FormState {
  success: boolean;
  message: string | null;
  errors: Record<string, string[]> | null;
}

export function useForm(
  action: (data: FormData, extraData?: any) => Promise<FormState>,
  initialState?: FormState,
  onSuccess?: () => Promise<void> | void
) {
  const [isPending, startTransition] = useTransition();

  const [formState, setFormState] = useState(
    initialState ?? { success: false, message: null, errors: null }
  );

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
    extraData?: any
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      const state = await action(data, extraData);

      if (state.success && onSuccess) {
        await onSuccess();
      }

      setFormState(state);
    });
  }

  return [formState, handleSubmit, isPending] as const;
}
