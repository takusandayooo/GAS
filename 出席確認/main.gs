const calendarId = "カレンダーID";
const folderId = "フォルダーID";
//NOTE: TimeはDate型で取得される。
function addEvent(startTime, endTime) {
  const myCalendar = CalendarApp.getCalendarById(calendarId);
  const strStartTime = Utilities.formatDate(startTime, "JST", "HH:mm");
  const strEndTime = Utilities.formatDate(endTime, "JST", "HH:mm");
  const event = myCalendar.createEvent(`${strStartTime}~${strEndTime}:学校にいた`, startTime, endTime);
  console.log(event.getTitle());
}

//NOTE: JSONファイルの内容を取得
function getJson(fileID) {
  const fileIT = DriveApp.getFileById(fileID);
  const textdata = fileIT.getBlob().getDataAsString('utf8');
  const jsonparse = JSON.parse(textdata).timelineObjects;
  return jsonparse;
}
//NOTE: 座標で学校にいるのかを判定
function valueAtschool(latitude, longitude) {
  if ("緯度" <= latitude && latitude <="緯度" && "経度"<= longitude && longitude <="経度") {
    return true;
  } else {
    return false;
  }
}
function deleteAllEvent() {
  const startTime = new Date('2024/1/1')
  const endTime = new Date('2024/3/31')
  const calendar = CalendarApp.getCalendarById(calendarId)
  const events = calendar.getEvents(startTime, endTime)
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    event.deleteEvent()
  }
}
//NOTE: フォルダーの中に入っているフォルダーの名前の配列を返す
function getFolderNames() {
  const folders = DriveApp.getFolderById(folderId).getFolders();
  const folderList = [];
  while (folders.hasNext()) {
    const folder = folders.next();
    const folderName = folder.getName();
    folderList.push(folderName)
  }
  return folderList;
}
function main() {
  const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
  const rangeStartTime = new Date("2024/1/1");
  const rangeEndTime = new Date("2024/3/31");
  const startTimeList = [rangeStartTime.getFullYear(), rangeStartTime.getMonth(), rangeStartTime.getDate()];
  const endTimeList = [rangeEndTime.getFullYear(), rangeEndTime.getMonth(), rangeEndTime.getDate()];
  const folderNameList = getFolderNames();
  const year = startTimeList[0];
  if (folderNameList.includes(String(year))) {
    const folder = DriveApp.getFoldersByName(String(year)).next();
    for (var month = startTimeList[1]; month <= endTimeList[1]; month += 1) {
      try{
        var file = folder.getFilesByName(String(year + "_" + months[month] + ".json")).next();
      }catch{
        console.log(`${String(year + "_" + months[month] + ".json")}のファイルがありません`)
        break;
      }
      // console.log(file.getName());
      const placeJson = getJson(file.getId());
      // console.log(placeJson);
      placeJson.forEach(function (value) {
        try {
          const latitude = value.placeVisit.location.latitudeE7 / 10000000;
          const longitude = value.placeVisit.location.longitudeE7 / 10000000;
          if (valueAtschool(latitude, longitude) == false) return;
          const startTime = new Date(value.placeVisit.duration.startTimestamp);
          const endTime = new Date(value.placeVisit.duration.endTimestamp);
          console.log(startTime, endTime);
          addEvent(startTime, endTime);
        } catch {
          return;
        }
      });
    }
  } else {
    console.log(`Error:${year}の年のファイルがありません`);
  }
}
