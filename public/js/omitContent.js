const MaxLength = 50; //表示する文字数

// 50文字以下の場合省略する
function omitPreContent(string) {
  const
    //div.memoの高さを取得
    memoElement = document.getElementById('memoBox'),
    divMemoSize = memoElement.clientHeight;

  const preHeight = string.clientHeight;
  const preLength = string.textContent.length;

  // 50文字を超えた場合、超えた分を省略する処理
  if (string.textContent.length > MaxLength) {
    return string.textContent.substr(0, MaxLength) + '...';
  }

  // 50文字以内でも、preタグの高さがdiv.memoを超えたら発動
  else if (preHeight > divMemoSize && preLength <= MaxLength) {
    return string.textContent = string.textContent.substr(0, 3) + '...';
  }

  // 50文字以内でpreがはみ出していない場合は、そのまま表示
  else {
    return string.textContent;
  }
}

// preタグをすべて読み込み
const contents = document.querySelectorAll('pre');

// 関数を実行するための処理
// preタグを一つずつ処理
contents.forEach(content => {
  content.textContent = omitPreContent(content);
});
