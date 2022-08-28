function myFunction() {
  //前まであったコロナ.csvのファイルを消去するコード
  var fileData = DriveApp.getFilesByName("コロナ.csv");
  var getData = fileData.next().setTrashed(true);
  //どこのサイトから収集するか
  var url = "https://www3.nhk.or.jp/n-data/opendata/coronavirus/nhk_news_covid19_prefectures_daily_data.csv";

  var dateman = new Date();
  var namedate = "コロナ.csv";
  //csvファイルを収集
  var csv = UrlFetchApp.fetch(url);
  //csvファイルをドライブに保存する
  var csvid = DriveApp.getFolderById("ドライブのID").createFile(namedate, csv,MimeType.CSV).getId();
}
