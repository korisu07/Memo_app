'use strict';

import { brTagChange, escapeHTMLtags } from "./cookies/replaceBrTag.js";

// 文字省略のための処理
function brTagString(Element) {

  //div.memoの高さを取得
  const
    memoElement = document.querySelector('div.memo'),
    divMemoSize = memoElement.clientHeight;

  //textの高さと文字数を取得
  const
    h3Size = document.querySelector('h3').clientHeight,
    textHeight = Element.clientHeight + h3Size - 15,

  //★改行が５回されたらマッチして、５回目の改行を配列として切り出す
    match = Element.innerHTML.match(new RegExp('(<br>|[^<br>]+<br>){4}'));

  // matchが作られて、かつtextの高さがdiv.memoを超えたら発動(50文字未満)
  if (match && textHeight >= divMemoSize - 25 && Element.textContent.length <= 50) {
    const index = match[0].length;
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
  const 
    content = escapeHTMLtags(memoBox.innerHTML);
    
  memoBox.innerHTML = brTagChange(content);
  memoBox.innerHTML = brTagString(memoBox);
});
