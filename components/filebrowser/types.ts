export type TreeNode = {
  /** The component key. If not defined, an auto - generated index is used. */
  id?: string;
  /** The name prop passed into the Header component. */
  name: string;
  /** The children attached to the node. This value populates the subtree at the specific node.Each child is built from the same basic data structure.
   *
   * Tip: Make this an empty array, if you want to asynchronously load a potential parent. */
  children?: Array<TreeNode>;
  /** Toggled flag. Sets the visibility of a node's children. It also sets the state for the toggle decorator. */
  toggled?: boolean;
  /** Active flag. If active, the node will be highlighted.The highlight is derived from the node.activeLink style object in the theme. */
  active?: boolean;
};
