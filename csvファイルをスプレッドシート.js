function importCSVFromGoogleDrive() {
  //csvファイルをスプレッドシートに転記する
  var file = DriveApp.getFilesByName("コロナ.csv").next();
  var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
  const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = activeSpreadSheet.getSheetByName('Sheet1');
  sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
}
function myFunction() {
  importCSVFromGoogleDrive();
  var date = new Date(); 
  var today = Utilities.formatDate(date, 'JST', 'yyyy/MM/dd');
  var day = date.getDate();
  date.setDate(day-1);
  var yesterday = Utilities.formatDate(date, 'JST', 'yyyy/M/d');
  var yesterday = String(yesterday);
  console.log(yesterday);
  const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = activeSpreadSheet.getSheetByName('Sheet2'); 
  var days = sheet.createTextFinder(yesterday);
  var dayss=days.findAll();
  Logger.log('セル位置 :  ' + dayss[0].getA1Notation()) ;
  const nameArray = sheet.getRange("A:H").getValues();
  var last=sheet.getLastRow();

  console.log(nameArray[last-1][0]);
  //メールを送る
  const recipient = 'メールアドレス'; //送信先のメールアドレス
  const subject = yesterday+'の'+nameArray[last-1][2]+'コロナ感染者数のお知らせ';
  const body = '昨日の      '+nameArray[last-1][2]+'のコロナ感染者数\n'+`コロナ感染者数     [`+nameArray[last-1][3]+']人\n'+nameArray[last-1][2]+'の感染者数_累計     ['+nameArray[last-1][4]+']人\n'+nameArray[last-1][2]+'の死亡者数      ['+nameArray[last-1][5]+']人\n';
  
  const options = {name: 'コロナ感染者数自動BOT'};
  
  GmailApp.sendEmail(recipient, subject, body, options);
}
