// メモの内容表示のときにつくJSON形式の感じを変換したい

const
  textJSON = document.getElementById('memoText');

console.log(textJSON);

function str(elem) {
  return elem.replace(new RegExp('\n|\r\n|\r', 'g'), '<br>');
}

textJSON.innerHTML = str(textJSON.textContent);
