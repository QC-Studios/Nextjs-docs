"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navigation = ({ item }) => {
  const pathname = usePathname();

  return (
    <Link
      href={`/docs/${item.file.replace(".md", "")}`}
      className={`block py-1 text-sm transition-colors ${
        pathname.endsWith(item.file.replace(".md", ""))
          ? "text-blue-400 font-medium"
          : "text-gray-400 hover:text-white"
      }`}
    >
      {item.name}
    </Link>
  );
};

export default Navigation;
