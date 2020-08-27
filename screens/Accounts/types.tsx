export type Account = {
  text: string;
  address: string;
  port: number;
  type: AccountType;
  usename: string;
  password: string;
};

export enum AccountType {
  FTP = "ftp",
}
