function stringToJSON( RegExArg ){
  var result_JSON = [
      {
        "regex" : RegExArg,
        "token_type" : "string"
      }
    ],
    debug = {
      "tree_height" : 0;
    },
    handlers = [
      /^\\/g,
      /^(\(#\[)|^((?:\(\?(?:!|:!?|=|<(?:=|!)?|)))|^(\()|^(\))/g
    ],
    loop = {
      "r_i" : 0 //result_JSON index
    }
  for( loop.r_i = 0; result_JSON.length > loop.r_i && ( match = /^\\/g.exec( result_JSON[ loop.r_i ].regex ) ) != null; loop.r_i++){
    if( regex.substring( match.index + match[0].length ).length > 0){
      result_JSON[ loop.r_i+1 ].regex = regex.substring( 2 );
      result_JSON[ loop.r_i+1 ].token_type = "string";
    }
    result_JSON[ loop.r_i ].regex = result_JSON[ loop.r_i ].regex.substring( 0, 2 )
    result_JSON[ loop.r_i ].token_type = "escape";
  }
}
  
  
