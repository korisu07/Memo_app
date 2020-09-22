const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();


// publicフォルダからCSSや画像ファイルを読み込む設定
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// トップページのルーティング
app.get('/', (req, res) => {

  //メモの内容をマップ付きで配列化します。
  const 
    memoCookies = Object.entries(req.cookies).map(([memo_id, content]) => ({memo_id, content}));

  res.render(
    'index.ejs', 
    {memos: memoCookies}
    );

  console.log(req.cookies);
  console.log(memoCookies);
  // console.log(Array.isArray(memoCookies));
});

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

    //メモの数を取得し、id番号を付与
    let i = Object.keys(req.cookies).length;
    i += 1;

    //メモをcookieに登録
    const defaultTitle = 'タイトル' + i

    //タイトルが登録されていない場合
    if(title === ""){
      res.cookie(i, [defaultTitle, content], { expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)});
    }//タイトルが登録されている場合
    else {
      res.cookie(i, [title, content], { expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)});
    }
  }

  //Cookie登録の処理を実行
  plusCookies();

  //リダイレクト
  res.redirect('/');
});

//Cookieの削除処理
app.post('/delete/:id', (req, res) => {
  let id = req.params.id;
  res.clearCookie(id);
  res.redirect('/');
});

//メモを表示する処理
app.post('/open/:id', (req, res) => {
  //クリックしたボタンの番号を取得
  let e = req.params.id;

  //メモの内容をマップ付きで配列化します。
  const 
    memoCookies = Object.entries(req.cookies).map(([memo_id, content]) => ({memo_id, content}));
    
  res.render('memo_content.ejs', { memoContent: memoCookies[e] });
});

// Localhost:3000に接続
app.listen(3000, function () {
  console.log('Successful! App listening on port 3000.');
});
