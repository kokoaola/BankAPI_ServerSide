//Expressフレームワークを使ったNode.jsアプリケーション

//expressモジュールをNode.jsアプリケーションにインポート
const express = require("express");
//新しいExpressアプリケーションを作成
const app = express();
//指定したパスにあるaccount.jsファイルからAccountモジュールをインポート
const Account = require("./account")

//express.json()メソッド:Express.jsのミドルウェア
//受信したJSONデータを解析、操作できるようにする
app.use(express.json())


//ダミーのチェックアカウントとセービングアカウントを作成
//getのリクエストで返すデータ
//これらのアカウントは実際にはデータベースなどには保存されない
//new キーワードでアカウントの新しいインスタンスを作成
// let checkingAccount = new Account('Koayama Koa', 'checking', 200)
// checkingAccount.id = '8ba3aa1e-b5b8-47e8-a2a5-062df13fda39'

// let savingAccount = new Account('Koayama Koaa', 'saving', 200)
// savingAccount.id = '8ba3aa1e-b5b8-aaaa-a2a5-062df13fss39'
let checkingAccount = new Account('John Doe','checking', 200)
checkingAccount.id = '8ba35e1e-b5b8-47e8-a2a5-062df13fda38'

let savingAccount = new Account('Mary Doe','saving', 200)
savingAccount.id = '553188b1-586d-4a09-805a-98ab792f5754'
//配列に格納
//他のクラスから呼び出す用のアカウント配列
module.exports.accounts = [checkingAccount, savingAccount]
//ローカル変数用のアカウント配列
let accounts = module.exports.accounts 


//投稿用URLに対しての処理
app.post('/api/accounts',(req,res) => {
  //アプリ側から送信されたreqのプロパティ（名前、口座の種類、残高）を抽出
  let name = req.body.name 
  let accountType = req.body.accountType 
  let balance = req.body.balance
  
  //プロパティから新しいオブジェクトを作成
  let account = new Account(name, accountType, balance)
  
  //accounts配列に追加
  account.save((newAccount, error) => {
    //newAccountがnullでない場合
    if(newAccount){
      //配列に新しい口座を追加し、成功のレスポンスをクライアントに送る
        accounts.push(newAccount)
        res.json({success: true})
    }else{
      //newAccountがnullの場合
      //エラーのレスポンスを送る
        res.json({success: false, error: error})
      }
    })
  
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






// //Expressフレームワークを使ったNode.jsアプリケーション
// const express = require("express");
// const app = express();

// //express.json()メソッド:Express.jsのミドルウェア
// //受信したJSONデータを解析、操作できるようにする
// app.use(express.json())


// //ダミーのチェックアカウントとセービングアカウントを作成
// //これらのアカウントは実際にはデータベースなどには保存されない
// let checkingAccount = {
//                       name: 'Koayama Koa',
//                       id: '8ba35e1e-b5b8-47e8-a2a5-062df13fda38',
//                       accountType: 'checking',
//                       balance: 200
//                         } 

// let savingAccount = {
//                       name: 'Koayama Koa',
//                       id: '8ba35e1e-b5b8-47e8-a2a5-062df13fda39',
//                       accountType: 'saving',
//                       balance: 500
//                         } 

// //配列に格納
// //他のクラスから呼び出せるように
// module.exports.accounts = [checkingAccount, savingAccount]
// //ローカル変数用
// let accounts = module.exports.accounts

// //投稿用URL
// app.post('/api/accounts',(req,res) => {
//   //アプリ側から送信されたreqのプロパティ（名前、口座の種類、残高）を抽出
//   let name = req.body.name
//   let accountType = req.body.accountType
//   let balance = req.body.balance
  
//   //プロパティから新しいオブジェクトを作成
//   let account = {name: name, accountType: accountType, balance: balance}
  
//   //accounts配列に追加
//   accounts.push(account)
  
//   //リクエストが処理された後にクライアントに応答オブジェクトを送信
//   res.json({success: true})
//   })


// //すべてのアカウントをJSONで返すためのAPIエンドポイント
// //https://bank-api.glitch.me/api/accountsでAPI取得可能
// app.get('/api/accounts',(req,res) => {
//   res.json(accounts)
// })

// //サーバーを起動してリクエストを待機
// const listener = app.listen(process.env.PORT, () => {
//   console.log("Your app is listening on port " + listener.address().port);
// });
