const MaxLength = 50; //表示する文字数

// 50文字以下の場合省略する
function omitPreContent(string) {

  //div.memoの高さを取得
  const
    memoElement = document.querySelector('div.memo'),
    divMemoSize = memoElement.clientHeight;

  console.log(divMemoSize);

  //preタグの高さと文字数を取得
  const
    preHeight = string.clientHeight,
    preLength = string.textContent.length;

  // 50文字を超えた場合、超えた分を省略する処理
  if (string.textContent.length > MaxLength) {
    return string.textContent.substr(0, MaxLength) + '...';
  }

  // 50文字以内でも、preタグの高さがdiv.memoを超えたら発動
  else if (preHeight > divMemoSize && preLength <= MaxLength) {
    return string.textContent = string.textContent.substring(0, 5) + '...';
  }

  // 50文字以内でpreがはみ出していない場合は、そのまま表示
  else {
    return string.textContent;
  }
}

// preタグをすべて読み込み
const contents = document.querySelectorAll('div.memo label');

// 関数を実行するための処理
// preタグを一つずつ処理
contents.forEach(box => {
  box.textContent = omitPreContent(box);
});
