import FTP from 'react-native-ftp';
import {Account} from 'screens/Accounts/types';
import {AccountTableFields} from 'services/Database/Tables';

export default class FtpClient {
  private login(account: Account): Promise<any> {
    FTP.setup(account.address, account.port);
    return FTP.login(
      account[AccountTableFields.USERNAME],
      account[AccountTableFields.PASSWORD],
    );
  }

  connectionTest(account: Account) {
    this.login(account)
      .then(() => {
        console.log(`Logged into: ${account.text}.`);
      })
      .finally(() => {
        console.log(`Loggin out of ${account.text}.`);
        FTP.logout();
      });
  }

  private async ftpUpload(files: string[]) {
    for (const file of files) {
      await FTP.uploadFile(file, '');
    }
  }

  uploadFiles(files: string[], account: Account) {
    this.login(account)
      .then(async () => {
        console.log(`Logged into: ${account.text}. Starting upload of files.`);
        await this.ftpUpload(files);
        console.log(`Successful upload of files to ${account.text}.`);
        FTP.logout();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
