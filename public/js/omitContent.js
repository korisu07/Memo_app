// 改行をbrタグに変換する
function brTagChange(Element) {
  const searchStr = '\n|\r\n|\r',
    //改行があるかどうかを探すmatch関数
    matchTag = Element.match(new RegExp(searchStr, 'g'));

  // 後ろにある★のmatch関数で配列を作り出すために一時的に改行タグを入れます。
  if (matchTag == null) {
    return Element + '<br><br><br><br><br>';
  } else {
    return Element.replace(new RegExp(searchStr, 'g'), '<br>');
  }
}

// nbspまでの文字列を切り出し
function brTagString(Element) {

  //div.memoの高さを取得
  const
    memoElement = document.querySelector('div.memo'),
    divMemoSize = memoElement.clientHeight;

  // console.log(divMemoSize);

  //textの高さと文字数を取得
  const
    textHeight = Element.clientHeight;

  //★改行が５回されたらマッチして、５回めの改行を配列として切り出す
  const match = Element.innerHTML.match(new RegExp('(<br>|[^<br>]+<br>){5}'));
  console.log(match);
  const obj = match[0];
  // match[0]の配列が作られて、かつtextの高さがdiv.memoを超えたら発動
  if (obj && textHeight >= divMemoSize - 25 && Element.textContent.length <= 50) {
    const index = match[0].length;
    console.log(index);
    return Element.innerHTML.substr(0, index) + '...';
  }
  // 50文字を超えている場合に発動します。
  else if (Element.textContent.length >= 50) {
    return Element.innerHTML.substr(0, 50) + '...';
  }
  // 50文字を超えていない場合、そのまま返します。
  else {
    return Element.innerHTML;
  }
}


// メモ部分をすべて読み込み
const contents = document.querySelectorAll('div.memo label div');

// 関数を実行するための処理
// メモ部分を一つずつ処理
contents.forEach(box => {
  box.innerHTML = brTagChange(box.innerHTML);
  box.innerHTML = brTagString(box);
});
