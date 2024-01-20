const calendarId = "カレンダーID";
const folderId="フォルダーID";
//NOTE: TimeはDate型で取得される。
function addEvent(startTime, endTime) {
  const myCalendar = CalendarApp.getCalendarById(calendarId);
  const strStartTime = Utilities.formatDate(startTime, "JST", "HH:mm");
  const strEndTime = Utilities.formatDate(endTime, "JST", "HH:mm");
  const event = myCalendar.createEvent(`${strStartTime}~${strEndTime}:学校にいた`, startTime, endTime);
  console.log(event.getTitle());
}
// JSONファイルの内容を取得ための関数
function getJson() {
  var fileIT = DriveApp.getFolderById(folderId).getFiles().next();
  var textdata = fileIT.getBlob().getDataAsString('utf8');
  var jsonparse = JSON.parse(textdata);
  return jsonparse;
}
// 座標で学校にいるのかを判定
function valueAtschool(latitude, longitude) {
  if ("小さい方の緯度を入力" <= latitude && latitude <= "大きい方の緯度を入力" && "小さい方の経度を入力" <= longitude && longitude <="大きい方の軽度を入力") {
    return true;
  } else {
    return false;
  }
}
//NOTE: 範囲を指定して予定を消去
function deleteAllEvent() {
  const startTime = new Date('2023/10/1')
  const endTime = new Date('2023/10/31')
  const calendar = CalendarApp.getCalendarById(calendarId)
  const events = calendar.getEvents(startTime, endTime)
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    event.deleteEvent()
  }
}

function main() {
  const placeJson = getJson().timelineObjects;
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
