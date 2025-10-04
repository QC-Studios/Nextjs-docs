"use client";

import { useState } from "react";
import { docGroups } from "./groups";
import Link from "next/link";
import { usePathname } from "next/navigation";

// import "../globals.css";
import { SearchBox } from "../components/SearchBox";
// import ThemeToggle from "../components/ThemeToggle";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-background text-foreground font-sans antialiased transition-colors duration-300">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed z-50 md:z-auto bg-[#0d0d0d] w-72 border-r border-gray-800 p-6 h-screen
      transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          {/* Sidebar Header with Branding */}
<div className="flex items-center justify-between mb-6">
  <div>
    <h1 className="text-2xl font-bold text-white">Next.js Notes</h1>
    <p className="text-xs text-blue-400 font-semibold mt-1">by Abhay</p>
  </div>
  {/* Mobile Close Button */}
  <button
    className="md:hidden text-gray-400 hover:text-white"
    onClick={() => setSidebarOpen(false)}
  >
    ✕
  </button>
</div>


          <SearchBox query={searchQuery} setQuery={setSearchQuery} />

          <nav className="space-y-6 mt-6 overflow-y-auto h-[calc(100%-150px)] pr-2">
            {docGroups.map((group) => {
              const filteredItems = group.items.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
              );
              if (filteredItems.length === 0) return null;

              return (
                <div key={group.title}>
                  <h2 className="text-sm uppercase text-gray-400 font-semibold tracking-wide mb-2">
                    {group.title}
                  </h2>
                  <ul className="space-y-1 border-l border-gray-800 pl-3">
                    {filteredItems.map((item) => (
                      <li key={item.file}>
                        <Link
                          href={`/docs/${item.file.replace(".md", "")}`}
                          className={`block py-1 text-sm transition-colors ${
                            pathname.endsWith(item.file.replace(".md", ""))
                              ? "text-blue-400 font-medium"
                              : "text-gray-400 hover:text-white"
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-72 p-6 md:p-10 max-w-full mx-auto prose prose-invert prose-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
            {/* <ThemeToggle /> */}
          </div>
          {children}
          {/* <footer className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-400">
            <a
              href={`https://github.com/yourusername/docs-next-15/edit/main/src/app/docs/notes/${pathname
                .split("/")
                .pop()}.md`}
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              Edit this page on GitHub
            </a>
          </footer> */}
        </main>
      </div>
    </div>
  );
}
