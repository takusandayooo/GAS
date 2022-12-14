//slackに情報を送る関数
function postSlackbot(todaylist,today,tomorrowlist,tomorrow) {
//SlackAPIで登録したボットのトークンを設定する
let token = slackAPIのトークン;
//ライブラリから導入したSlackAppを定義し、トークンを設定する
let slackApp = SlackApp.create(token);
//Slackボットがメッセージを投稿するチャンネルを定義する
let channelId = "#general";
//Slackボットが投稿するメッセージを定義する
let message = "メンションする人\n"+today+"\n"+todaylist;
//SlackAppオブジェクトのpostMessageメソッドでボット投稿を行う
slackApp.postMessage(channelId, message);
message = tomorrow+"\n"+tomorrowlist;
slackApp.postMessage(channelId, message);
}
//linebotに送るコード
function linebot(message) {
  const url = 'https://api.line.me/v2/bot/message/push';
  const token = トークン
  const payload = {
    to: ユーザーID,　//ユーザーID
    messages: [
      { type: 'text', text:message }
    ]
  };
  const params = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + token
    },
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, params);
}

/*
function line_notify(message) {
  url = "https://notify-api.line.me/api/notify";
  token = トークン名;
  data = {
    "message": message
  };
  options = {
    "method": "post",
    "contentType": "application/x-www-form-urlencoded",
    "headers": {
      "Authorization": "Bearer " + token
    },
    "payload": data
  };
  UrlFetchApp.fetch(url, options);
}
*/
function myFunction() {
  const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = activeSpreadSheet.getSheetByName(シート名); 
  var date = new Date(); 
  var today = Utilities.formatDate(date, 'JST', 'yyyy/MM/dd');//出力の形を決めることができる
  var day = date.getDate()+1;//+1をすることで次の日の日にちを収集することができる。
  date.setDate(day);
  var tomorrow = Utilities.formatDate(date, 'JST', 'yyyy/M/dd');
  var day = date.getDate()-2;
  date.setDate(day);
  var yesterday = Utilities.formatDate(date, 'JST', 'yyyy/M/dd');  
  //console.log(tomorrow);
  //console.log(yesterday);
  var last=sheet.getLastRow();//スプレッドシートの情報が入っている最後の行数を収集
  const nameArray = sheet.getRange("A:C").getValues();//指定範囲を2次元配列に代入する
  const todaylist = ["a"];
  const tomorrowlist=["a"];
  var todaycount=1;
  var tomorrowcount=1;
  for(var x=3;x<last;x++){
      if(nameArray[x][1]==''){//空白だったらぬかす
        continue;
      }else{
        var dates= Utilities.formatDate(nameArray[x][1], 'JST', 'yyyy/M/dd');
        if(dates==today){
          //console.log(today);
          //console.log(nameArray[x][2]);
          todaylist.push(nameArray[x][2]);//配列の中に要素を入れる
          
          todaycount=todaycount+1;
        }
        else if(dates==tomorrow){
          //console.log(tomorrow);
          //console.log(nameArray[x][2]);
          tomorrowlist.push(nameArray[x][2]);
          tomorrowcount=tomorrowcount+1;
        }
        else if(dates==yesterday){//前日の日付のものがあったら消す
          console.log(dates);
          sheet.getRange("B"+(x+1)+":C"+(x+1)).clearContent();//要素を消す
          console.log("消します");
        }
      }
  }
  todaylist.shift();//配列に初期値として入れていたaを消す。
  tomorrowlist.shift();
  postSlackbot(todaylist,today,tomorrowlist,tomorrow);
  if(todaylist==''){
    message = "今日までの課題:ありません";
    //line_notify(message);
    linebot(message);
  }else{
    message = "今日までの課題:"+todaylist;
    //line_notify(message);
    linebot(message);
  }
  if(tomorrowlist==''){
    message = "明日までの課題:ありません";
    linebot(message);
    //line_notify(message);
  }else{
    message = "明日までの課題:"+tomorrowlist;
    //line_notify(message);
    linebot(message);
  }
}
