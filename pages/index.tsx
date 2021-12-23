import Link from "next/link";
import Layout from "../components/Layout";
import Tiptap from "../components/TipTap";
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
    minWidth: 300,
    // width: "680px",
    // padding: 20,
    // border: "1px solid #ccc",
    // minHeight: "50%",
  };
  return (
    <Layout title="Text Editor">
      <div style={{ display: "flex", marginRight: 50 }}>
        <div style={{ margin: "20px", width: "300px" }}>
          <h2>text editor</h2>
          <FileBrowser />
        </div>
        <Split
          direction="horizontal"
          style={{ display: "flex" }}
          gutterSize={50}
          minSize={250}
        >
          <div style={padStyle}>
            <Tiptap />
          </div>
          <div style={padStyle}>
            <Tiptap />
          </div>
          <div style={padStyle}>
            <Tiptap />
          </div>
        </Split>
      </div>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
