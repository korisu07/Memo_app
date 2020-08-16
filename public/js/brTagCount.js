'use strict';

//これはテスト用のjsファイルです。
// 改行を変換する
function brTagChange(Element) {
  const searchStr = '\n|\r\n|\r';
  return Element.replace(new RegExp(searchStr, 'g'), '<br>');
}

// nbspまでの文字列を切り出し
function brTagString(Element) {

  //div.memoの高さを取得
  const
    memoElement = document.querySelector('div.memo'),
    divMemoSize = memoElement.clientHeight;

  console.log(divMemoSize);

  //preタグの高さと文字数を取得
  const
    textHeight = Element.clientHeight;

  const match = Element.innerHTML.match(new RegExp('(<br>|[^<br>]+<br>){5}'));
  console.log(match);

  const index = Element.innerHTML.lastIndexOf(match[1]);
  console.log(index);

  // preタグの高さがdiv.memoを超えたら発動
  if (textHeight >= divMemoSize - 25) {
    return Element.innerHTML.substr(0, index) + '...';
  } else {
    return Element.innerHTML;
  }
}

// preタグをすべて読み込み
const contents = document.querySelectorAll('div.memo label div');

// brTagSearch(contents);

// 関数を実行するための処理
// preタグを一つずつ処理
contents.forEach(box => {
  box.innerHTML = brTagChange(box.innerHTML);
  box.innerHTML = brTagString(box);
});
