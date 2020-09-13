import Link from "next/link";
import Layout from "../components/Layout";
import QuillEditor from "../components/QuillEditor";
import dynamic from "next/dynamic";
// import Tree from "../components/Tree";

const SlateNoSSRWrapper = dynamic(import("../components/EditorPane"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <div className="container mx-auto">
      <h1 className="text-3lg text-center m-4">Text Editor</h1>
    </div>
    <div className="flex flex-row">
      <div className="w-64 mx-4">
        <p className="bg-green-200 text-center">Notes</p>
        Tree view
        {/* <Tree /> */}
      </div>
      <div className="w-full mx-4">
        <p className="bg-blue-200 text-center">Note 1</p>
        <div className="border-gray-400 border-2 p-4 shadow-xl">
          {/* <EditorPane /> */}
          <SlateNoSSRWrapper />
          {/* <QuillEditor /> */}
        </div>
      </div>
    </div>

    <br></br>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
);

export default IndexPage;
