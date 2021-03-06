'use strict';

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
function passParentClassName( action ){

  //open_memoクラスの親要素である「js-number-(数字)」を取得
  let
    // まずクリックされた開くボタンの親要素のクラスを取得
    parentClass = action.parentNode.className;

    // 余分なクラス名を除外
    parentClass = parentClass.replace('memo', '');
    parentClass = parentClass.replace(' ', '');

  return parentClass;

} // end function, passParentClassName.


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

// 重複防止用の処理
// クリックしたときのイベントを操作します


// イベントを一時的に無効化し、
// 表示が完了した頃に有効な状態へ戻すための処理
function changePointerEvents( target, delayTime = 300 ){

  // 一時的にクリックイベントを無効化
  target.style.pointerEvents = 'none';

  // 指定された時間の分だけ遅延させる
  setTimeout(() => {

    // クリックイベントを有効な状態へ戻す
    target.style.pointerEvents = 'auto';

  }, delayTime);

} // end function changePointerEvents.



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

    // 一時的にクリックイベントを無効化
    changePointerEvents( action );

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
      targetParent = passParentClassName(action),

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

    // 重複防止のために、クリックイベントを操作
    changePointerEvents( action );

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
