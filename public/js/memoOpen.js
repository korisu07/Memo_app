function popup() {
  const open = document.getElementById('memoView');
  if (!open) {
    return;
  }
  const
    bg = document.getElementById('overlay'),
    closeBtn = document.getElementById('closeMemo'),
    openbtn = document.querySelectorAll('a.openMemo');

  closePopUp(bg);
  closePopUp(closeBtn);
  closePopUp(openbtn);

  function closePopUp(Element) {
    if (!Element) {
      return
    }
    Element.addEventListener('click', function () {
      popup.classList.toggle('show');
    })
  }
}

popup();
