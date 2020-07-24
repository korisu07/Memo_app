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

// 関数を実行するための処理

// preタグをすべて読み込み
const contents = document.querySelectorAll('pre');

// preタグを一つずつ処理
contents.forEach(content => {
  content.textContent = omitContent(content.textContent);
});
