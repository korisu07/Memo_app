'use strict';

// 改行をbrタグに変換する
function brTagChange(Element) {
  let searchStr = /(\r\n)/;
  const searchExp = Element.match(new RegExp(searchStr, 'g'));

  if(searchExp){
    return Element.replace(new RegExp(searchStr, 'g'), '<br>');
  }else{
    searchStr = /(\r)|(\n)/;
    return Element.replace(new RegExp(searchStr, 'g'), '<br>');
  }
}

// 文字省略のための処理
function brTagString(Element) {

  //div.memoの高さを取得
  const
    memoElement = document.querySelector('div.memo'),
    divMemoSize = memoElement.clientHeight;

  // console.log(h3Size);

  //textの高さと文字数を取得
  const
    h3Size = document.querySelector('h3').clientHeight,
    textHeight = Element.clientHeight + h3Size - 15,

  //★改行が５回されたらマッチして、５回目の改行を配列として切り出す
    match = Element.innerHTML.match(new RegExp('(<br>|[^<br>]+<br>){4}'));
  // console.log(match);

  // matchが作られて、かつtextの高さがdiv.memoを超えたら発動(50文字未満)
  if (match && textHeight >= divMemoSize - 25 && Element.textContent.length <= 50) {
    const index = match[0].length;
    // console.log(index);
    return Element.innerHTML.substr(0, index) + '...';
  }
  // 50文字を超えている場合に発動
  else if (Element.textContent.length >= 50) {
    return Element.innerHTML.substr(0, 50) + '...';
  }
  // 50文字を超えていない場合、そのまま返します。
  else {
    return Element.innerHTML;
  }
}


// メモ部分をすべて読み込み
const contents = document.querySelectorAll('div.smallMemoContent');

// 関数を実行するための処理
// メモ部分を一つずつ処理
contents.forEach(memoBox => {
  memoBox.innerHTML = brTagChange(memoBox.innerHTML);
  memoBox.innerHTML = brTagString(memoBox);
});
