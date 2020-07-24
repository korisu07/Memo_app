

// 50文字以下の場合省略する
function omitContent(string) {
  const MaxLength = 50; //表示する文字数

  // 50文字を超えた場合、超えた分を省略する処理
  if (string.length > MaxLength) {
    return string.substr(0, MaxLength) + '...';
  }
  // 50文字以内ならそのまま表示
  return string;
}

function sizeControl(string) {
  const
    //div.memoの高さを取得
    memoElement = window.document.getElementById('memoBox'),
    divMemoSize = memoElement.scrollHeight;

  console.log(divMemoSize);

  const preHeight = string.clientHeight;

  // preタグの高さがdiv.memoを超えたら発動
  if (preHeight - 20 > 200) {
    return string.textContent.substr(0, 3) + '...';
  }
}

// preタグをすべて読み込み
const contents = window.document.querySelectorAll('pre');

// preタグを一つずつ処理
contents.forEach(pre => {
  sizeControl(pre);
  console.log(pre.clientHeight - 20);
});

// 関数を実行するための処理
// preタグを一つずつ処理
contents.forEach(content => {
  content.textContent = omitContent(content.textContent);
});
