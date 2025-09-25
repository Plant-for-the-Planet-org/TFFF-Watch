"use client";

import Bold from "@tiptap/extension-bold";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { twJoin } from "tailwind-merge";

type RichToHTMLProps = {
  content: string | object;
  className?: string;
};

export default function RichToHTML({
  content,
  className = "",
}: RichToHTMLProps) {
  const editor = useEditor({
    extensions: [StarterKit, Bold],
    content, // Accepts both JSON and HTML string
    editable: false,
    immediatelyRender: false,
  });

  return (
    <div className={twJoin(className, "typo-p", "it-links")}>
      <EditorContent editor={editor} />
    </div>
  );
}
