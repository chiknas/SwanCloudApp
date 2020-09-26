import FTP from 'react-native-ftp';
import {Account} from 'screens/Accounts/types';

export default class FtpClient {
  private login(account: Account): Promise<any> {
    FTP.setup(account.address, account.port);
    return FTP.login(account.usename, account.password);
  }

  uploadFiles(
    files: [],
    account: Account,
    successFileUpload?: (file: string) => void,
  ) {
    this.login(account)
      .then(() => {
        console.log(`Logged into: ${account.text}. Starting upload of files.`);
        files.forEach((file) => {
          FTP.uploadFile(file, '');
          successFileUpload && successFileUpload(file);
        });
        console.log(`Successful upload of files to ${account.text}.`);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log(`Loggin out of ${account.text}.`);
        FTP.logout();
      });
  }
}
