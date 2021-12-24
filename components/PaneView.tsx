import PaneComponent from "../components/Pane";
import Split from "react-split";
import { usePanes } from "../components/hooks";
import { useMemo } from "react";

const padStyle = {
  // margin: 10,
  margin: 0,
  minWidth: 300,
  // width: "680px",
  // padding: 20,
  // border: "1px solid #ccc",
  // minHeight: "50%",
};

const PaneView = ({ currentFolderId }: { currentFolderId: string | null }) => {
  const { panes, isLoading, isError } = usePanes();

  const filteredPanes = useMemo(() => {
    const res = (panes ?? []).filter((e) => e.routeId == currentFolderId);
    console.log(res);
    return res;
  }, [currentFolderId, panes]);

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  if (!filteredPanes?.length) {
    return (
      <div style={{ fontSize: "1.5em" }}>
        <em>Empty</em>
      </div>
    );
  }
  return (
    <Split
      direction="horizontal"
      style={{ display: "flex" }}
      gutterSize={50}
      minSize={250}
    >
      {filteredPanes.map((p) => (
        <div style={padStyle}>
          <PaneComponent paneData={p} />
        </div>
      ))}
    </Split>
  );
};

export default PaneView;
