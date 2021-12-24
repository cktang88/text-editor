import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Link } from "@tiptap/extension-link";
import { Highlight } from "@tiptap/extension-highlight";
import { Underline } from "@tiptap/extension-underline";
import { Image } from "@tiptap/extension-image";
import { Heading } from "@tiptap/extension-heading";
import { Blockquote } from "@tiptap/extension-blockquote";
import { CodeBlock } from "@tiptap/extension-code-block";
import { Gapcursor } from "@tiptap/extension-gapcursor";
import { Dropcursor } from "@tiptap/extension-dropcursor";

import { useCallback, useEffect } from "react";
import { Pane } from "../interfaces";

const SYNC_INTERVAL_MS = 5000;

const PaneComponent = ({ paneData }: { paneData: Pane }) => {
  const { rawHTML } = paneData;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link, // render links
      Highlight, // render highlight
      Underline, // render underlines
      Image, // render images
      Heading, // allow markdown style headings
      Blockquote, // markdown style blockquotes
      CodeBlock, // markdown style codeblock
      Dropcursor, // allows drag + drop images
      Gapcursor,
    ],
    content: rawHTML || "<p></p>".repeat(9),
  });

  const syncPane = useCallback(async () => {
    if (!editor) {
      console.log("NO EDITOR FOUND");
      return;
    }
    if (editor.getHTML() == rawHTML) {
      console.log("no change, skipping sync.");
      return;
    }
    console.log("syncing");
    // console.log(editor.getHTML(), rawHTML);
    await fetch(`/api/pane/update`, {
      method: "POST",
      body: JSON.stringify({
        paneId: paneData._id,
        rawHTML: editor.getHTML(),
        textContent: editor.getText({ blockSeparator: "" }),
      }),
    });
  }, [editor]);
  useEffect(() => {
    const timer = setInterval(() => {
      syncPane();
    }, SYNC_INTERVAL_MS);
    return function cleanup() {
      // 1. stop timer
      clearInterval(timer);
      // 2. do one last sync
      syncPane();
      console.log("did final sync, exiting");
      // 3. destroy editor
      editor?.destroy();
    };
  }, [editor]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <em style={{ fontSize: ".8em" }}>
          last mod {new Date(paneData.updatedAt).toLocaleString()}
        </em>
        <button
          onClick={() =>
            editor?.chain().focus().clearNodes().unsetAllMarks().run()
          }
          className={editor?.isActive("paragraph") ? "is-active" : ""}
        >
          Clear format
        </button>
      </div>
      <EditorContent editor={editor} />
    </>
  );
};

export default PaneComponent;
