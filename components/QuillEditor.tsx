import React, { useState } from "react";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const QuillEditor = () => {
  const [value, setValue] = useState("");

  return <QuillNoSSRWrapper theme="snow" value={value} onChange={setValue} />;
};
export default QuillEditor;
