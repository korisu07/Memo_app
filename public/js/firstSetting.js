'use strict';

const 
  wrapElem = document.querySelector('div.memoWrap'),
  //メモの数をカウント
  childCount = wrapElem.childElementCount;

  //メモが登録されていない場合のみ発動
  if(childCount === 0){
    const 
      tag =
      `<div class="memo" id="delete_default">
          <div class="delete_btn">×</div>

          <h3>タイトル</h3>
          <div id="content_default" class="smallMemoContent">
            メモを登録してください。
          </div>
        <div id="open_default" class="openMemo">
          メモを開く
        </div>
      </div>`;
  
    wrapElem.innerHTML = tag;
  }