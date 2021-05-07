'use strict';

// 
// ★ import
// 

import { brTagChange, escapeHTMLtags } from "/js/cookies/replaceBrTag.js";


// -----------------------------------------------


// 
// ★関数
// 


// 改行チェック用の条件
// 改行が５回されたらマッチして、５回目の改行を配列として切り出す
function match5Br(targetText) {

  return targetText.match(new RegExp('(<br>|[^<br>]+<br>){4}'));

} // end function, match5Br.



// 改行が5回以上繰り返されているかをチェックする
function boolsearch5Br( targetText ){
  let resultOfSearch;

  // 改行が5回以上繰り返されている場合、true判定を返す
  if( match5Br(targetText) ){
    resultOfSearch = true;
  } else {
    resultOfSearch = false;
  }

  return resultOfSearch;
} // end function, boolsearch5Br.



// 文字省略のための処理
function brTagString(Element, bool) {

  //div.memoの高さを取得
  const
    divMemoSize = document.querySelector('div.memo').clientHeight,

  //textの高さと文字数を取得
    h3Size = document.querySelector('h3').clientHeight,
    textHeight = Element.clientHeight + h3Size - 15;

  let 
    targetBr = match5Br(Element.innerHTML);

  // textの高さがdiv.memoを超えたら発動(50文字未満)
  if( bool && textHeight >= divMemoSize - 25 && Element.textContent.length <= 50){
    const index = targetBr[0].length;
    return Element.innerHTML.substr(0, index) + '...';
  }
  // 50文字を超えている場合に発動
  else if (Element.textContent.length >= 50) {
    return Element.innerHTML.substr(0, 50) + '...';
  }
  // 50文字を超えていない場合、そのまま返します
  else {
    return Element.innerHTML;
  } // end if.

} // end function, brTagString.


// 
// ここまで　関数
// 

// -----------------------------------------------

// 
// ★処理が発動するタイミングを記述
// 


// 関数を実行するための処理
// メモ部分を一つずつ処理
contents.filter( memoBox => {
  const 
    content = escapeHTMLtags(memoBox.innerHTML);
  
  // 改行コードを <br>タグ に変換
  memoBox.innerHTML = brTagChange(content);
  // 変換済みのメモ内のテキストで、条件に合致したものの内容を省略
  memoBox.innerHTML = brTagString(memoBox, boolsearch5Br(memoBox.innerHTML) );
});
