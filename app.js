const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// publicフォルダからCSSや画像ファイルを読み込む設定
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());


// トップページのルーティング
app.get('/', (req, res) => {
  res.cookie('memo[0]', 'first');
    res.render('index.ejs', {memos: "test"});
    console.log(req.cookies);
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
    let i = 1;
    i += 1;
      res.cookie(`memo[${i}]`, content);
      res.redirect('/');
});

// app.post('/delete/:id', (req, res) => {
//     (error, results) => {
//       res.redirect('/');
//     }
// });

// app.post('/open/:id', (req, res) => {
//     (error, results) => {
//       console.log(results);
//       app.locals.memoContent = results;
//       res.render('memo_content');
//     }
// });


// Localhost:3000に接続
app.listen(3000, function () {
  console.log('Successful! App listening on port 3000.');
});
