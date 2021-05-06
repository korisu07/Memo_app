'use strict';

const 
  wrapElem = document.querySelector('div.memoWrap'),
  //メモの数をカウント
  childCount = wrapElem.childElementCount;

  //メモが登録されていない場合のみ発動
  if(childCount === 0){
    const 
      tag =
      `<div class="memo js-number-default">
          <h3>タイトル</h3>

          <div class="smallMemoContent">メモを登録してください。</div>
          <div id="open_default" class="openMemo">
          <span class="writeTime"></span>
          <span class="openBtn">メモを開く</span>
        </div>
      </div>`;
  
    wrapElem.innerHTML = tag;
  }