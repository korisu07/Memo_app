const
  eventButton = document.getElementById('memo_openTest'),
  overLay = document.getElementById('overLay'),
  memoView = document.getElementById('memoView');


eventButton.addEventListener('click', function () {
  this.blur(); //ボタンからフォーカスを外して重複防止

  overLay.style.display = 'block';
  memoView.style.display = 'block';
  overLay.animate([{ opacity: '0' }, { opacity: '0.75' }], 500);
  memoView.animate([{ opacity: '0' }, { opacity: '1' }], 300);
  if (overLay.length == 1) {
    return overLay.remove;
  }
}, false);

function hide(a, b) {
  a.style.display = 'none';
  b.style.display = 'none';
}

memoView.addEventListener('click', function () {
  overLay.style.display = 'block';
});

overLay.addEventListener('click', function () {
  overLay.animate([{ opacity: '0.75' }, { opacity: '0' }], 500);
  memoView.animate([{ opacity: '1' }, { opacity: '0' }], 500);
  setTimeout('hide(overLay, memoView)', 450);
});
