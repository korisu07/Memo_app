'use strict';

const 
  mainElem = document.querySelector('div.memoWrap'),
  childCount = mainElem.childElementCount;

  console.log(childCount);

  if(childCount === 0){
    const 
    tag =
     `<div class="memo">
      <form action="/delete/first" method="post" id="delete_first">
      <input type="submit" class="delete_btn" value="×" form="delete_first">
      <label form="delete">
        <div>メモを登録してください。</div>
      </label>
      </form>
    </div>`;
  
    mainElem.innerHTML = tag;
  }