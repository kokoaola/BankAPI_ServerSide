//Expressフレームワークを使ったNode.jsアプリケーション
const express = require("express");
const app = express();

//express.json()メソッド:Express.jsのミドルウェア
//受信したJSONデータを解析、操作できるようにする
app.use(express.json())


//ダミーのチェックアカウントとセービングアカウントを作成
//これらのアカウントは実際にはデータベースなどには保存されない
let checkingAccount = {
                      name: 'Koayama Koa',
                      id: '8ba35e1e-b5b8-47e8-a2a5-062df13fda38',
                      accountType: 'checking',
                      balance: 200
                        } 

let savingAccount = {
                      name: 'Koayama Koa',
                      id: '8ba35e1e-b5b8-47e8-a2a5-062df13fda39',
                      accountType: 'saving',
                      balance: 500
                        } 

//配列に格納
//他のクラスから呼び出す用
module.exports.accounts = [checkingAccount, savingAccount]
//ローカル変数用
let accounts = module.exports.accounts


//投稿用URL
app.post('/api/accounts',(req,res) => {
  //アプリ側から送信されたreqのプロパティ（名前、口座の種類、残高）を抽出
  let name = req.body.name
  let accountType = req.body.accountType
  let balance = req.body.balance
  
  //プロパティから新しいオブジェクトを作成
  let account = {name: name, accountType: accountType, balance: balance}
  
  //accounts配列に追加
  accounts.push(account)
  
  //リクエストが処理された後にクライアントに応答オブジェクトを送信
  res.json({success: true})
  })


//すべてのアカウントをJSONで返すためのAPIエンドポイント
//https://bank-api.glitch.me/api/accountsでAPI取得可能
app.get('/api/accounts',(req,res) => {
  res.json(accounts)
})

//サーバーを起動してリクエストを待機
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
