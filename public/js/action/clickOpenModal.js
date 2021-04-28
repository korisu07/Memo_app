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

const
  testDiv = '<div id="addTestDiv">This is test!<div>'

  
let
　//表示ボタンをすべて読み込み
  arrayMemoBtn = document.getElementsByClassName('test');
  //クラスを配列化
  arrayMemoBtn = Array.from(arrayMemoBtn);

// 
// ここまで　グローバルスコープ　
// 

// -----------------------------------------------

function addModal( target ){
    let wrapper;
  
    wrapper = document.getElementsByClassName('memoWrap');
    wrapper = Array.from(wrapper)[0];

    wrapper.insertAdjacentHTML('afterend', target);

    console.log('add modal.');
}

function deleteModal( target ){
  target.remove();
  console.log('delete modal.');
}


// クリック時に発動
// ※何故かgetElementByIdを定数にすると上手く動きません
arrayMemoBtn.forEach(btn => {
  btn.addEventListener('click', function(){
    // Modalが存在しない場合
    if(document.getElementById('addTestDiv') === null){
      // Modalを追加
      addModal( testDiv );
    } else { //存在する場合
      // Modalを削除
      deleteModal( document.getElementById('addTestDiv') );
    }
  });
});
