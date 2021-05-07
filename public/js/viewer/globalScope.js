'use strict';

// 
// ★グローバルスコープ
// 

// firstSetting.js ここから

const 
  wrapElem = document.querySelector('div.memoWrap'),
  //メモの数をカウント
  childCount = wrapElem.childElementCount;


// ここまで firstSetting.js

// -----------------------------------------------

// omitContent.js ここから


// メモ部分をすべて読み込み
let 
  contents = document.getElementsByClassName('smallMemoContent');
  contents = Array.from( contents );
  

// ここまで omitContent.js