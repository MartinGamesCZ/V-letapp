import Image from "next/image";
import { Button } from "./button";
import Link from "next/link";

interface PlaceCardProps {
  title: string;
  description: string;
  images: string[];
  city: string;
  category: string;
  onClick?: () => void;
  buttonTitle?: string;
  mlink?: string;
}

export default function PlaceCard({
  title,
  description,
  images,
  city,
  category,
  onClick,
  buttonTitle,
  mlink,
}: PlaceCardProps) {
  return (
    <div className={"flex flex-col justify-center gap-2"}>
      <div className={"flex flex-col justify-center"}>
        <h1 className={"font-bold text-xl"}>{title}</h1>
        <p className="text-foreground/60 pb-1">
          {category} • {city}
        </p>
        <p>{description}</p>
      </div>
      <div className={"flex flex-row gap-2"}>
        {images.map((i) => (
          <div className={"rounded-md overflow-hidden"}>
            <Image src={i} width={512} height={512} alt={""} />
          </div>
        ))}
      </div>
      <Button onClick={onClick}>{buttonTitle}</Button>
      {mlink ? (
        <Link
          href={mlink}
          target="_blank"
          style={{
            textAlign: "center",
          }}
        >
          Navigovat
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}
