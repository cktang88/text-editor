import { FC, useMemo, useState } from "react";
import { Treebeard, TreeNode, TreeTheme } from "react-treebeard";
import { Folder } from "../interfaces";
import { useFolders } from "./hooks";

const INDENT = "20";

const FileBrowser: FC<{ onFolderChange: (_: string) => void }> = ({
  onFolderChange,
}) => {
  // const [data, setData] = useState(rawData);
  const [cursor, setCursor] = useState<TreeNode>();
  const { folders, isLoading, isError } = useFolders();
  const [data, setData] = useState({});
  useMemo(() => {
    // creates a tree structure out of folder listings
    const makeNode = (f: Folder, children: TreeNode[] = []) => ({
      name: f.name,
      id: f._id,
      children,
      toggled: true,
    });

    // 1. add roots
    const roots: TreeNode[] = (folders ?? [])
      .filter((f) => !f.parentId)
      .map((f) => {
        // only two levels down, quick hack lol
        const children = folders
          .filter((e) => e.parentId == f._id)
          .map((e) => makeNode(e));
        return makeNode(f, children);
      });
    let res = {
      name: "root",
      toggled: true,
      children: roots,
    };
    setData(res);

    return res;
  }, [folders]);

  const onToggle = (node: TreeNode, toggled: boolean) => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    onFolderChange(node.id);
    setData(Object.assign({}, data));
  };
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Treebeard
      data={data}
      onToggle={onToggle}
      animations={false} // turn off animations for faster responsiveness
      style={styleOverride}
    />
  );
};

const styleOverride: TreeTheme = {
  tree: {
    base: {
      listStyle: "none",
      backgroundColor: "white",
      margin: 0,
      padding: 0,
      color: "black",
      fontFamily: "lucida grande ,tahoma,verdana,arial,sans-serif",
      fontSize: "14px",
    },
    node: {
      base: {
        position: "relative",
      },
      link: {
        cursor: "pointer",
        position: "relative",
        // padding: `0px ${INDENT}px`,
        display: "block",
      },
      activeLink: {
        background: "#cae2eb",
      },
      toggle: {
        base: {
          position: "relative",
          display: "inline-block",
          verticalAlign: "top",
          //   marginLeft: `-${INDENT}px`,
          height: "24px",
          width: "24px",
        },
        wrapper: {
          position: "absolute",
          top: "50%",
          left: "50%",
          margin: "-7px 0 0 -7px",
          height: "14px",
        },
        height: 14,
        width: 14,
        arrow: {
          fill: "black",
          strokeWidth: 0,
        },
      },
      header: {
        base: {
          display: "inline-block",
          verticalAlign: "top",
          color: "black",
        },
        connector: {
          width: "2px",
          height: "12px",
          borderLeft: "solid 2px black",
          borderBottom: "solid 2px black",
          position: "absolute",
          top: "0px",
          left: "-21px",
        },
        title: {
          lineHeight: "24px",
          verticalAlign: "middle",
        },
      },
      subtree: {
        listStyle: "none",
        paddingLeft: `${INDENT}px`,
      },
      loading: {
        color: "#36ab16",
      },
    },
  },
};

export default FileBrowser;

// const rawData = {
//   name: "root",
//   toggled: true,
//   children: [
//     {
//       name: "parent",
//       children: [{ name: "child1" }, { name: "child2" }],
//     },
//     {
//       name: "loading parent",
//       children: [],
//     },
//     {
//       name: "parent",
//       children: [
//         {
//           name: "nested parent",
//           children: [{ name: "nested child 1" }, { name: "nested child 2" }],
//         },
//         { name: "child 1a" },
//         { name: "child 1b" },
//       ],
//     },
//   ],
// };
