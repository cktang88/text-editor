import Link from "next/link";
import Layout from "../components/Layout";
import FileBrowser from "../components/filebrowser/FileBrowser";
import { useEffect, useState } from "react";
import PaneView from "../components/PaneView";
import { mutate } from "swr";

const IndexPage = () => {
  // fix for "document is not defined" error for Next.js SSR
  if (typeof window === "undefined") {
    return null;
  }

  const [currentFolderId, setcurrentFolderId] = useState<string | null>(null);

  useEffect(() => {
    console.log("CURRENT FOLDER: ", currentFolderId);
  }, [currentFolderId]);
  return (
    <Layout title="Text Editor">
      <div style={{ display: "flex", marginRight: 50 }}>
        <div style={{ margin: "20px", minWidth: "300px" }}>
          <h2>text editor</h2>
          <FileBrowser
            onFolderChange={(folderId) => {
              if (currentFolderId == folderId) {
                return;
              }
              setcurrentFolderId(folderId);
              // refresh panes listing
              mutate("/api/pane/list", [], true);
            }}
          />
        </div>
        <PaneView currentFolderId={currentFolderId} />
      </div>
      <p>
        <Link href="/footer">
          <a>Footer</a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
