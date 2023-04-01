function sheetjson(){
  var sheet=SpreadsheetApp.getActiveSheet();
  var last_row=sheet.getLastRow();
  var last_column=sheet.getLastColumn();
  var key_range=sheet.getRange(1,1,1,last_column)
  var value_range=sheet.getRange(2,1,last_row-1,last_column);
  var key_list=key_range.getValues();
  var value_list=value_range.getValues();
  // console.log(key_list);
  // console.log(value_list);
  var count=0
  var dicts={}
  var print_list=[]
  var json_dict=[]
  //json_dictにいったん保存する
  for (var x=0;x<value_list.length;x++){
    for(var y=0;y<key_list[0].length;y++){
      //console.log(key_list[0][y],value_list[x][y]);
      dicts[key_list[0][y]]=value_list[x][y];
    }
    json_dict[count]= JSON.parse(JSON.stringify(dicts));//値渡し
    count++
  }
  count=0
  for (var x=0;x<value_list.length;x++){
    var tentative_str="{ "
    for(var y=0;y<key_list[0].length;y++){
      if(typeof(value_list[x][y])=="number"){
        tentative_str=tentative_str+String("\""+key_list[0][y]+"\": "+value_list[x][y])
      }else{
        tentative_str=tentative_str+String("\""+key_list[0][y]+"\": \""+value_list[x][y]+"\"")
      }
      if(y<key_list[0].length-1){
        tentative_str=tentative_str+", "
      }
    }
    tentative_str=tentative_str+" }"
    print_list.push(tentative_str)
  }
  // console.log(print_list)
  var json_code="\"Object\": ["
  for(var x=0;x<print_list.length;x++){
    json_code=json_code+print_list[x]
    if(x<print_list.length-1){
      json_code=json_code+",\n\t"
    }else{
      json_code=json_code+"\n]"
    }
  }
  console.log(json_code)
  createjson_file(json_code)
}
function createjson_file(json) {
  DriveApp.createFile("json_file.json",json)
}
