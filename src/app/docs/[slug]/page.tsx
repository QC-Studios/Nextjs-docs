import fs from "fs/promises";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // better dark theme

export async function generateStaticParams() {
  const notesDir = path.join(process.cwd(), "src", "app", "docs", "notes");
  try {
    const files = await fs.readdir(notesDir);
    return files
      .filter((file) => file.endsWith(".md"))
      .map((file) => ({ slug: file.replace(".md", "") }));
  } catch (error) {
    console.error(`Error reading notes directory (${notesDir}):`, error);
    return [];
  }
}

export default async function DocPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "docs",
    "notes",
    `${params.slug}.md`
  );

  let content = "";
  try {
    content = await fs.readFile(filePath, "utf-8");
  } catch (error) {
    console.error(`Error reading file (${filePath}):`, error);
    return (
      <div className="text-red-500 p-8 font-semibold">
        File not found: {params.slug}.md
      </div>
    );
  }

  return (
    <article className="prose prose-invert prose-lg max-w-none leading-relaxed ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          h1: (props) => (
            <h1 className="text-4xl font-extrabold mt-8 mb-4 border-b border-gray-700 pb-2" {...props} />
          ),
          h2: (props) => (
            <h2 className="text-2xl font-bold mt-8 mb-3 text-blue-400" {...props} />
          ),
          h3: (props) => (
            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-200" {...props} />
          ),
          code: ({ className, children, ...props }) => (
            <code
              className={`${className || ""} bg-gray-800 text-blue-300 px-1.5 py-0.5 rounded text-sm`}
              {...props}
            >
              {children}
            </code>
          ),
          pre: (props) => (
            <pre
              className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto shadow-md"
              {...props}
            />
          ),
          a: (props) => (
            <a
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
              {...props}
            />
          ),
          ul: (props) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
          ol: (props) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
          p: (props) => <p className="text-gray-200 leading-7 mb-4" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
