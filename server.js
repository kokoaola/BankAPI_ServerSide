//Expressフレームワークを使ったNode.jsアプリケーション
const express = require("express");
const app = express();


//ダミーのチェックアカウントとセービングアカウントを作成
//これらのアカウントは実際にはデータベースなどには保存されない
let checkingAccount = {
                      name: 'John Doe',
                      id: '8ba35e1e-b5b8-47e8-a2a5-062df13fda38',
                      accountType: 'checking',
                      balance: 200
                        } 

let savingAccount = {
                      name: 'John Doe',
                      id: '8ba35e1e-b5b8-47e8-a2a5-062df13fda38',
                      accountType: 'saving',
                      balance: 500
                        } 

//配列に格納
let accounts = [checkingAccount, savingAccount]

//すべてのアカウントをJSONで返すためのAPIエンドポイント
//https://laced-protective-saw.glitch.me/api/accountsでAPI
app.get('/api/accounts',(req,res) => {
  res.json(accounts)
})

//サーバーを起動してリクエストを待機
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
