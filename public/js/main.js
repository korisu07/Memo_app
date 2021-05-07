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
 * publicフォルダを基準とした相対パスであれば読み込みが可能です。
 */

const JS_files = [
  // index.ejsを基準とした相対パスで指定
  // global scope
  'js/viewer/globalScope.js',
  'js/action/globalScope.js',

  // viewer
  'js/viewer/firstSetting.js',

  // action
  'js/action/clickOpenModal.js',
  'js/action/deleteMemo.js'
];

const JS_module = [
  // index.ejsを基準とした相対パスで指定
  // viewer
  'js/viewer/omitContent.js'
];

JS_module.filter((moduleFile) =>{
  loadModulefile( moduleFile );
});

JS_files.filter((file) => {
  loadJSfile( file );
});