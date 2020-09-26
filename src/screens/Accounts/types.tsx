import {AccountTableFields} from 'services/Database/Tables';

export type Account = {
  [AccountTableFields.TEXT]: string;
  [AccountTableFields.ADDRESS]: string;
  [AccountTableFields.PORT]: number;
  [AccountTableFields.USERNAME]: string;
  [AccountTableFields.PASSWORD]: string;
  [AccountTableFields.LAST_UPLOADED_TIMESTAMP]: string;
};
