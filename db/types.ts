export type Folder = {
  name: string;
  parentId: string;
  createdAt: Number;
  updatedAt: Number;
};

export type Pane = {
  routeId: string;
  createdAt: Number;
  updatedAt: Number;
  rawHTML: string;
  textContent: string;
};
