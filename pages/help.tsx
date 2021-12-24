import Link from "next/link";
import Layout from "../components/Layout";

const HelpPage = () => (
  <Layout title="Help">
    <h1>Help</h1>
    <div>
      <div>create new folder</div>
      <div>rename folder</div>
      <div>create new pane</div>
    </div>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export default HelpPage;
