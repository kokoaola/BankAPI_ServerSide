// UUID（Universally Unique Identifier）バージョン4を生成する関数
function uuidv4() {
  // 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' という形式の文字列を返す
  // この文字列内の 'x' と 'y' は特定のルールに従ってランダムな値に置き換えられる
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // ランダムな16進数の値を生成
    var r = Math.random() * 16 | 0;
    // 'x' の場合はそのまま r を使い、'y' の場合は 0x3 でビットごとの AND 演算をしてから 0x8 を OR 演算
    var v = c == 'x' ? r : (r & 0x3 | 0x8);
    // 生成した値を16進数に変換して返す
    return v.toString(16);
  });
}

// このモジュールのデフォルトエクスポートとして uuidv4 関数を設定
// これにより他のファイルからこの関数を import して使用できるようになる
module.exports = uuidv4;