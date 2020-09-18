'use strict';

const 
  wrapElem = document.querySelector('div.memoWrap'),
  //メモの数をカウント
  childCount = wrapElem.childElementCount;

  //メモが登録されていない場合のみ発動
  if(childCount === 0){
    const 
      tag =
      `<div class="memo">
        <form action="/delete/first" method="post" id="delete_first">
        <input type="submit" class="delete_btn" value="×" form="delete_first">
        <label form="delete">
          <div id="content_default">メモを登録してください。</div>
        </label>
        </form>
        <div id="open_default" class="openMemo">
          メモを開く
        </div>
      </div>`;
  
    wrapElem.innerHTML = tag;
  }