import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import Tiptap from "../components/TipTap";

const IndexPage = () => (
  <Layout title="Text Editor">
    <h1>text editor 👋</h1>
    <Tiptap />

    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
);

export default IndexPage;
