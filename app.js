const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// publicフォルダからCSSや画像ファイルを読み込む設定
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// トップページのルーティング
app.get('/', (req, res) => {
  const memoCookies = Object.entries(req.cookies).map(([memo_id, content]) => ({memo_id, content}));
    res.render('index.ejs', {memos: memoCookies});
    console.log(req.cookies);
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
  const content = req.body.memoContent;
    let i = Object.keys(req.cookies).length - 1;
    i += 1;
      res.cookie(i, content, { expires: new Date(Date.now() + 900000)});
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
  let e = req.params.id;
  console.log(req.cookies[e]);
  res.render('memo_content.ejs', { memocontent: req.cookies[e] });
});

// Localhost:3000に接続
app.listen(3000, function () {
  console.log('Successful! App listening on port 3000.');
});
