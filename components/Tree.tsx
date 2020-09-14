import { FixedSizeTree } from "react-vtree";
import { useState } from "react";

interface NodeType {
  name: string;
  children?: NodeType[];
  isOpen?: boolean;
}

const tree: NodeType = {
  name: "Root #1",
  isOpen: true,
  children: [
    {
      children: [{ name: "Child #2" }, { name: "Child #3" }],
      name: "Child #1",
    },
    {
      children: [{ name: "Child #5" }],
      name: "Child #4",
      isOpen: true,
    },
  ],
};

const Node = ({ children, isOpen, name }: NodeType) => {
  const [_isOpen, toggleOpen] = useState(isOpen);
  return (
    <>
      <li>
        {children && (
          <button
            type="button"
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={(e) => toggleOpen(!_isOpen)}
          >
            {_isOpen ? "-" : "+"}
            {name}
          </button>
        )}
        {_isOpen && (
          <ul className="list-inside list-disc">
            {(children || []).map((e) => (
              <Node {...e} />
            ))}
          </ul>
        )}
      </li>
    </>
  );
};

const Tree = () => (
  <ul className="list-inside list-disc">
    <Node {...tree} />
  </ul>
);

export default Tree;
