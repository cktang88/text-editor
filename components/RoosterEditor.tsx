import React, { useState } from "react";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";

const _rooster = async () => {
  let roosterjs = await import("roosterjs");
  var editorDiv = document.getElementById("roosterroot");
  console.log(editorDiv);
  var editor = roosterjs.createEditor(editorDiv);
  editor.setContent("Welcome to <b>RoosterJs</b>!");
  console.log("rooster editor initialized");
  return editorDiv;
};

const RoosterNoSSRWrapper = dynamic(_rooster(), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const RoosterEditor = () => {
  const [value, setValue] = useState("");

  return <RoosterNoSSRWrapper />;
};
export default () => RoosterEditor;
