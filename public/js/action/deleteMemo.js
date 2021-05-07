'use strict';

// 
// ★関数
// 

// 削除する際の確認画面を設定する処理
function deleteConfirm( memoNumber ){

  const confirmModal = `
    <div id="deleteConfirm">
      <div class="confirmText">削除しますか？</div>

      <form method="post" id="postDelete" action="/delete/${memoNumber}">
        <button>はい</button>
      </form>

      <a id="noDel" href="javascript:actionNoDel();">いいえ</a>
    </div>
  `;

  return confirmModal;

} // end function, deleteConfirm.


// 削除の確認画面で「いいえ」が押された場合に、
// 内容表示のモーダルに切り替えるための処理
function actionNoDel(){

  const
    deleteConfirm = document.getElementById('deleteConfirm');

  opacity_100_to_0( deleteConfirm, 250 );

  setTimeout(() => {
    deleteConfirm.remove();
  }, 300);

  // 内容を表示するモーダルを非表示に
  opacity_0_to_100( modalMemoWindow );

} // end function, actionNoDel.



// 
// ここまで　関数
// 

// -----------------------------------------------

// 
// ★処理が発動するタイミングを記述
// 


smallDeletebtn.filter(( btn )=>{
  btn.addEventListener('click', function(){

    // 重複防止のために、クリックイベントを操作
    changePointerEvents( btn );

    const 
      deleteId = passParentClassName( btn ).replace('js-number-', '');

    // モーダル全体をフェードイン
    opacity_0_to_100( modalWrapp );
    // 内容を表示するモーダルを非表示に
    modalMemoWindow.style.display = 'none';

    // overLayの後ろに、削除確認の画面を追加
    // その際に、削除するメモの番号を、deleteConfirm関数に受け渡し
    overLay.insertAdjacentHTML('afterend', deleteConfirm(deleteId));

  }); // end addEventListener.
}); // end filter.


// モーダル内の削除ボタンがクリックされた場合の処理
modalDeleteBtn.addEventListener('click', function(){

  // 重複防止のために、クリックイベントを操作
  changePointerEvents( btn );

  // あらかじめクラスへ受け渡されていたメモ番号を取得し、
  // 番号のみを取り出す
  const
    modalDeleteId = modalDeleteBtn.className.replace('js-number-', '');

  // 内容を表示するモーダルを非表示に
  // ※要素は削除せず、display: none;に変更される
  opacity_100_to_0( modalMemoWindow );

  // overLayの後ろに、削除確認の画面を追加
  // その際に、削除するメモの番号を、deleteConfirm関数に受け渡し
  overLay.insertAdjacentHTML('afterend', deleteConfirm( modalDeleteId ));

}); // end addEventListener.