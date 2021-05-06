'use strict';

// 削除ボタンを押した際の処理をここに記述します。

// 削除する際の確認画面を出力する処理
function deleteConfirm( memoNumber ){

  const confirmModal = `
    <div id="deleteConfirm">
      <div class="confirmText">削除しますか？</div>

      <form method="post" id="postDelete" action="/delete/${memoNumber}">
        <button>はい</button>
      </form>

      <div id="noDel">いいえ</div>
    </div>
  `;

  return confirmModal;
  
} // end function, deleteConfirm.