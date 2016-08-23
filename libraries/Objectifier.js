//Directly convert String to Object

function stringToObj( RegExArg ){
  
  //Argument must start with "/", but we don't want it as it isn't useful
  
  if( /^\//.test( RegExArg ) )
  {
    RegExArg = RegExArg.substring( 1 );
  }
  else
  {
    
    //Error, RegExArg is not a valid regex-string
    
  }
  
  //Argument must end with a "/" or a "/" followed by a flag, however this information is not useful for creating the object
  //Flags will be stored to the RegExObj
  //The inner value of the original argument is now the argument
  //This value is also all characters with indexes after the initial "/" up to the one where it equals the length of RegExArg without the initial "/" minus 1 (length to last index conversion) minus 1 (last "/") minus the length of the flag
  
  if( ( match = /\/([A-Za-z])/ ) ){
    this.flags = match[ 1 ];
    RegExArg = RegExArg.substring( 0, ( RegExArg.length -2 -match[1].length ) )
  }
  else
  {
    
    //Error, RegExArg is not a valid regex-string
    
  }
  
  //initialize the RegExObj's Tokens
  
  this.tokens = [
      {
        "regex" : RegExArg,
        "type" : "string"
      }
    ];
  var debug = {
      "group_depth" : 0, //Used for tracking nested groups and classes
      "string_tracker" : { //Used for tracking UNIDENTIFIED strings. Main and Mini alternate between indeces 0 and 1 respectively
        "first" : [ 0 ], 
        "second" : [ 0 ]
      }
    },
    loop = {
      "t_i" : { //token index. Main and Mini alternate between indeces 0 and 1 respectively
        "first" : 0,
        "second" : 0
      },
      "st_i" : { //string_tracker index. Main and Mini alternate between indeces 0 and 1 respectively
        "first" : 0,
        "second" : 0
      },
      "r_i" : 0 //used for creating regex strings for searching
    };
  
  for(
    
    //Reinitialize The first used token index
    
    loop.t_i.first = 0;
    
    //If the token index is less than the length of tokens, and there is an escape sequence ("\") within the currently checked token's regex
    //Execute the loop
    
    loop.t_i.first < this.tokens.length &&
      ( match = /\\/.exec( this.tokens[ loop.t_i.first ].regex ) ) != null;
    
    //Increment the first used token index after each loop
    
    loop.t_i.first++
  ){
    
    //If the loop condition passes, create a new token and assign it to the substring that starts with the first instance of "\"
    
  }
  
    //BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK
    //BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK
    //BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK
    //BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK
    //BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK
    //BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK
    //BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK
    //BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK
    //BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK
    //BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK
    //BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK BOOKMARK
  
    this.tokens[ loop.t_i.first+1 ].regex = this.tokens[ loop.t_i.first ].regex.substring( match.index );
    this.tokens[ loop.t_i.first+1 ].type = "string"; //Debugger will not be tracking this string YET
    
    //Create token for the unknown string before the escape character
    //Debugger does not need to add a tracker for this one as it is already tracking the string at index 0
    
    this.tokens[ loop.t_i.first ].regex = this.tokens[ loop.t_i.first ].regex.substring( 0, match.index );
    this.tokens[ loop.t_i.first ].type = "string";
    
    //starting by increasing loop.t_i.first by 1, loop through matches (escapes) found in the unknown strings
    //the loop only continues if the token index is less than the entire tokens length AND if a match exists
    
    for( loop.t_i.first++; this.tokens.length > loop.t_i.first && ( match = /^\\/.exec( this.tokens[ loop.t_i.first ].regex ) ) != null; loop.t_i.first++ )
    {
      
      //Does the string following the matching "\" have a length greater than 0?
      
      if( this.tokens[ loop.t_i.first ].regex.substring( match[ 0 ].length ).length > 0 )
      {
        
        //Are the first few characters in the following string a SPECIAL escape sequence? (prep)
        //Using these escape regexes:
        
        var escapes = [
            "^(\\d\\d\\d?)", //Octal
            "^(x[A-Fa-f0-9]{2})", //Hexadecimal
            "^(u[A-Fa-f0-9]{4})", //Unicode
            "^(c[A-Za-z])", //Control Character
            "^([1-9])" //Back Reference
          ],
          regex_string; //This is used for creating the regex that finds the escapes
        
        //Create regex_string
        
        for( loop.r_i = 0; escapes.length > loop.r_i; loop.r_i++ )
          regex_string = regex_string + ( loop.r_i === 0 ? "/" : "|" ) + escapes[ loop.r_i ];
        regex_string = regex_string + "/";
        
        //Are the first few characters in the following string a SPECIAL escape sequence? (check)
        
        if( ( match2 = new RegExp( regex_string ).exec( this.tokens[ loop.t_i.first ].regex.substring( match[ 0 ].length ) ) ) != null)
        {
          
          //Is the SPECIAL escape sequence an octal escape?
          
          if( match2[ 1 ].length != 0 )
          {
            this.tokens[ loop.t_i.first+1 ].regex = this.tokens[ loop.t_i.first ].regex.substring( match2[ 1 ].length );
            this.tokens[ loop.t_i.first ].regex = '\\' + match2[ 1 ];
            this.tokens[ loop.t_i.first ].type = "escape::octan::len" + match2[ 1 ].length;
          }
          
          //Is the SPECIAL escape sequence a hexadecimal escape?
          
          if( match2[ 2 ].length != 0 )
          {
            this.tokens[ loop.t_i.first+1 ].regex = this.tokens[ loop.t_i.first ].regex.substring( 4 );
            this.tokens[ loop.t_i.first ].regex = '\\' + match2[ 2 ];
            this.tokens[ loop.t_i.first ].type = "escape::hexadecimal";
          }
          
          //Is the SPECIAL escape sequence an ES5 unicode escape?
          
          if( match2[ 3 ].length != 0 )
          {
            this.tokens[ loop.t_i.first+1 ].regex = this.tokens[ loop.t_i.first ].regex.substring( 6 );
            this.tokens[ loop.t_i.first ].regex = '\\' + match2[ 3 ];
            this.tokens[ loop.t_i.first ].type = "escape::unicode::ES5";
          }
          
          //Is the SPECIAL escape sequence a control character escape?
          
          if( match2[ 4 ].length != 0 )
          {
            this.tokens[ loop.t_i.first+1 ].regex = this.tokens[ loop.t_i.first ].regex.substring( 3 );
            this.tokens[ loop.t_i.first ].regex = '\\' + match2[ 4 ];
            this.tokens[ loop.t_i.first ].type = "escape::control_character";
          }
          
          //Is the SPECIAL escape sequence NOT even an escape sequence, but a BACK REFERENCE?
          
          if( match2[ 5 ].length != 0 )
          {
            this.tokens[ loop.t_i.first+1 ].regex = this.tokens[ loop.t_i.first ].regex.substring( 2 );
            this.tokens[ loop.t_i.first ].regex = '\\' + match2[ 5 ];
            this.tokens[ loop.t_i.first ].type = "escape::reference";
          }
        }
        
        else //In the case that the first few characters in the following string are a REGULAR escape sequence
        
        {
          this.tokens[ loop.t_i,first+1 ].regex = this.tokens[ loop.t_i.first ].regex.substring( 2 );
          this.tokens[ loop.t_i.first ].regex = '\\' + this.tokens[ loop.t_i.first ].regex.substring( 1, 2 );
          this.tokens[ loop.t_i.first ].type = "escape";
        }
        
        //All newly made unknown strings will be identified as strings and tracked.
        
        //ADD FIX HERE
        //ADD FIX HERE
        //ADD FIX HERE
        //ADD FIX HERE
        //ADD FIX HERE
        //ADD FIX HERE
        //ADD FIX HERE
        //ADD FIX HERE
        //ADD FIX HERE
        //ADD FIX HERE
        
      }
      
      else //In the case that there is no string following "\"
      
      {
        
      }
    }
  }
}
        }else
        
        
        
        {
          result_JSON[ loop.r_i+1 ].regex = regex.substring( 2 );
          result_JSON[ loop.r_i ].regex = '\\' + result_JSON[ loop.r_i ].regex.substring( 1, 2 );
          result_JSON[ loop.r_i ].token_type = "escape";
        }
        
        result_JSON[ loop.r_i+1 ].token_type = "string";
        debug.string_tracker[] = loop.r_i + 1;
        
      }else
      
      //In the case that there is no string following "\"
      
      {
        result_JSON[ loop.r_i ].regex = '\\';
        result_JSON[ loop.r_i ].token_type = "string";
      }
    }
  }
  
  //Create mini result_JSON for inserting new elements
  
  var mini_result;
  
  //starting when the string tracker index is 0, loop through debug.string_tracker to find unknown strings in result_JSON
  
  for( loop.st_i = 0; loop.st_i < debug.string_tracker.length; loop.st_i++ ){
    
    //initialize mini_result to be the next unknown string in result_JSON
    
    mini_result = [];
    mini_result[ 0 ] = result_JSON[ debug.string_tracker[ loop.st_i ] ];
    loop.mr_i = 0;
    debug.mini_s_tracker = [ 0 ];
    
    //Does the mini_result[ 0 ] have character class starters ("[")?
    
    if( ( match = /\[/.exec( mini_result[ loop.mr_i ].regex ) ) != null ){
      
      mini_result[ loop.mr_i+1 ].regex = mini_result[ loop.mr_i ].regex.substring( match.index );
      mini_result[ loop.mr_i+1 ].token_type = "string";
      mini_result[ loop.mr_i ].regex = mini_result[ loop.mr_i ].regex.substring( 0. match.index );
      mini_result[ loop.mr_i ].token_type = "string";
      loop.mr_i++
      
      for( ; mini_result.length > loop.mr_i && ( match = /^\[/.exec( mini_result[ loop.mr_i ].regex ) ) != null; loop.mr_i++){
        
        //Does the string following the matching "[" have a length greater than 0?
        
        //editing-bookmark
        
        if( mini_result[ loop.mr_i ].regex.substring( match[ 0 ].length ).length > 0 ){
          
          //Are the first few characters in the following string a SPECIAL escape sequence?
          
          if( ( match2 = /^(\d\d\d?)|^(x[A-Fa-f0-9][A-Fa-f0-9])|^(u[A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9])|^(c[A-Za-z])|^([1-9])/.exec( result_JSON[ loop.r_i ].regex.substring( match[ 0 ].length ) ) ) != null ){
            
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
            
            //Is the SPECIAL escape sequence NOT even an escape sequence, but a BACK REFERENCE?
            
            if( match2[ 5 ].length != 0 ){
              result_JSON[ loop.r_i+1 ].regex = result_JSON[ loop.r_i ].regex.substring( 2 );
              result_JSON[ loop.r_i ].regex = '\\' + match2[ 4 ];
              result_JSON[ loop.r_i ].token_type = "escape::reference";
            }
          }else
          
          //In the case that the first few characters in the following string are a REGULAR escape sequence
          
          {
            result_JSON[ loop.r_i+1 ].regex = regex.substring( 2 );
            result_JSON[ loop.r_i ].regex = '\\' + result_JSON[ loop.r_i ].regex.substring( 1, 2 );
            result_JSON[ loop.r_i ].token_type = "escape";
          }
          
          result_JSON[ loop.r_i+1 ].token_type = "string";
          debug.string_tracker[] = loop.r_i + 1;
          
        }else
        
        //In the case that there is no string following "\"
        
        {
          result_JSON[ loop.r_i ].regex = '\\';
          result_JSON[ loop.r_i ].token_type = "string";
        }
      }
    }
    
  }
}
