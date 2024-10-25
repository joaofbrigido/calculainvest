const BorderCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`border border-foreground/15 p-5 rounded-xl ${className}`}>
      {children}
    </div>
  );
};

export default BorderCard;
