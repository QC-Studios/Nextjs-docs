// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { docGroups, DocGroup } from "./docs/groups";
import { SearchBox } from "./components/SearchBox";
import { motion } from "framer-motion";

interface DocItem {
  title: string;
  href: string;
  group: string;
}

// Flatten all docs into single array
const allDocs: DocItem[] = docGroups.flatMap((group: DocGroup) =>
  group.items.map((item) => ({
    title: item.name,
    href: `/docs/${item.file.replace(".md", "")}`,
    group: group.title,
  }))
);

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredDocs = allDocs.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularDocs = allDocs.slice(0, 6); // First 6 as popular

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans">
      {/* Hero Section */}
      <header className="text-center py-32 px-6 relative overflow-hidden">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-extrabold mb-6 text-blue-400 tracking-tight"
        >
          Next.js 15 Docs
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-300 text-lg max-w-xl mx-auto mb-12"
        >
          Explore all your Next.js 15 knowledge in one place. Search, learn, and master Next.js faster.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-md mx-auto"
        >
          <SearchBox query={searchQuery} setQuery={setSearchQuery} />
        </motion.div>

        {/* Animated background circles */}
        {mounted && (
          <>
            <motion.div
              className="absolute w-72 h-72 bg-blue-600/20 rounded-full top-[-80px] left-[-80px] blur-3xl"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
            />
            <motion.div
              className="absolute w-96 h-96 bg-pink-600/20 rounded-full bottom-[-120px] right-[-100px] blur-3xl"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
            />
          </>
        )}
      </header>

      {/* Search Results */}
      {searchQuery.length > 0 && (
        <section className="px-6 pb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-6 text-gray-200"
          >
            Search Results
          </motion.h2>

          {filteredDocs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredDocs.map((doc, i) => (
                <motion.div
                  key={doc.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                >
                  <Link href={doc.href}>
                    <h3 className="text-xl font-semibold text-white mb-2">{doc.title}</h3>
                    <p className="text-gray-400 text-sm">{doc.group}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No results found.</p>
          )}
        </section>
      )}

      {/* Popular Docs */}
      {searchQuery.length === 0 && (
        <section className="px-6 pb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-6 text-gray-200"
          >
            Popular Topics
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {popularDocs.map((doc, i) => (
              <motion.div
                key={doc.href}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
              >
                <Link href={doc.href}>
                  <h3 className="text-xl font-semibold text-white mb-2">{doc.title}</h3>
                  <p className="text-gray-400 text-sm">{doc.group}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>
          Crafted with ❤️ by <span className="text-blue-400 font-semibold">Abhay</span>
        </p>
      </footer>
    </div>
  );
}
