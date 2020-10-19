import FTP from 'react-native-ftp';
import {updateAccountTimestamp} from 'services/AsyncStorage/accountHelpers';
import {Account} from 'services/AsyncStorage/type';
import {File} from 'services/MediaAlbum/types';

export default class FtpClient {
  private login(account: Account): Promise<any> {
    FTP.setup(account.address, account.port);
    return FTP.login(account.username, account.password);
  }

  connectionTest(account: Account) {
    this.login(account)
      .then(() => {
        console.log(`Logged into: ${account.name}.`);
      })
      .finally(() => {
        console.log(`Loggin out of ${account.name}.`);
        FTP.logout();
      });
  }

  private async ftpUpload(files: File[]) {
    for (const file of files) {
      await FTP.uploadFile(file.uri, 'tempfile.tacitpart', '');
      await FTP.renameFile('tempfile.tacitpart', file.filename);
    }
  }

  private getLatestTimestamp(files: File[]): number {
    let latestTimestamp = 0;
    return files.reduce((lt, file) => {
      return lt < file.timestamp ? file.timestamp : lt;
    }, latestTimestamp);
  }

  uploadFiles(files: File[], account: Account) {
    return this.login(account)
      .then(async () => {
        console.log(`Logged into: ${account.name}. Starting upload of files.`);
        await this.ftpUpload(files);
        updateAccountTimestamp(this.getLatestTimestamp(files));
        console.log(`Successful upload of files to ${account.name}.`);
        FTP.logout();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
