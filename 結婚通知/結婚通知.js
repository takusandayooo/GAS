function myfunction(){
    let response = UrlFetchApp.fetch("https://www.oricon.co.jp/news/tag/id/news_marriage/");
  let text = response.getContentText("shift_jis");
  let topic_block = Parser.data(text).from('class="block-card-list mb5"').to('<script src="https://contents.oricon.co.jp/pc/js/_parts/jquery-1.11.1.min.js">').build();
  let content_block=topic_block
     topics = Parser.data(content_block).from('<p class="lead">').to('</p>').iterate();
    let  date=Parser.data(content_block).from('<span class="en">').to('</span></time></div><p class="card-footer-cat">').iterate()
    let top=Parser.data(content_block).from('<div class="inner"><div class="card-body"><div class="card-body-main"><h2 class="title"').to('</h2>').iterate();
    for(news of topics){
      let newsRank = topics.indexOf(news) + 1;
   }
   list=[top[0],topics[0],date[0]]
   console.log(list)
   doPost(list)
}
function doPost(lists) {
    const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();//アクティブなシートを収集
    const sheet = activeSpreadSheet.getSheetByName('シート1');//シートを指定
    const nameArray = sheet.getRange("A:B").getValues();
    a=Utilities.formatDate(nameArray[2][0],"JST","yyyy-MM-dd HH:MM");
    if(a<lists[2]){ 
      sheet.getRange(1,1).setValue(lists[0]);
      sheet.getRange(2,1).setValue(lists[1]);
      sheet.getRange(3,1).setValue(lists[2]);
      console.log("aaa")
    }
}
