//server.jsからエクスポートされたものが処理できるようになる
let app = require("./server.js")
let uuidv4 = require("./uuidv4.js")

class Account{
  
  constructor(name, accountType, balance) {
    this.id = ""
    this.name = name 
    this.accountType = accountType 
    this.balance = balance 
  }
  
  
  
  //データベースに保存する関数
  //完了後には、作成したアカウントを返す
  save(completion){
    console.log(this.name)
    //重複を確認
    const account = this.getAccountByNameAndType(this.name, this.accountType)
    //重複していない場合はアカウントの ID を作成し、作成したアカウントを返す
    if(!account) {
      this.id = uuidv4()
      completion(this)
    } else {
      //重複している場合はnullを返す
      completion(null, 'User already has this type of account')
    }
  }
  
  
  
  //すでに同じユーザーで同じ種類の口座が登録していないか確認する関数
  getAccountByNameAndType(name, type) {
    return app.accounts.find(account => account.name == name && account.accountType == type)
  }
  
  
  
  //別のアカウントに送金する関数
  transfer(toAccount, amount, completion) {
    //残高が総金額よりも多いか確認
    if((this.balance - amount) < 0) {
      completion(false, "Insufficient funds!")
      return 
    }
    //
    this.withdraw(amount)
    toAccount.deposit(amount)
    //成功後はコールバックでtrueを返す
    completion(true)
  }
  
  
  //送金元から残高を引き落とす
    deposit(amount) {
    this.balance += amount 
  }
  
  
  //送金先へ追加する
  withdraw(amount) {
    this.balance -= amount 
  }
  
  
}


//他のファイルからrequire関数でインポートできるよう設定
module.exports = Account