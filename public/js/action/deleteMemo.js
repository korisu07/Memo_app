'use strict';

// 削除ボタンを押した際の処理をここに記述します。

// 
// ★グローバルスコープ
// 

const
  overLay = document.getElementById('overLay'),
  noDel = document.getElementById('noDel');

let
  smallDeletebtn = document.getElementsByClassName('smallDeletebtn');
  smallDeletebtn = Array.from(smallDeletebtn);



// 
// ここまで　グローバルスコープ　
// 


// -----------------------------------------------

// 
// ★関数
// 

// 削除する際の確認画面を出力する処理
function deleteConfirm( memoNumber ){

  const confirmModal = `
    <div id="deleteConfirm">
      <div class="confirmText">削除しますか？</div>

      <form method="post" id="postDelete" action="/delete/${memoNumber}">
        <button>はい</button>
      </form>

      <a href="/" id="noDel">いいえ</a>
    </div>
  `;

  return confirmModal;

} // end function, deleteConfirm.

// クリックされたボタンに付与されたクラス名（メモ番号）をもとに、
// 削除確認の「はい」ボタンに、href属性を付与するための処理
function addDeleteAction( targetClassName, targetElem ){

  const
    deleteId = '/delete/' + targetClassName.replace('js-number-', '');

  // モーダル内の編集ボタンへhref属性を付与
  targetElem.href = deleteId;

} // end function, addEditAction.

// 
// ここまで　関数
// 

// -----------------------------------------------

// 
// ★処理が発動するタイミングを記述
// 


smallDeletebtn.filter(( btn )=>{
  btn.addEventListener('click', function(){

    const 
      deleteId = passClassName( btn ).replace('js-number-', '');

    opacity_0_to_100( modalWrapp );

    modalMemoWindow.style.display = 'none';

    // overLayの後ろに、削除確認の画面を追加
    overLay.insertAdjacentHTML('afterend', deleteConfirm(deleteId));

  });
});