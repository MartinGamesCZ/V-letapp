export default function NavCard({
  icon: Icon,
  label,
  onClick,
}: {
  icon: (...props: any) => JSX.Element;
  label: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={"flex gap-4 items-center group cursor-pointer width-full"}
    >
      <div
        className={
          "rounded-md p-2 bg-primary/80 group-hover:bg-primary/40 transition-colors duration-200"
        }
      >
        <Icon
          size={28}
          className={
            "text-accent group-hover:text-primary/90 transition-colors duration-200"
          }
          strokeWidth={1.5}
        />
      </div>
      <p
        className={
          "font-semibold text-lg text-foreground group-hover:text-primary/90 transitoin-colors duration-200"
        }
      >
        {label}
      </p>
    </div>
  );
}
