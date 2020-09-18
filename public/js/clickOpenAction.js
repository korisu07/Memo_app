'use strict';

const
　//表示ボタンをすべて読み込み
  eventButtons = document.getElementsByClassName('openMemo'),
  //クラスを配列化
  arrayBtn = Array.from(eventButtons),

  //半透明の黒背景
  overLay = document.getElementById('overLay'),
  //表示するメモの中身
  memoView = document.getElementById('memoView');


  //メモを表示する
　//表示ボタンをひとつずつ処理
  arrayBtn.forEach(btn => {
  //「メモを表示する」ボタンをクリックしたときに発動
  btn.addEventListener('click', function () {
    
    //テキストの中身を表示

    //それぞれの要素を表示
    overLay.style.display = 'block';
    memoView.style.display = 'block';
    
    //フェードインの処理
    overLay.animate([{ opacity: '0' }, { opacity: '0.5' }], 250);
    memoView.animate([{ opacity: '0' }, { opacity: '1' }], 150);

  }, false);
});

//要素を隠すための関数
function hide(a, b) {
  a.style.display = 'none';
  b.style.display = 'none';
}

//閉じるボタンを読み込み
const closeContentBtn = document.getElementById('closeMemo');

//要素をクリックしたときにフェードアウトする
function closeMemoContent(elem){

  elem.addEventListener('click', function () {
     //重複防止のため、pointerEventsを一時的に無効化
    pointerEventsChange('none');

    //フェードアウトの処理
    overLay.animate([{ opacity: '0.5' }, { opacity: '0' }], 220);
    memoView.animate([{ opacity: '1' }, { opacity: '0' }], 220);

    //時間差でdisplay:none;に
    setTimeout("hide(overLay, memoView)", 200);
    //pointerEventsをもとに戻す
    setTimeout("pointerEventsChange('auto')", 400);
    
  });

}

//重複防止用の処理。クリックしたときのイベントを操作します。
function pointerEventsChange(property){
  overLay.style.pointerEvents = property;
  closeContentBtn.style.pointerEvents = property;
  document.querySelector('input');

}

//黒背景をクリック時にフェードアウト
closeMemoContent(overLay);

//閉じるボタンをクリック時にもフェードアウト
closeMemoContent(closeContentBtn);