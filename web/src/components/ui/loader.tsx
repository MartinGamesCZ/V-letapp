export type LoaderSize = "sm" | "md" | "lg";

const sizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",

  borders: {
    sm: "border-2",
    md: "border-4",
    lg: "border-4",
  },
};

export default function Loader({ size }: { size?: LoaderSize }) {
  return (
    <div className={sizes[size ?? "md"]}>
      <div
        className={
          sizes[size ?? "md"] +
          " " +
          sizes.borders[size ?? "md"] +
          " border-l-primary border-t-primary border-r-accent border-b-accent rounded-full animate-spin"
        }
      ></div>
    </div>
  );
}
