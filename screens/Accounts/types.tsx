export type Account = {
  text: string;
  address: string;
  port: number;
  type: AccountType;
};

export enum AccountType {
  FTP = "ftp",
}
