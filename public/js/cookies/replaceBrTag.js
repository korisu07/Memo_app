'use strict';

export { brTagChange, escapeHTMLtags };

// HTMLタグを除外する処理
function escapeHTMLtags( target ){
  // HTMLタグを検索し、除外
  target = target.replace(/<[a-z]*>/g, '');
  target = target.replace(/<\/[a-z]*>/g, '');

  // 除外したあとの文字列を返す
  return target;
}

// 改行コードを <br>タグ に変換する処理
function brTagChange(Element) {
  // はじめに、\r\n形式の改行コードを検索します。
  let searchStr = /(\r\n)/;
  const searchExp = Element.match(new RegExp(searchStr, 'g'));

  // 一致した場合、改行コードを <br>タグ へ変換
  if(searchExp){
    return Element.replace(new RegExp(searchStr, 'g'), '<br>');
  }else{
    // 一致しなかった場合、 \r もしくは \n を改行コードとして検索
    // そちらを <br>タグ へ変換
    searchStr = /(\r)|(\n)/;
    return Element.replace(new RegExp(searchStr, 'g'), '<br>');
  }
}