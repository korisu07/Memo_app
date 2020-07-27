function brTagSearch(Element) {
  const str = '(\n|\r\n|\r){5}';

  return Element.replace((new RegExp(str, 'g')), 'test');
}

// function brTagChange(Element) {
//   const br = '^([^<br>]+<br>){5}';

//   return Element.replace((new RegExp(br)), '...');
// }

// preタグをすべて読み込み
const contents = document.querySelectorAll('pre');

// brTagSearch(contents);

// 関数を実行するための処理
// preタグを一つずつ処理
contents.forEach(pre => {
  pre.innerHTML = brTagSearch(pre.innerHTML);
});


//惜しい所までいけた。
//５番目の改行を&nbsp;に変換することができるなら、突破口が見える。
//最終的に、&nbsp;までの文字数をそれぞれカウントさせて、
//その文字数までを切り出したい。
