'use strict';

const
　//表示ボタン
  eventButton = document.getElementById('memo_openTest'),
  //半透明の黒背景
  overLay = document.getElementById('overLay'),
  //表示するメモの中身
  memoView = document.getElementById('memoView');


eventButton.addEventListener('click', function () {
  this.blur(); //ボタンからフォーカスを外して重複防止

  //それぞれの要素を表示
  overLay.style.display = 'block';
  memoView.style.display = 'block';
  //フェードインの処理
  overLay.animate([{ opacity: '0' }, { opacity: '0.75' }], 500);
  memoView.animate([{ opacity: '0' }, { opacity: '1' }], 300);

  //黒背景が表示されている場合
  if (overLay.length == 1) {
    //黒背景を非表示に
    return overLay.remove;
  }
}, false);

//要素を隠すための関数
function hide(a, b) {
  a.style.display = 'none';
  b.style.display = 'none';
}

overLay.addEventListener('click', function () {
  //フェードアウトの処理
  overLay.animate([{ opacity: '0.75' }, { opacity: '0' }], 500);
  memoView.animate([{ opacity: '1' }, { opacity: '0' }], 500);

  //時間差でdisplay:none;に
  setTimeout('hide(overLay, memoView)', 450);
});
