function RegExObj( RegExArg ){
  
  //used for detecting if RegExArg exists and that it is a valid parameter
  
  var NaR = false;
  function StringToArray( RegExArg ){
    var result_array = [
        {
          "regex" : RegExArg,
          "token_type" : "string"
        }
      ],
      debug = {
        "tree_height" : 0;
      },
      handler = {
        "match",
        "regex" = /^(\(#\[)|^((?:\(\?(?:!|:!?|=|<(?:=|!)?|)))|^(\()|^(\))/g
      },
      loop = {
        "r_i" : 0, //result_arrray index
        "pm_i" : 0 //previous match index
      }
    while( ( handler.match = handler.regex.exec( RegExArg ) ) != null ){
      if( RegExArg.substring( match.index + match[ 0 ].length, 0 ).length > 0 ){
        result[ loop.r_i+1 ] = {
          "regex" : RegExArg.substring( match.index + match[ 0 ].length, 0 ),
          "token_type" : "string"
        }
      }
      if( match[ 4 ] === ""){
        if( match[ 1 ] != ""){
          result[ loop.r_i ].type = "capture_start"
        }
      }else{
        result[ loop.r_i ].type = "capture_end"
        debug.tree_height--;
      }
    }
  }
  var regex_validator = function( regex, bool ){
  while ((match = re.exec(regex)) != null) {
    if(regex.substring(match.index,0).length > 0){}
      result[i+1].regex = regex.substring(match.index,0);
      if(match[1] === ""){
        result[i+1].type = match[2];
        tree_height--;
      }else{
        result[i+1].type = match[2];
        tree_height++;
      }
    }
    if(regex.substring(p,match.index).length > 0){
      result[i].regex = match[0];
    }
    p = match.index;
    i++;
    i++;
  }
  if(tree_height > 0){
  
  //error
  
  }
}
}
