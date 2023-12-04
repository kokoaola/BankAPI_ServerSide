//Expressフレームワークを使ったNode.jsアプリケーション
const express = require("express");
const app = express();
//Accountクラスをインポート
const Account = require("./account")

//JSONボディのリクエストを解析するためのミドルウェア
app.use(express.json())

//ダミーのチェックアカウントとセービングアカウントを作成
//これらのアカウントは実際にはデータベースなどには保存されない
let checkingAccount = {
                      name: 'John Doe',
                      id: '8ba35e1e-b5b8-47e8-a2a5-062df13fda38',
                      accountType:'checking',
                      balance:200
                        } 

let savingAccount = {
                      name: 'John Doe',
                      id: '8ba35e1e-b5b8-47e8-a2a5-062df13fda38',
                      accountType:'saving',
                      balance:500
                        } 

let accounts = [checkingAccount, savingAccount]

app.get('/api/accounts', )

// let checkingAccount = new Account('John Doe','checking',200) 
// checkingAccount.id = '8ba35e1e-b5b8-47e8-a2a5-062df13fda38'

// let savingAccount = new Account('Mary Doe','saving',100)
// savingAccount.id = '553188b1-586d-4a09-805a-98ab792f5754'

// //アカウントを配列に格納
// module.exports.accounts = [checkingAccount, savingAccount]
// let accounts = module.exports.accounts 

// //新しいアカウントを作成するためのAPIエンドポイント
// app.post('/api/accounts',(req,res) => {
  
//   let name = req.body.name 
//   let accountType = req.body.accountType 
//   let balance = req.body.balance 
  
//   let account = new Account(name, accountType, balance)
   
//   account.save((newAccount, error) => {
//     if(newAccount) {
//       accounts.push(newAccount)
//       res.json({success: true})
//     } else {
//       res.json({success: false, error: error})
//     }
//   })
  
// })

// //アカウント間で資金を転送するためのAPIエンドポイント
// app.post('/api/transfer',(req,res) => {
  
//   let accountFromId = req.body.accountFromId 
//   let accountToId = req.body.accountToId 
//   let amount = req.body.amount 
  
//   let fromAccount = accounts.find(account => account.id == accountFromId)
//   let toAccount = accounts.find(account => account.id == accountToId)
  
//   fromAccount.transfer(toAccount, amount, (transferred, error) => {
//     if(transferred) {
//       res.json({success: true})
//     } else {
//       res.json({success: false, error: error})
//     }
//   })
  
// })

// //すべてのアカウントを返すためのAPIエンドポイント
// app.get('/api/accounts',(req,res) => {
//   res.json(accounts)
})

//サーバーを起動してリクエストを待機
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
