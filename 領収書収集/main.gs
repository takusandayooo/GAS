//参考URL
//https://fuku-fk.com/line-bot-gas-ocr-receipt/
//https://www.hanachiru-blog.com/entry/2019/11/05/000000
//LINE Developersで取得したアクセストークンを入れる
function getFiles(){
  const folderId= 'フォルダーID';
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();
  var lis=[];
  while(files.hasNext()){
    
    let file = files.next();

    let fileName = file.getName(); // ファイル名
    let fileId = file.getId(); // ファイルID
    let fileURL = file.getUrl(); // ファイルURL


    console.log([fileName,fileId,fileURL]);
    lis.push([fileName,fileId,fileURL]);
  }
  return lis;
}
var CHANNEL_ACCESS_TOKEN = 'LINEアクセストークン';
var line_endpoint = 'https://api.line.me/v2/bot/message/reply';
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheet = spreadsheet.getSheetByName('データベースのシート名');
var name_sheet=spreadsheet.getSheetByName("名簿");
//ポストで送られてくるので、送られてきたJSONをパース
function doPost(e) {
  var json = JSON.parse(e.postData.contents);
  //返信するためのトークン取得
  var reply_token = json.events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }
  //送られたメッセージ内容を取得
  var types = json.events[0].message.type;
  if (types == "image") {
    var send_massage = "写真を追加しました!"
    const url = "https://api-data.line.me/v2/bot/message/" + json.events[0].message.id + "/content";
    const options = { "headers": { 'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN } };
    const blob = UrlFetchApp.fetch(url, options).getBlob();
    const driveOptions = { title: json.events[0].message.id, parents: [{ id: "写真を保存するフォルダーID" }] };
    Drive.Files.insert(driveOptions, blob);
    var last_row=sheet.getLastRow();
    var id_ranges=sheet.getRange("A2:A"+last_row);
    var lis=getFiles();
    for (const n of lis){
      if(n[0]==json.events[0].message.id){
        text=n[2];
        break;
      }
    }
    var a=id_ranges.getValues();
    var id_c,index_count=2;
    var user_id = json.events[0].source.userId;
    for (id_c of a){
      if(id_c==user_id){
        break;
      }
      index_count++;
    }
    var range = sheet.getRange('D'+(index_count));
    range.setValue(text);

  } else {
    var user_id = json.events[0].source.userId;
    var massage = json.events[0].message.text;
    if (massage.startsWith("追加\n") == true) {
      var result = massage.replace('追加\n', '');//追加という文字を消去
      var replylist = result.split('、');//,で区切ってある値を配列に入れる。
      var last_row=sheet.getLastRow();
      var range = sheet.getRange('A'+(last_row+1));
      range.setValue(user_id);
      range = sheet.getRange('B'+(last_row+1));
      range.setValue(replylist[0]);
      range = sheet.getRange('C'+(last_row+1));
      try{
        result=replylist[1].replace("円","");
        range.setValue(result);
      }catch{
        range.setValue(replylist[1]);
      }
      var send_massage = replylist[0]+"さんが"+replylist[1]+"円"+"申請しました。"
    }else if(massage.startsWith("登録、")==true){
      var result = massage.replace('登録、', '');
      var last_row=name_sheet.getLastRow();
      var range=name_sheet.getRange("A"+(last_row+1));
      range.setValue(user_id);
      range=name_sheet.getRange("B"+(last_row+1));
      range.setValue(result);
      var send_massage = result+"さんが登録されました";
    } else {
      var send_massage = "書き方の例\n#############\n追加\n太郎、10000\n#############\n" + "のように書いてください。\nその後に領収書の写真を送信してください。";
    }
  }
  // メッセージを返信    
  UrlFetchApp.fetch(line_endpoint, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [{
        'type': 'text',
        'text': send_massage,
      }],
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);
}

