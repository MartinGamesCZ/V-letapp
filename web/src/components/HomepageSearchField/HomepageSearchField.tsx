"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomepageSearchField() {
  const [value, setValue] = useState<string>("");

  const router = useRouter();

  const search = () => {
    console.log(value);
    router.push("/planner/search?q=" + value);
  };

  return (
    <Input
      onKeyUp={(e) => (e.key == "Enter" ? search() : () => {})}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    ></Input>
  );
}
