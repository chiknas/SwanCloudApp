export type Column = {
  name: string;
  type: string;
  required?: boolean;
};

export type Table = {
  name: string;
  columns: Column[];
};

const AccountTable: Table = {
  name: 'account',
  columns: [
    {
      name: 'text',
      type: 'VARCHAR(255)',
      required: true,
    },
    {
      name: 'port',
      type: 'INT(5)',
      required: true,
    },
    {
      name: 'address',
      type: 'VARCHAR(255)',
      required: true,
    },
    {
      name: 'username',
      type: 'VARCHAR(255)',
      required: true,
    },
    {
      name: 'password',
      type: 'VARCHAR(255)',
      required: true,
    },
  ],
};

export const Tables: Table[] = [AccountTable];
