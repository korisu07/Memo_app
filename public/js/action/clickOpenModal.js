'use strict';


// 
// ★グローバルスコープ
// 

const
  // modalの全体を取得
  modalWrapp = document.getElementById('modalWrapp'),

  // modal内の編集ボタン
  editMemo = document.getElementById('editMemo'),
    // modal内の削除ボタン
  deleteMemo = document.getElementById('deleteMemo'),

  // メモのmodal表示を閉じるための要素を取得し、配列に
  arrayCloseMemoDivs = [
    document.getElementById('overLay'),
    document.getElementById('closeMemo')
  ];



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
}

// フェードアウト
function opacity_100_to_0(fade_box, delay_Time = 250){
  fade_box.animate({
    opacity:[1, 0]
  }, delay_Time);

  setTimeout(() => {
    fade_box.style.display = '';
  }, delay_Time - 50);  
}

function addClass( addTarget, className ){
  addTarget.classList.add( className );
}

function resetClass( deleteTaget ){
  deleteTaget.removeAttribute("class");
}

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
}

// #modalMemoWindow 直下の要素を読み込むための関数
// 後に、内容を代入する処理を簡易化するために使います
function loadModalElement ( targetName ){

  // #modalMemoWindow 内の要素を指定して取得
  document.querySelector(`#modalMemoWindow ${targetName}`);

}

// クリックされたボタンの親要素のクラス名を取得する関数
function passIdNumber( action ){

  //open_memoクラスの親要素である「js-number-(数字)」を取得
  let
    // まずクリックされた開くボタンの親要素のクラスを取得
    parentClass = action.parentNode.className;

    // 余分なクラス名を除外
    parentClass = parentClass.replace('memo', '');
    parentClass = parentClass.replace(' ', '');

  return parentClass;

}


// 
// ここまで　関数
// 

// -----------------------------------------------

// 
// ★処理が発動するタイミングを記述
// 

// クリック時に発動
arrayOpenMemoBtn.filter(action => {
  action.addEventListener('click', function(){

    opacity_0_to_100( modalWrapp );

    // デフォルトメモが登録されている場合
    if( boolDefaultClass( action ) ){

      // 編集ボタンを削除ボタンを隠す
      document.getElementById('editMemo').style.display = 'none';
      document.getElementById('deleteMemo').style.display = 'none';
    }
    
    passIdNumber( action );

  });
});

arrayCloseMemoDivs.filter(action =>{
  action.addEventListener('click', function(){

    // フェードアウトを実行
    opacity_100_to_0( modalWrapp );
  
  });
});
