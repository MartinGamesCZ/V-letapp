import { TbChevronLeft } from "react-icons/tb";

export default function NavHeader({
  backIcon,
  title,
  onBack,
}: {
  backIcon?: (...props: any) => JSX.Element;
  title: string;
  onBack: () => void;
}) {
  const BackIcon = backIcon || TbChevronLeft;

  return (
    <div className={"flex justify-between items-center flex-row"}>
      <div
        className="p-2 rounded-md hover:bg-accent group transition-colors duration-200 cursor-pointer"
        onClick={onBack}
      >
        <BackIcon
          size={28}
          className="text-foreground/90 group-hover:text-foreground transition-colors duration-200"
        />
      </div>
      <p className="pb-1">{title}</p>
      <div className="w-11"></div>
    </div>
  );
}
