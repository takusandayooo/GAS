//読み込みでも書き込みでも利用するので、変数に入れてしまう
var spreadsheetId = 'シートID';

//実行時にwebサービスを実行させる
function doGet(e) {
  var t = HtmlService.createTemplateFromFile("index.html");
  return t.evaluate();
}

//スプレッドシートのデータを読み込む
function GetSpreadsheet(){
  //操作するスプレッドシートIDとシート名を指定して開く
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('シート1');
  
  //全データを取得するので、最終列と最終行を取得する
  var last_col = sheet.getLastColumn();  //最終列取得
  var last_row = sheet.getLastRow();     //最終行取得
  
  //データを取得する範囲を指定して取得し、2次元配列で返す
  return sheet.getRange(1, 1, last_row, last_col).getValues();
}
