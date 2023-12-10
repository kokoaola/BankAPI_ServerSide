//server.jsからエクスポートされたものが処理できるようになる
let app = require("./server.js")

class Account{
  
  counstructor(name, accountType, balance){
    this.id = ""
    this.accountType = accountType
    this.balance = balance
  }
  
  
  //データベースに保存する関数
  //完了後にはコールバック関数を呼びだす
  save(completion){
    const account = this.getAccountByNameAndType(this.name, this.account)
    
  }
  
  //すでに同じユーザーで同じ種類の口座が登録していないか確認
  getAccountByNameAndType(name, type){
    return app.accounts.find(account => account.name == name && account.accountType == type) 
    }
}