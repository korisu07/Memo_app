'use strict';


// 
// ★グローバルスコープ
// 

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

// 
// ここまで　グローバルスコープ　
// 


// -----------------------------------------------

// 
// ★関数
// 

// フェードイン
function opacity_0_to_100(fade_box, delay_Time = 250){

  fade_box.style.display = 'block';

  fade_box.animate({
    opacity:[0, 1]
  }, delay_Time);
} // end function, opacity_0_to_100.


// フェードアウト
function opacity_100_to_0(fade_box, delay_Time = 250){
  fade_box.animate({
    opacity:[1, 0]
  }, delay_Time);

  setTimeout(() => {
    fade_box.style.display = 'none';
  }, delay_Time - 50);  
} // end function, opacity_100_to_0.


// クリックされたボタンのクラス名が、デフォルト用クラスかどうかを判定
function boolDefaultClass( targetBtn ){

  const
    // 先頭の「open_」を除外した結果を判定
    clickCookieName = targetBtn.id.replace('open_', '');

  if( clickCookieName === 'default' ){
    return true;
  } else {
    return false;
  }
} // end function, boolDefaultClass.


// クリックされたボタンの親要素のクラス名を取得する関数
function passClassName( action ){

  //open_memoクラスの親要素である「js-number-(数字)」を取得
  let
    // まずクリックされた開くボタンの親要素のクラスを取得
    parentClass = action.parentNode.className;

    // 余分なクラス名を除外
    parentClass = parentClass.replace('memo', '');
    parentClass = parentClass.replace(' ', '');

  return parentClass;

} // end function, passClassName.


// クリックされたボタンに紐付けられた内容を読み込むための関数
function loadMemoText( className ,targetName ){

  // 例：「js-number-1」内のタイトルを読み込みたい場合
  // className = js-number-1, targetName = h3　←このように引数を指定する
  const
    loadTarget = document.querySelector( `.${className} ${targetName}` );

  return loadTarget.textContent;

} // end function, loadMemoText.


// #modalMemoWindow 直下の要素を読み込んで、
//　内容を差し込むための関数
function InsertModalContent ( targetName, text ){

  // #modalMemoWindow 内の指定された要素を取得
  const
    ElementName = `#modalMemoWindow ${targetName}`,
    // 内容を差し込みたい
    insertTarget = document.querySelector( ElementName );

    return insertTarget.textContent = text;

} // end function, InsertModalContent.


// クリックされたボタンが属しているメモ番号をもとに、
// 編集ボタンのリンクタグに、href属性を付与するための処理
function addEditAction( targetClassName ){

  const
    editId = '/edit/' + targetClassName.replace('js-number-', '');

  // モーダル内の編集ボタンへhref属性を付与
  modalEditBtn.href = editId;

} // end function, addEditAction.


  // js-number-(数字)のクラスを受けとり、
  // それをクラス名としてモーダル内の削除ボタンへクラス付与
function addModalDeleteClass( targetClassName ) {
  
  // モーダル内の編集ボタンへクラスを付与
  modalDeleteBtn.className = targetClassName;

}


// 
// ここまで　関数
// 

// -----------------------------------------------

// 
// ★処理が発動するタイミングを記述
// 

// メモを開くための処理
arrayOpenMemoBtn.filter(action => {
  action.addEventListener('click', function(){

    // メモのモーダル表示の表示設定をリセット
    modalMemoWindow.style.display = '';

    opacity_0_to_100( modalWrapp );

    // デフォルトメモが登録されている場合
    if( boolDefaultClass( action ) ){

      // 編集ボタンと削除ボタンを隠す
      modalEditBtn.style.display = 'none';
      modalDeleteBtn.style.display = 'none';
    } // end if.

    const
      // 押されたボタンのメモ本体に付与された固有のクラス名を取得
      // 例：js-number-1
      targetParent = passClassName(action),

      // メモの内容をそれぞれ取得
      // タイトル
      textOfTitle = loadMemoText( targetParent, 'h3' ),
      // メモの内容
      textOfContent = loadMemoText( targetParent, '.smallMemoContent' ),
      // 登録された日時
      writeTime = loadMemoText( targetParent, '.openMemo .writeTime' );


    // 編集ボタンに href属性 を付与する処理
    addEditAction( targetParent );
    addModalDeleteClass( targetParent );


    // modal内に、それぞれ対応する内容を差し込み
    // タイトル
    InsertModalContent('h2', textOfTitle);
    // メモの内容
    InsertModalContent('#modalMemoContent', textOfContent);
    // 登録された日時
    InsertModalContent('#memoWriteTime', writeTime);

  }); // end addEventListener.
}); // end filter.


// モーダルを閉じるための処理
arrayCloseMemoDivs.filter(action =>{
  action.addEventListener('click', function(){

    // フェードアウトを実行
    opacity_100_to_0( modalWrapp );

    const 
      deleteConfirm = document.getElementById( 'deleteConfirm' );

    // モーダルを閉じる際、削除の確認画面が追加されている場合は削除する
    if( deleteConfirm != null ){

      // 削除の確認画面を除外
      deleteConfirm.remove();

    }
  
  }); // end addEventListener.
}); // end filter.
