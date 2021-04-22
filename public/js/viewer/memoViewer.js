function memoViewer( string, Element ){

  if( typeof (string) == 'string' ){
    // 代入された値をメモの中に表示します。
    Element.innerHTML = string;

  } else {
  // 代入された値がsrting型でない場合、強制的に処理を止めます
    console.error('代入された値がstring型ではありません！');
    return;
  }

}