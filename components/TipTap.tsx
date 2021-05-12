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

const testContent = `
        <h2>
          Hi there,
        </h2>
        <p>
          this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That’s a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
        </p>
        <pre><code class="language-css">body {
  display: none;
}</code></pre>
        <p>
          I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
        </p>
        <blockquote>
          Wow, that’s amazing. Good work, boy! 👏
          <br />
          — Mom
        </blockquote>
        <img src="https://source.unsplash.com/8xznAGy4HcY/800x400" />
        <p>
        More text here
        </p>
      `;

const Tiptap = () => {
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
    content: testContent || "<p></p>".repeat(9),
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
