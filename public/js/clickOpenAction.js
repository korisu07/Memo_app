'use strict';

const
　//表示ボタンをすべて読み込み
  getOpenBtn = document.getElementsByClassName('openMemo'),
  //クラスを配列化
  arrayBtn = Array.from(getOpenBtn);

const
  //半透明の黒背景
  overLay = document.getElementById('overLay'),
  //表示するメモの中身
  modalMemoWindow = document.getElementById('modalMemoWindow');

const 
  //表示部分のボタンを読み込み
  editBtn = document.getElementById('editMemo'),
  deleteBtn = document.getElementById('deleteMemo');

  //メモを表示する処理
　//表示ボタンをひとつずつ処理
  arrayBtn.forEach(btn => {
  //「メモを表示する」ボタンをクリックしたときに発動
  btn.addEventListener('click', function () {
  
    const 
    //表示するメモの中身とタイトルをそれぞれ読み込み
    modalMemoContent = document.getElementById('modalMemoContent'),
    modalMemoTitle = document.querySelector('#modalMemoWindow h2');

    //テキストの中身を表示する処理
    const
      //クリックされたボタンのid名から数字だけを取得
      clickIdNumber = Number(btn.id.replace('open_', '')),

      //Cookieから対応する番号の内容を読み込み
      //Cookieをデコード　→　デコードできなかった文字列を変換
      cookieContent = decodeURI(document.cookie).replace(new RegExp('j%3A', 'g'),'').replace(new RegExp('%2C', 'g'),', ');
      //console.log(decodeURI(document.cookie));

      //初期のメモが表示されている場合
      //初期のメモが表示される＝メモが登録されていないことになるので、他の処理は省略。
      if(btn.id === 'open_default'){

        //初期のメモのタイトルを表示
        modalMemoTitle.innerHTML = document.querySelector('.memoWrap h3').innerHTML;
        //内容を表示
        modalMemoContent.innerHTML = document.getElementById('content_default').innerHTML;
      }
      //ユーザーによるメモが登録されている場合
      else{
          const 
          //「;」で分割し配列に
            cookiesConvertToArray = cookieContent.split(';'),
          // クリックされたid番号に対応する配列を読み込み
            memoCookies = cookiesConvertToArray[clickIdNumber],

          //呼び出す内容の前後の位置を検索
            index1 = memoCookies.indexOf('=[\"'),
            index2 = memoCookies.indexOf('\", '),
            index3 = memoCookies.indexOf('\"]'),

            //+3は、index条件の文字数
            title = memoCookies.substring(index1 + 3, index2),
            //+4は、index条件の文字数 +1
            content = memoCookies.substring(index2 + 4, index3),
            //表示させる内容を切り出して配列化
            memoArray = Array(title, content);
  
          // console.log(memoCookies);
          // console.log(title);
          // console.log(content);
          
        //「=」より後ろの文字を表示させる
        modalMemoTitle.innerHTML = memoArray[0];
        //表示内容は改行タグに変換
        modalMemoContent.innerHTML = memoArray[1].replace(/(\\r|\\r\\n|\\n)/g,'<br>');
      }


      editBtn.classList.add('edit_' + clickIdNumber);
      deleteBtn.classList.add('delete_' + clickIdNumber);

    //表示に関する処理
    //それぞれの要素を表示
    overLay.style.display = 'block';
    modalMemoWindow.style.display = 'block';
    
    //フェードインの処理
    overLay.animate([{ opacity: '0' }, { opacity: '0.5' }], 250);
    modalMemoWindow.animate([{ opacity: '0' }, { opacity: '1' }], 150);

  }, false);
});
//メモを表示する処理　ここまで


//要素を隠すための関数
function modalHide(a, b) {
  a.style.display = 'none';
  b.style.display = 'none';
}

//閉じるボタンを読み込み
const closeModalBtn = document.getElementById('closeMemo');

//要素をクリックしたときにフェードアウトする
function closeMemoContent(elem){

  elem.addEventListener('click', function () {
     //重複防止のため、pointerEventsを一時的に無効化
    pointerEventsChange('none');

    editBtn.classList.remove();
    deleteBtn.classList.remove();

    //フェードアウトの処理
    overLay.animate([{ opacity: '0.5' }, { opacity: '0' }], 220);
    modalMemoWindow.animate([{ opacity: '1' }, { opacity: '0' }], 220);

    //時間差でdisplay:none;に
    setTimeout("modalHide(overLay, modalMemoWindow)", 200);
    //pointerEventsをもとに戻す
    setTimeout("pointerEventsChange('auto')", 400);
    
  });

}

//重複防止用の処理。クリックしたときのイベントを操作します。
function pointerEventsChange(property){
  overLay.style.pointerEvents = property;
  closeModalBtn.style.pointerEvents = property;
  editBtn.style.pointerEvents = property;
  deleteBtn.style.pointerEvents = property;
}

//黒背景をクリック時にフェードアウト
closeMemoContent(overLay);

//閉じるボタンをクリック時にもフェードアウト
closeMemoContent(closeModalBtn);

