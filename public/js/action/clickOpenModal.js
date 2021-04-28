'use strict';


// 
// ★グローバルスコープ
// 

const
  contentOfModal = `
    <div id="modalWrapp">
      <div id="overLay"></div>
      <div id="modalMemoWindow">
        <h2></h2>

        <div class="wrapMenu">
          <span id="memoWriteTime"></span>
          <div id="btnBox">
            <a id="editMemo">編集</a>
            <div id="deleteMemo">削除</div>
            <div id="closeMemo">閉じる</div>
          </div><!-- /#btnBox -->
        </div><!-- /#btnBox -->
      
        <div id="modalMemoContent">
      
        </div><!-- /#modalMemoContent -->
      </div><!-- /div#modalMemoWindow -->
    </div>
  `;

// 
// ここまで　グローバルスコープ　
// 

// -----------------------------------------------

function addModal( action ){
  action.addEventListener('click', function(){
    let wrapper;
  
    wrapper = document.getElementsByClassName('memoWrap');
    wrapper = Array.from(wrapper)[0];

    wrapper.insertAdjacentHTML('afterend',contentOfModal);

    console.log('add modal.');
  });
}

let
　//表示ボタンをすべて読み込み
  arrayMemoBtn = document.getElementsByClassName('test');
  //クラスを配列化
  arrayMemoBtn = Array.from(arrayMemoBtn);


arrayMemoBtn.forEach(btn => {
  addModal( btn );
});
