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
    };
  
  //Does the RegExArg inner value have escape sequences ("\")?
  
  for( loop.r_i = 0; result_JSON.length > loop.r_i && ( match = /^\\/g.exec( result_JSON[ loop.r_i ].regex ) ) != null; loop.r_i++){
    
    //Does the string following the matching "\" have a length greater than 0?
    
    if( result_JSON[ loop.r_i ].regex.substring( match[ 0 ].length ).length > 0 ){
      
      //Are the first few characters in the following string a SPECIAL escape sequence?
      
      if( ( match2 = /^(\d\d\d?)|^(x[A-Fa-f0-9][A-Fa-f0-9])|^(u[A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9])|^(c[A-Za-z])|^(0)/g.exec( result_JSON[ loop.r_i ].regex.substring( match[ 0 ].length ) ) ) != null ){
        
        //Is the SPECIAL escape sequence an octal escape?
        
        if( match2[ 1 ].length != 0 ){
          result_JSON[ loop.r_i+1 ].regex = result_JSON[ loop.r_i ].regex.substring( match2[ 1 ].length + 1 );
          result_JSON[ loop.r_i ].regex = '\\' + match2[ 1 ];
          result_JSON[ loop.r_i ].token_type = "escape::octal::len" + match2[ 1 ].length;
        }
        
        //Is the SPECIAL escape sequence a hexadecimal escape?
        
        if( match2[ 2 ].length != 0 ){
          result_JSON[ loop.r_i+1 ].regex = result_JSON[ loop.r_i ].regex.substring( 4 );
          result_JSON[ loop.r_i ].regex = '\\' + match2[ 2 ];
          result_JSON[ loop.r_i ].token_type = "escape::hexadecimal";
        }
        
        //Is the SPECIAL escape sequence an ES5 unicode escape?
        
        if( match2[ 3 ].length != 0 ){
          result_JSON[ loop.r_i+1 ].regex = result_JSON[ loop.r_i ].regex.substring( 6 );
          result_JSON[ loop.r_i ].regex = '\\' + match2[ 3 ];
          result_JSON[ loop.r_i ].token_type = "escape::unicode::ES5";
        }
        
        //Is the SPECIAL escape sequence a control character escape?
        
        if( match2[ 4 ].length != 0 ){
          result_JSON[ loop.r_i+1 ].regex = result_JSON[ loop.r_i ].regex.substring( 3 );
          result_JSON[ loop.r_i ].regex = '\\' + match2[ 4 ];
          result_JSON[ loop.r_i ].token_type = "escape::control_character";
        }
      }else
      
      //In the case that the first few characters in the following string are a REGULAR escape sequence
      
      {
        result_JSON[ loop.r_i+1 ].regex = regex.substring( 2 );
        result_JSON[ loop.r_i ].regex = '\\' + result_JSON[ loop.r_i ].regex.substring( 1, 2 );
        result_JSON[ loop.r_i ].token_type = "escape";
      }
      
      result_JSON[ loop.r_i+1 ].token_type = "string";
    }else
    
    //In the case that there is no string following "\"
    
    {
      result_JSON[ loop.r_i ].regex = '\\';
      result_JSON[ loop.r_i ].token_type = "string";
    }
  }
}
  
  
