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


  const
  //Cookieをデコード　→　デコードできなかった文字列を変換
  cookieContent = decodeURIComponent(document.cookie).replace(new RegExp(/j\:/, 'g'),'');
  // console.log(cookieContent);

  //メモを表示する処理
　//表示ボタンをひとつずつ処理
  arrayBtn.filter(btn => {
  //「メモを表示する」ボタンをクリックしたときに発動
  btn.addEventListener('click', function () {
  
    const 
    //表示するメモの中身とタイトルをそれぞれ読み込み
    modalMemoContent = document.getElementById('modalMemoContent'),
    modalMemoTitle = document.querySelector('#modalMemoWindow h2');

    //日時を表示
    const
    writeTime = document.getElementById('memoWriteTime');

    //テキストの中身を表示する処理
    const
      //クリックされたボタンのid名から数字だけを取得
      child = btn.parentElement,
      memoBox = document.querySelectorAll('.memoWrap .memo'),
      //何番目の配列をクリックしたかを取得
      clickIdNumber = Array.prototype.indexOf.call(memoBox, child);
      

      //初期のメモが表示されている場合
      //初期のメモが表示される＝メモが登録されていないことになるので、他の処理は省略。
      if(btn.id === 'open_default'){

        //初期のメモのタイトルを表示
        modalMemoTitle.innerHTML = document.querySelector('.memoWrap h3').innerHTML;
        //内容を表示
        modalMemoContent.innerHTML = document.getElementById('content_default').innerHTML;

        const 
        setTime = new Date(Date.now()),
        year = setTime.getFullYear(),
        month = setTime.getMonth(),
        date = String(setTime.getDate()).padStart(2, '0');
    
        const
          getTime = `${year}/${month + 1}/${date}`;


        writeTime.textContent = getTime;
      }
      //ユーザーによるメモが登録されている場合
      else{
          const 
          //「;」で分割し配列に
            cookiesConvertToArray = cookieContent.split('; ').reverse(),

          // 対応するcookieを配列化
          // 配列の番号に合わせるために clickIdNumberで何番目の配列かを取得

            memoCookies = cookiesConvertToArray[clickIdNumber]
            .replace('"]', '')
            .split('=["');
          
  
          // console.log(memoCookies[1].split('","'));

          const
            memoArray = memoCookies[1].split('","');
          

        //Cookieの「=」より後ろの文字を表示させる
        modalMemoTitle.innerHTML = memoArray[0];
        //表示内容は改行タグに変換
        modalMemoContent.innerHTML = memoArray[1].replace(/(\\r|\\r\\n|\\n)/g,'<br>');
        writeTime.textContent = memoArray[2]; 

      }

    //表示に関する処理
    //それぞれの要素を表示
    overLay.style.display = 'block';
    modalMemoWindow.style.display = 'block';
    
    //フェードインの処理
    overLay.animate([{ opacity: '0' }, { opacity: '0.5' }], 250);
    modalMemoWindow.animate([{ opacity: '0' }, { opacity: '1' }], 150);


    //付与されたクラスをリセット
    editBtn.removeAttribute("class");
    deleteBtn.removeAttribute("class");

    //表示したCookieのID名を引用
    const
      clickCookieName = btn.id.replace('open_', '');
    
    const 
      idName_btnBox = document.getElementById('btnBox');

    //初期のメモが表示されている場合、不要なボタンを消す
    if(clickCookieName === 'default'){
      deleteBtn.style.display = 'none';
      editBtn.style.display = 'none';
    

      idName_btnBox.style.textAlign = 'right';
      idName_btnBox.style.width = '100%';
      document.getElementById('closeMemo').style.width = '30%';

      writeTime.style.width = '100%';
      writeTime.style.padding = '0';

      document.getElementById('modalMemoContent').style.padding = '0';
    }// ユーザーのメモが表示されている場合
    else{

      //スタイルをもとに戻す
      idName_btnBox.style.textAlign = '';
      idName_btnBox.style.width = '';
      document.getElementById('closeMemo').style.width = '';

      writeTime.style.width = '';
      writeTime.style.padding = '';

      document.getElementById('modalMemoContent').style.padding = '';

      //クラス付与して、編集ボタンと削除ボタンに対応
      deleteBtn.classList.add('delete_' + clickCookieName);
      editBtn.href = '/edit/' + clickCookieName;
    }

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


//黒背景をクリック時にフェードアウト
closeMemoContent(overLay);

//閉じるボタンをクリック時にもフェードアウト
closeMemoContent(closeModalBtn);


// ----- 編集ボタンの処理 -----
editBtn.addEventListener('click', function(){
  //重複防止の処理
  pointerEventsChange('none');

  hideModalMemoOnly();

  //pointerEventsをもとに戻す
  setTimeout("pointerEventsChange('auto')", 300);
});



// ----- 削除ボタンの処理 -----

//最初から表示されている削除ボタン
const 
easyClearBtn = Array.prototype.slice.call(document.getElementsByClassName('delete_btn'));

easyClearBtn.filter(btn => {
  btn.addEventListener('click', function(){
    overLay.style.display = 'block';
    confirmDelete();

    const
      easyID = String(btn.nextElementSibling.id).replace('content_', '');
    
      const
      postDeleteBtn = document.getElementById("postDelete");
    
      postDeleteBtn.setAttribute('action', `/delete/${easyID}`);

  }, false);
});

deleteBtn.addEventListener('click', function(){
  //重複防止の処理
  pointerEventsChange('none');

  hideModalMemoOnly();
  confirmDelete();

  //pointerEventsをもとに戻す
  setTimeout("pointerEventsChange('auto')", 300);
});

const wrapp = document.getElementById("confirmWrapp");

if(wrapp != null){
  overLay.addEventListener('click', function(){
    document.getElementById('modalWrapp').removeChild(wrapp);
  });
}



//削除確認の処理

function confirmDelete(){

  const 
    confirmWin = `
      <div id="deleteConfirm">
        <div class="confirmText">削除しますか？</div>
        <form method="post" id="postDelete"><button>はい</button></form>
        <div id="noDel">いいえ</div>
      </div>
      `,
    createDiv = document.createElement('div');
    createDiv.id = "confirmWrapp";
    createDiv.innerHTML = confirmWin;

  //overLayの中に確認用ボタンを埋め込む
  overLay.parentNode.insertBefore(createDiv, overLay.nextElementSibling);
  

  //削除するメモの番号を付与する処理
  const
  deleteBtnId = deleteBtn.className.replace('delete_', ''),
  postDeleteBtn = document.getElementById("postDelete");

  //ボタンを押したときにaction属性を付与する
  //　→　app.jsの処理に受け渡す
  postDeleteBtn.setAttribute('action', `/delete/${deleteBtnId}`);

  
  //削除しますか　→　いいえ　を押した場合の処理
  const
    noDeleteBtn = document.getElementById("noDel"),
    confirmWrap = document.getElementById("confirmWrapp");

    function clickNoDelete (){
      confirmWrap.style.display = 'none';
      overLay.style.display = 'none';
    }

    noDeleteBtn.addEventListener('click', function(){
      clickNoDelete();
    });

    overLay.addEventListener('click', function(){
      clickNoDelete();
    });

    postDeleteBtn.addEventListener('click', function(){
      postDeleteBtn.blur();
    });
  }
  //フォーカスを外す処理

//削除ボタンを押したときに、表示を入れ替えるための処理
function hideModalMemoOnly(){
  setTimeout("modalMemoWindow.style.display = 'none'", 200);
  modalMemoWindow.animate([{ opacity: '1' }, { opacity: '0' }], 220);
}


//重複防止用の処理。クリックしたときのイベントを操作します。
function pointerEventsChange(property){
  overLay.style.pointerEvents = property;
  closeModalBtn.style.pointerEvents = property;
  editBtn.style.pointerEvents = property;
  deleteBtn.style.pointerEvents = property;
}
