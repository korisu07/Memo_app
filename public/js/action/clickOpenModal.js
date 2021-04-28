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