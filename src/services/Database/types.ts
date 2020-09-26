export type Column = {
  name: string;
  type: string;
  required?: boolean;
};

export type Table = {
  name: string;
  columns: Column[];
};
