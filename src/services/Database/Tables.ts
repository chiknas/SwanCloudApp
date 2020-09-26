import {Table} from './types';

export enum AccountTableFields {
  TEXT = 'text',
  PORT = 'port',
  ADDRESS = 'address',
  USERNAME = 'username',
  PASSWORD = 'password',
  LAST_UPLOADED_TIMESTAMP = 'last_uploaded_timestamp',
}

const AccountTable: Table = {
  name: 'account',
  columns: [
    {
      name: AccountTableFields.TEXT,
      type: 'VARCHAR(255)',
      required: true,
    },
    {
      name: AccountTableFields.PORT,
      type: 'INT(5)',
      required: true,
    },
    {
      name: AccountTableFields.ADDRESS,
      type: 'VARCHAR(255)',
      required: true,
    },
    {
      name: AccountTableFields.USERNAME,
      type: 'VARCHAR(255)',
      required: true,
    },
    {
      name: AccountTableFields.PASSWORD,
      type: 'VARCHAR(255)',
      required: true,
    },
    {
      name: AccountTableFields.LAST_UPLOADED_TIMESTAMP,
      type: 'VARCHAR(255)',
      required: true,
    },
  ],
};

export const Tables: Table[] = [AccountTable];
