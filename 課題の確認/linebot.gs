function doPost(e) {
  let token = トークン;
  // WebHookで取得したJSONデータをオブジェクト化し、取得
  let eventData = JSON.parse(e.postData.contents).events[0];
  //取得したデータから、応答用のトークンを取得
  let replyToken = eventData.replyToken;
  //取得したデータから、ユーザーが投稿したメッセージを取得
  let userMessage = eventData.message.text;
  // 応答メッセージ用のAPI URLを定義
  let url = 'https://api.line.me/v2/bot/message/reply';
  if(userMessage.startsWith("追加")==true){
    Message=userMessage
    var result = Message.replace('追加\n', '');//追加という文字を消去
    var replylist = result.split(',');//,で区切ってある値を配列に入れる。
    
    //ここからスプレッドシートに書き込みのコード
    const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = activeSpreadSheet.getSheetByName(シート名);
    var last=sheet.getLastRow();
    const nameArray = sheet.getRange("A:C").getValues();//指定の範囲のシートの値を2次元配列の中に入れる
    for(var x=3;x<last;x++){
        if(nameArray[x][2]==''){//空白だったら実行
          let range_1 = sheet.getRange('B'+(x+1));
          let range_2 = sheet.getRange('C'+(x+1));
          range_1.setValue(replylist[0]);//シートに送る
          range_2.setValue(replylist[1]);
          break;
        }
    }
    time=replylist[0];
    item=replylist[1];
    replyMessage="時間:"+time+"\n内容:"+item+"\nを追加しました。";
  }else{
    var replyMessage ="追加\n00/00,~~~\n"+"のように書いてください。";
  }
  
  //APIリクエスト時にセットするペイロード値を設定する
  let payload = {
    'replyToken': replyToken,
    'messages': [{
        'type': 'text',
        'text': replyMessage
      }]
  };
  //HTTPSのPOST時のオプションパラメータを設定する
  let options = {
    'payload' : JSON.stringify(payload),
    'myamethod'  : 'POST',
    'headers' : {"Authorization" : "Bearer " + token},
    'contentType' : 'application/json'
  };
  //LINE Messaging APIにリクエストし、ユーザーからの投稿に返答する
    UrlFetchApp.fetch(url, options);
}
