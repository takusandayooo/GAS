function doPost(e) {
    const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();//アクティブなシートを収集
    const sheet = activeSpreadSheet.getSheetByName('シート名');//シートを指定
    const TOKEN = 'ここに書く'//Outgoing Webhookの設定のところからトークンを収集
    if (TOKEN == e.parameter.token){
      const TEXT = e.parameter.text//テキストを収集
      var last=sheet.getLastRow();//シートのラスト行を収集
      console.log(last);
      const nameArray = sheet.getRange("A:C").getValues();//指定の範囲のシートの値を2次元配列の中に入れる
      for(var x=3;x<last;x++){
        if(nameArray[x][2]==''){//空白だったら実行
          let range_1 = sheet.getRange('B'+(x+1));
          let range_2 = sheet.getRange('C'+(x+1));
          var result = TEXT.replace('追加\n', '');//追加という文字を消去
          var result = result.split(',');//,で区切ってある値を配列に入れる。
          console.log(result);
          range_1.setValue(result[0]);//シートに送る
          range_2.setValue(result[1]);
          break;
        }
      }
        
    }
//デプロイしたURLはBOTのページにはる。

    return
}
