// 改行をnbspに変換する
function brTagSearch(Element) {
  const searchStr = '\n|\r\n|\r';
  return Element.replace((new RegExp(searchStr, 'm')), '&nbsp;');
}

// nbspまでの文字列を切り出し
function brTagString(Element) {
  const str = '&nbsp;';

  const index = str.indexOf(Element, 5);

  return Element.substring(0, index) + '...';

}

// function brTagChange(Element) {
//   const br = '^([^<br>]+<br>){5}';

//   return Element.replace((new RegExp(br),m), '...');
// }

// preタグをすべて読み込み
const contents = document.querySelectorAll('pre');

// brTagSearch(contents);

// 関数を実行するための処理
// preタグを一つずつ処理
contents.forEach(pre => {
  pre.innerHTML = brTagSearch(pre.innerHTML);
  pre.textContent = brTagString(pre.textContent);
});


//惜しい所までいけた。
//５番目の改行を&nbsp;に変換することができるなら、突破口が見える。
//最終的に、&nbsp;までの文字数をそれぞれカウントさせて、
//その文字数までを切り出したい。
