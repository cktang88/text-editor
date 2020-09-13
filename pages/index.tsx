import Link from "next/link";
import Layout from "../components/Layout";
import EditorPane from "../components/EditorPane";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1 className="">Text editor1</h1>
    <div className="container mx-auto">
      <h1 className="text-lg text-center m-4">TailwindUI/Next.js</h1>
      <p className="bg-green-600">
        This is a test of the tailwind next integration.
      </p>
    </div>
    ;
    <EditorPane />
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
);

export default IndexPage;
