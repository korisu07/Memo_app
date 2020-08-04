// メモの内容表示のときにつくJSON形式のカッコ等を変換したい

//前提：pugファイルに表示するために、
//メモの内容がJSON形式で表示されています。
//本当は直接変換したかったけど無理でした

//メモのdivを読み込み
const
  loadMemoContent = document.querySelector('div#memoText');

console.log(loadMemoContent.textContent);

//JSON形式になっているテキストを
//JavaScriptで扱えるように変換
const
  textOutPut = JSON.parse(loadMemoContent.textContent),
  //配列として取り出された最初のもの（これがメモの内容）の値を取得
  textValue = Object.values(textOutPut[0]);

console.log(textValue);

//再度JSON形式として変換するときにまわりのカギカッコ等を削除
const
  content =
    JSON.stringify(textValue)
      .replace(/(")|(.$)|(^.)|(\\r|\\r\\n|\\n)/g, function () {
        if (arguments[4]) {
          return '<br>';
        } else if (arguments[0]) {
          return '';
        }
      });
function strChange(elem) {
  return elem;
}

console.log(content);

loadMemoContent.innerHTML = strChange(content);
