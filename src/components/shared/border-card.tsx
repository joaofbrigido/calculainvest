const BorderCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`border border-border p-5 rounded-xl ${className}`}>
      {children}
    </div>
  );
};

export default BorderCard;
