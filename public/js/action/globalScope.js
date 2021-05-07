'use strict';

// 
// ★グローバルスコープ
// 

// clickOpenModal.js ここから


const
  // modalの全体を取得
  modalWrapp = document.getElementById('modalWrapp'),
  // modalのメモ表示をする画面を取得
  modalMemoWindow = document.getElementById('modalMemoWindow'),

  // modal内の編集ボタン
  modalEditBtn = document.getElementById('editMemo'),
    // modal内の削除ボタン
  modalDeleteBtn = document.getElementById('deleteMemo'),

  // メモのmodal表示を閉じるための要素を取得し、配列に
  arrayCloseMemoDivs = [
    document.getElementById('overLay'),
    document.getElementById('closeMemo')
  ],

  modalViewer = `
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
// end const.

let
　//表示ボタンをすべて読み込み
  arrayOpenMemoBtn = document.getElementsByClassName('openMemo');
  //クラスを配列化
  arrayOpenMemoBtn = Array.from(arrayOpenMemoBtn);

// end let.


// ここまで clickOpenModal.js

// -----------------------------------------------

// deleteMemo.js ここから


const
  overLay = document.getElementById('overLay'),
  noDel = document.getElementById('noDel');

let
  smallDeletebtn = document.getElementsByClassName('smallDeletebtn');
  smallDeletebtn = Array.from(smallDeletebtn);


// ここまで deleteMemo.js

// -----------------------------------------------