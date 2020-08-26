export type Column = {
  name: string;
  type: string;
  required?: boolean;
};

export type Table = {
  name: string;
  columns: Column[];
};

export const Tables: Table[] = [
  {
    name: "account",
    columns: [
      {
        name: "text",
        type: "VARCHAR(255)",
        required: true,
      },
      {
        name: "port",
        type: "INT(5)",
        required: true,
      },
      {
        name: "address",
        type: "VARCHAR(255)",
        required: true,
      },
      {
        name: "type",
        type: "VARCHAR(255)",
        required: true,
      },
    ],
  },
];
