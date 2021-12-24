// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export type Folder = {
  _id?: string; //mongo native id
  name: string;
  parentId: string;
  createdAt: Number;
  updatedAt: Number;
};

export type Pane = {
  _id?: string; //mongo native id
  routeId: string;
  createdAt: Number;
  updatedAt: Number;
  rawHTML: string;
  textContent: string;
};
