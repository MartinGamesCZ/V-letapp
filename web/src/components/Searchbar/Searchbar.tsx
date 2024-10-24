"use client";

import { Input } from "@/components/ui/input";
import styles from "./Searchbar.module.scss";
import { TbSearch } from "react-icons/tb";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useRouter } from "next/navigation";

interface ISearchbarProps {
  className?: string;
}

export default function Searchbar({ className }: ISearchbarProps) {
  const search = useSearchParams();
  const ref = useRef<HTMLInputElement>(null);

  const router = useRouter();

  function startSearch() {
    if (typeof window == "undefined") return;

    const q = ref.current?.value;

    if (!q) return;

    router.push(`/planner/search?q=${q}` + location.hash);
  }

  return (
    <div className={`${styles.root} ${className}`}>
      <Input
        placeholder="Hledat..."
        ref={ref}
        defaultValue={search.get("q") ?? ""}
        onKeyDown={(e) => {
          if (e.key == "Enter") startSearch();
        }}
      />
      <TbSearch onClick={startSearch} />
    </div>
  );
}
