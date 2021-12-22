import Link from "next/link";
import Layout from "../components/Layout";
import Tiptap from "../components/TipTap";
// import {
//   // ViewPort, // TODO: use
//   LeftResizable,
//   RightResizable,
//   Top,
//   Bottom,
//   Fixed,
//   Fill,
// } from "react-spaces";
import Split from "react-split";
import FileBrowser from "../components/FileBrowser";

const IndexPage = () => {
  // fix for "document is not defined" error for Next.js SSR
  if (typeof window === "undefined") {
    return null;
  }
  const padStyle = {
    // margin: 10,
    margin: 0,
    padding: 20,
    border: "1px solid #ccc",
    // minHeight: "50%",
  };
  return (
    <Layout title="Text Editor">
      <h1>text editor</h1>
      <Split direction="horizontal" style={{ display: "flex" }} gutterSize={20}>
        <div style={{ margin: "20px" }}>
          <FileBrowser />
        </div>
        <div style={padStyle}>
          <Tiptap />
        </div>
        <div style={padStyle}>
          <Tiptap />
        </div>
        <div style={padStyle}>
          <Tiptap />
        </div>
        <div style={padStyle}>
          <p>Add new</p>
        </div>
      </Split>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
