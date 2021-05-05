'use strict';


// 
// ★グローバルスコープ
// 

const
  // modalの全体を取得
  modalWrapp = document.getElementById('modalWrapp'),
  // overLayの部分を取得（クリック判定用）
  overLay = document.getElementById('overLay');

let
　//表示ボタンをすべて読み込み
  arrayMemoBtn = document.getElementsByClassName('test');
  //クラスを配列化
  arrayMemoBtn = Array.from(arrayMemoBtn);

// 
// ここまで　グローバルスコープ　
// 


// -----------------------------------------------

// フェードイン
function opacity_0_to_100(fade_box, delay_Time = 600){
  fade_box.animate({
    opacity:[0, 1]
  }, delay_Time);
}

// フェードアウト
function opacity_100_to_0(fade_box, delay_Time = 600){
  fade_box.animate({
    opacity:[1, 0]
  }, delay_Time);
}

// -----------------------------------------------

// クリック時に発動
// ※何故かgetElementByIdを定数にすると上手く動きません
arrayMemoBtn.forEach(btn => {
  btn.addEventListener('click', function(){

    opacity_0_to_100( modalWrapp, 600 );

  });
});


if( overLay != null ){
  overLay.addEventListener('click', function(){

    // フェードアウトを実行
    opacity_100_to_0( modalWrapp, 600 );

  });
}
