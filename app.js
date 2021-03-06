const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();


// publicフォルダからCSSや画像ファイルを読み込む設定
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// トップページのルーティング
app.get('/', (req, res) => {

  //メモの内容をマップ付きで配列化します。
  const 
    memoCookies = Object.entries(req.cookies)
      //新しい順に
      .map( ([memo_id, content]) => ({memo_id, content}) )
      .reverse();

  res.render(
    'index.ejs', 
    {memos: memoCookies}
    );

});

  //日時を登録
  const 
    setTime = new Date(Date.now()),
    year = setTime.getFullYear(),
    month = setTime.getMonth(),
    date = String(setTime.getDate()).padStart(2, '0');

    let
      time = `登録日：${year}/${month + 1}/${date}`;

// メモ追加のルーティング
app.post('/create', (req, res) => {

  // メモの内容が未入力の場合
  if (req.body.memoContent == '') {
    res.send('<p>メモの内容を入力してください。<br><a href="/">戻る</a></p>');
    return false;
  }// 空白・改行のみの場合
  else if (!req.body.memoContent.match(/\S/g)) {
    res.send('<p>空白・改行のみでは登録できません。<br><a href="/">戻る</a></p>');
    return false;
  }
  //内容が入力されている場合

  //メモの内容をCookieに登録するための関数
  function plusCookies(){
    //入力されたメモの内容を取得
    const 
      title = req.body.memoTitle,
      content = req.body.memoContent;

    //Cookie名の一番大きい数字を取得し、その次の数字を追加

    //まず、Cookie名を配列化　→　key名だけ取得
    const outputKeyNumbers = Object.keys(req.cookies).map((keys) => {
      //これを数値の戻り値として返す。
      return Number(keys);
    });

    //ナンバリングを一番大きい数字にする処理

    //まず、Cookie名の数字から一番大きい数値を取得
    let i;
    
    i = Math.max.apply(null, outputKeyNumbers);

    //もしもCookieが未登録の場合、i の数値を0とする
    if(Object.entries(req.cookies).length === 0){
      i = 0;
    }

    //新しくメモを登録する処理
    //ナンバリングを新たに追加
    i += 1;

    //メモをcookieに登録
    //タイトルが登録されていない場合
    if(title === ""){
      const defaultTitle = `タイトル${i}`
      res.cookie(i, [defaultTitle, content, time], { expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)});
    }//タイトルが登録されている場合
    else {
      res.cookie(i, [title, content, time], { expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)});
    }
  }

  //Cookie登録の処理を実行
  plusCookies();

  //リダイレクト
  res.redirect('/');
});

//Cookieの削除処理
app.post('/delete/:id', (req, res) => {
  let deleteId = req.params.id;
  res.clearCookie(deleteId);
  res.redirect('/');
});

//メモを編集する処理
app.get('/edit/:id', (req, res) => {
  //クリックしたボタンの番号を取得
  const e = req.params.id;
  

  //メモの内容をマップ付きで配列化します。

  res.render('edit.ejs',{edit_id: e, edit_data: req.cookies[e]});
});

//メモを編集する処理
app.post('/edit/post/:id', (req, res) => {
  let
    a = req.params.id,

    title = req.cookies[a][0],
    content = req.cookies[a][1];

  //タイトル部分が空の場合は、もともと登録されているタイトルを再登録
  if(req.body.edit_memoTitle != ''){
    title = req.body.edit_memoTitle;
  }

  if(req.body.edit_memoContent != ''){
    content = req.body.edit_memoContent;
  }

  time = `更新日：${year}/${month + 1}/${date}`;

  res.cookie(a, [title, content, time], { expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)});

  res.redirect('/');
});

// Localhost:3000に接続
app.listen(process.env.PORT || 3000, function () {
  console.log('Successful! App listening on port 3000.');
});
