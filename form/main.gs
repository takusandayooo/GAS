//参考:https://ja.stackoverflow.com/questions/43029/google-apps-script%e3%81%a7base64%e3%81%ae%e7%94%bb%e5%83%8f%e3%82%92%e4%bf%9d%e5%ad%98%e3%81%97%e3%81%9f%e3%81%84
//https://javascript.keicode.com/newjs/how-to-read-file-with-file-api.php#2-3
//https://zenn.dev/nana/articles/688636736ac1e9#%E7%94%BB%E5%83%8F%E3%82%92base64%E3%81%AB%E3%81%99%E3%82%8B
//https://blanche-toile.com/tools/image-to-base64
function doGet(e) {
  var t = HtmlService.createTemplateFromFile("index.html");
  return t.evaluate();
}

function blob_savedrive(file_base64) {  
  var drive = DriveApp.getFolderById('フォルダーID');
  var file_data=file_base64.split(",");
  var contentType = file_data[0].match(/data:(.*?);/)[1];
  console.log(contentType);
  var file_extension=contentType.split("/")[1];
  console.log(file_extension);
  var fileName = 'sample.'+file_extension;
  // console.log(file_base64)
  var data = file_data[1];

  var decoded = Utilities.base64Decode(data);

  var blob = Utilities.newBlob(decoded, contentType, fileName)

  drive.createFile(blob);
}
