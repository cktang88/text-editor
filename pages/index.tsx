import Link from "next/link";
import Layout from "../components/Layout";
import Tiptap from "../components/TipTap";
import {
  // ViewPort, // TODO: use
  LeftResizable,
  RightResizable,
  Top,
  Bottom,
  Fixed,
  Fill,
} from "react-spaces";
import FileBrowser from "../components/FileBrowser";

const IndexPage = () => {
  // fix for "document is not defined" error for Next.js SSR
  if (typeof window === "undefined") {
    return null;
  }
  const padStyle = {
    padding: "20px",
    border: "1px solid gray",
    minHeight: "50%",
  };
  return (
    <Layout title="Text Editor">
      <Fixed height={900}>
        <Top size={25}>
          <h1>text editor 👋</h1>
        </Top>
        <LeftResizable size="20%">
          <div style={{ margin: "20px" }}>
            <FileBrowser />
          </div>
        </LeftResizable>
        <Fill>
          <div style={padStyle}>
            <Tiptap />
          </div>
        </Fill>
        <RightResizable size="40%">
          <div style={padStyle}>
            <Tiptap />
          </div>
        </RightResizable>
        <Bottom size={100}>
          <p>
            <Link href="/about">
              <a>About</a>
            </Link>
          </p>
        </Bottom>
      </Fixed>
    </Layout>
  );
};

export default IndexPage;
