'use strict';
///////////////////////////////
      /** JSを読み込み */
///////////////////////////////

// JSファイルを動的に読み込む処理
function loadJSfile( filepath ){
  document.write(`<script src=\"${filepath}\"></script>`);
}

function loadModulefile( filepath ){
  document.write(`<script type="module" src=\"${filepath}\"></script>`);
}

/** 
 * 配列の中に読み込みたいJSファイルを追加してください。
 * 指定するパスは、ルートを基準とした絶対パスか、
 * index.ejsを基準とした相対パスであれば読み込みが可能です。
 */

const JS_files = [
  // 相対パス
  'js/viewer/firstSetting.js',
  'js/clickOpenAction.js'
];

const JS_module = [
  // 相対パス
  'js/omitContent.js'
];

JS_module.forEach((moduleFile) =>{
  loadModulefile( moduleFile );
});

JS_files.forEach((file) => {
  loadJSfile( file );
});