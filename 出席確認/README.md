# 出席管理

## 仕組み
Google Mapのタイムラインの機能を用いて、行った場所を取得し学校に出席しているのかを判定を行っている。
## 使い方
1. Google Mapのタイムラインの情報の取得  
   こちらのサイトと同じ操作をしJSONファイルを取得する:[URL](https://manualog.net/google-timeline-3620)
2. フォルダーIDを取得し、[`folderId`](https://github.com/takusandayooo/GAS/blob/167a562a1239a738e764cbb2ccaa2a89be887a63/%E5%87%BA%E5%B8%AD%E7%A2%BA%E8%AA%8D/main.gs#L2C7-L2C15)に代入をする。  
   フォルダーIDを取得仕方は、こちらのURLを参考にしてください[参考URL](https://tetsuooo.net/gas/748/#toc_id_3_1)
3. 次に新規のGoogleカレンダーを作成 
   こちらのURLを参考にしてください[参考URL](https://support.google.com/calendar/answer/37095?hl=ja)
4. カレンダーIDを取得し、[`calendarId`](https://github.com/takusandayooo/GAS/blob/167a562a1239a738e764cbb2ccaa2a89be887a63/%E5%87%BA%E5%B8%AD%E7%A2%BA%E8%AA%8D/main.gs#L1)に代入  
   カレンダーIDの取得はこちらのURLを参考にしてください[参考URL](https://blog-and-destroy.com/41932)
5. 緯度軽度の条件文の定義  
   国土地理院などの地図アプリを用いで学校の緯度と軽度を取得し、２点を取得して[`latitude, longitude`](https://github.com/takusandayooo/GAS/blob/167a562a1239a738e764cbb2ccaa2a89be887a63/%E5%87%BA%E5%B8%AD%E7%A2%BA%E8%AA%8D/main.gs#L20)の条件文に代入してください。
   例:東京駅内にいる場合
   ![スクリーンショット 2024-01-20 19 54 39](https://github.com/takusandayooo/GAS/assets/54734834/17b7747d-e93d-49f7-9d6f-3b420c502dcf)
   ![スクリーンショット 2024-01-20 19 54 25](https://github.com/takusandayooo/GAS/assets/54734834/8de60644-2baa-45ec-9ca5-c5da55fcb761)
  
7. タイムラインのJSONファイルをGoogleDriveのフォルダーにアップロードしてください。  
   ※必ずフォルダーには一つのJSONファイルにしてください。
   ![スクリーンショット 2024-01-20 19 44 28](https://github.com/takusandayooo/GAS/assets/54734834/7be1b1a0-1721-4f6b-a052-862aa7550fb1)
8. GASのエディターから[`main`](https://github.com/takusandayooo/GAS/blob/167a562a1239a738e764cbb2ccaa2a89be887a63/%E5%87%BA%E5%B8%AD%E7%A2%BA%E8%AA%8D/main.gs#L38)を実行
   そうすることで、カレンダーに追加することができます。
