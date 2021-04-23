'use strict';

// 改行をbrタグに変換する
function brTagChange(Element) {
  let searchStr = /(\r\n)/;
  const searchExp = Element.match(new RegExp(searchStr, 'g'));

  if(searchExp){
    return Element.replace(new RegExp(searchStr, 'g'), '<br>');
  }else{
    searchStr = /(\r)|(\n)/;
    return Element.replace(new RegExp(searchStr, 'g'), '<br>');
  }
}

function escapeHTMLtags( target ){
  let escapeTarget;

  // HTMLタグを検索し、除外
  escapeTarget = target.replace(/<[a-z]*>/g, '');
  escapeTarget = escapeTarget.replace(/<\/[a-z]*>/g, '');

  // 除外したあとの文字列を返す
  return escapeTarget;
}