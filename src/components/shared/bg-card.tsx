type BgCardProps = {
  children: React.ReactNode;
  className?: string;
};

const BgCard = ({ children, className }: BgCardProps) => {
  return (
    <div
      className={`bg-white dark:bg-stone-800 p-5 rounded-xl shadow-md shadow-black/10 ${className}`}
    >
      {children}
    </div>
  );
};

export default BgCard;
