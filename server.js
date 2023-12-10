const express = require("express");
const app = express();
const Account = require("./account")

app.use(express.json())

let checkingAccount = new Account('John Doe','checking',200) 
checkingAccount.id = '8ba35e1e-b5b8-47e8-a2a5-062df13fda38'

let savingAccount = new Account('Mary Doe','saving',100)
savingAccount.id = '553188b1-586d-4a09-805a-98ab792f5754'

module.exports.accounts = [checkingAccount, savingAccount]
let accounts = module.exports.accounts 

app.post('/api/accounts',(req,res) => {
  
  let name = req.body.name 
  let accountType = req.body.accountType 
  let balance = req.body.balance 
  
  let account = new Account(name, accountType, balance)
   
    account.save((newAccount, error) => {
      if(newAccount) {
        accounts.push(newAccount)
        res.json({success: true})
      } else {
        res.json({success: false, error: error})
      }
    })
  
})

app.post('/api/accounts',(req,res) => {
  
  console.log(req.body)
  
  let accountFromId = req.body.accountFromId 
  let accountToId = req.body.accountToId 
  let amount = req.body.amount 
  
  let fromAccount = accounts.find(account => account.id == accountFromId)
  let toAccount = accounts.find(account => account.id == accountToId)
  
  fromAccount.transfer(toAccount, amount, (transferred, error) => {
    if(transferred) {
      res.json({success: true})
    } else {
      res.json({success: false, error: error})
    }
  })
  
  
})


app.get('/api/accounts',(req,res) => {
  res.json(accounts)
})



// listen for requests :)
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
