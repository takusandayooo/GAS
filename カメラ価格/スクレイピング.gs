function get140() {
  var sheet=SpreadsheetApp.getActiveSheet()
  sheet.clear()
  var response = UrlFetchApp.fetch("https://kakaku.com/camera/camera-lens/ranking_1050/");
  var content = response.getContentText("shift_jis");
  var good_date = Parser.data(content).from('<p class="notice alignR mTop5">').to('</p>').iterate();

  var goods_name = Parser.data(content).from('<span class="rkgBoxNameItem">').to('</span>').iterate();
  var goods_maker= Parser.data(content).from('<span class="rkgBoxNameMaker">').to('</span>').iterate();
  var goods_pricebefore= Parser.data(content).from('<div class="rkgPrice"><span class="label"><span>最安値</span></span><span class="price">').to('</a></span></div>').iterate();
  var goods_photo= Parser.data(content).from('class="withIcnLimited"><img src="').to('" onerror=').iterate();
  var goods_explanation=Parser.data(content).from('<div class="rkgRow rowDetail">').to('</div>').iterate();
  var goods_priceafter=[]
  for(var x=0;x<goods_pricebefore.length;x++){
    goods_priceafter.push(Number(goods_pricebefore[x].split("&#165;")[1].replace(/[^0-9]/g, '')));
  }
  var printlist=[]
  console.log(goods_pricebefore.length)
  var last_row=sheet.getLastRow()
  if(last_row==0){
    last_row+=1
  }
  for(var y=0;y<goods_pricebefore.length;y++){
      printlist.push([goods_maker[y],goods_name[y],goods_priceafter[y],goods_photo[y],goods_explanation[y]]);
  }
  var num_rows = printlist.length;
  var num_cols = printlist[0].length; 
  var ranges=sheet.getRange((last_row+1),1,num_rows,num_cols)
  ranges.setValues(printlist)
  getranking()
}
function getranking() {
  var sheet=SpreadsheetApp.getActiveSheet()
  for(var xy=2;xy<=6;xy++){

    var url="https://kakaku.com/camera/camera-lens/ranking_1050/?page="+xy
    console.log(url)
    var response = UrlFetchApp.fetch(url);
    var content = response.getContentText("shift_jis");
    var good_date = Parser.data(content).from('<p class="notice alignR mTop5">').to('</p>').iterate();

    var goods_name = Parser.data(content).from('<span class="rkgBoxNameItem">').to('</span>').iterate();
    var goods_maker= Parser.data(content).from('<span class="rkgBoxNameMaker">').to('</span>').iterate();
    var goods_pricebefore= Parser.data(content).from('<div class="rkgPrice"><span class="label"><span>最安値</span></span><span class="price">').to('</a></span></div>').iterate();
    var goods_photo= Parser.data(content).from('class="withIcnLimited"><img src="').to('" onerror=').iterate();
    var goods_explanation=Parser.data(content).from('<div class="rkgRow rowDetail">').to('</div>').iterate();
    var goods_priceafter=[]
    for(var x=0;x<goods_pricebefore.length;x++){
      goods_priceafter.push(Number(goods_pricebefore[x].split("&#165;")[1].replace(/[^0-9]/g, '')));
    }
    var printlist=[]
    console.log(goods_pricebefore.length)
    var last_row=sheet.getLastRow()
    if(last_row==0){
      last_row+=1
    }
    for(var y=0;y<goods_pricebefore.length;y++){
        printlist.push([goods_maker[y],goods_name[y],goods_priceafter[y],goods_photo[y],goods_explanation[y]]);
    }
    var num_rows = printlist.length;
    var num_cols = printlist[0].length; 
    var ranges=sheet.getRange((last_row+1),1,num_rows,num_cols)
    ranges.setValues(printlist)
  }

}
