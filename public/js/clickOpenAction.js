'use strict';

const
　//表示ボタンをすべて読み込み
  eventButtons = document.getElementsByClassName('openMemo'),
  //クラスを配列化
  arrayBtn = Array.from(eventButtons),

  //半透明の黒背景
  overLay = document.getElementById('overLay'),
  //表示するメモの中身
  memoView = document.getElementById('memoView'),
  memoText = document.getElementById('memoText');

  //表示部分のボタンを読み込み
  const 
  editBtn = document.getElementById('editMemo'),
  deleteBtn = document.getElementById('deleteMemo');

  //メモを表示する
　//表示ボタンをひとつずつ処理
  arrayBtn.forEach(btn => {
  //「メモを表示する」ボタンをクリックしたときに発動
  btn.addEventListener('click', function () {
  
    //テキストの中身を表示する処理
    const
      //クリックされたボタンのid名から数字だけを取得
      idNumber = btn.id.replace('open_', ''),
      //cookieから対応する番号の内容を読み込み
      cookieContent = decodeURI(document.cookie);

      //初期のメモが表示されている場合
      if(btn.id === 'open_default'){
        memoText.innerHTML = document.getElementById('content_default').innerHTML;
      }
      //ユーザーによるメモが登録されている場合
      else{
        const 
        //「;」で分割し配列に
          cookiesArray = cookieContent.split(';'),
        //idNumberと一致する配列を参照。
        //「=」までの文字数をカウント。
          index = cookiesArray[idNumber].indexOf('=') + 1;
        //「=」より後ろの文字を表示させる
          memoText.innerHTML = cookiesArray[idNumber].substr(index);
      }

      editBtn.classList.add('edit_' + String(idNumber));
      deleteBtn.classList.add('delete_' + String(idNumber));

    //表示に関する処理
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

    editBtn.classList.remove();
    deleteBtn.classList.remove();

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