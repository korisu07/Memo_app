const
  eventButton = document.getElementById('memo_openTest'),
  overLay = document.getElementById('overLay'),
  bodyElem = document.querySelector('body');


eventButton.addEventListener('click', function () {
  this.blur(); //ボタンからフォーカスを外して重複防止

  overLay.style.display = 'block';
  overLay.animate([{ opacity: '0' }, { opacity: '0.75' }], 500);
  if (overLay.length == 1) {
    return overLay.remove;
  }
}, false);

function hide(e) {
  e.style.display = 'none';
}
overLay.addEventListener('click', function () {
  overLay.animate([{ opacity: '0.75' }, { opacity: '0' }], 600);
  setTimeout('hide(overLay)', 550);
})
