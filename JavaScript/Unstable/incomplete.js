//Directly convert String to Object

function stringToObj( RegExArg ){

  //NOW we initialize the process and the object
  
  //Argument must start with "/", but we don't want it as it isn't useful
  
  if( RegExArg.charAt(0) === "/" )
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
  
  if( ( match = ( new RegExp( "/\\/([A-Za-z])/" ) ).exec( RegExArg ) ){
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
      "string_tracker" : [], //Used for tracking UNIDENTIFIED strings. Main and Mini alternate between indeces 0 and 1 respectively
      "track_sync" //Used for variables that are associated with string tracker (used for looping when string_tracker is being looped over; holds data continuously regardless of the string_tracker loop)
    },
    loop = {
      "t_i" :, //token index. Main and Mini alternate between indeces 0 and 1 respectively
      "st_i" : { //string_tracker index. Main and Mini alternate between indeces 0 and 1 respectively
        "first" : 0,
        "second" : 0
      },
      "r_i" : 0 //used for creating regex strings for searching
    };

  //NOW we do escape sequence/character detection
  
  for(
    
    //Reinitialize The first used token index
    
    loop.t_i = 0;
    
    //If the token index is less than the length of tokens, and there is an escape sequence ("\") within the currently checked token's regex
    //Execute the loop
    
    loop.t_i < this.tokens.length &&
      ( match = ( new RegExp( "/\\\\/" ) ).exec( this.tokens[ loop.t_i ].regex ) ) != null;
    
    //Increment the first used token index after each loop
    
    loop.t_i++
  ){
    
    //If the loop condition passes, create a new token and assign it to the substring that starts with the first instance of "\"
    
    this.tokens[ loop.t_i+1 ].regex = this.tokens[ loop.t_i ].regex.substring( match.index );
    this.tokens[ loop.t_i+1 ].type = "string"; //Debugger will not track BRAND NEW strings until they have been checked first
    
    //Create token for the unknown string before the escape character, then track it, as it has already been processed
    
    this.tokens[ loop.t_i ].regex = this.tokens[ loop.t_i ].regex.substring( 0, match.index );
    this.tokens[ loop.t_i ].type = "string";
    debug.string_tracker[] = loop.t_i; //tracking the already-checked string
    
    //increase tokens index by 1 to start searching the unknown and BRAND NEW string for escape SEQUENCES at the beginning, because that is where the escape character "\" is found
    
    loop.t_i++;
    
    //Does the string following the matching "\" (the remainder of the string following the first character ([0])) from the match way up above have a length that is greater than 0?
    //i.e. Does the string following the matching "\" have a length greater than 0?
    
    if( this.tokens[ loop.t_i ].regex.substring( 1 ).length > 0 )
    {
      
      //Are the first few characters in the following string a SPECIAL escape sequence? (this is the start for the prep of this question, continue downwards for the check itself)
      //(that matche these prepared regex patterns?):
        
      var escapes = [
          "^(\\d\\d\\d?)", //Octal
          "^(x[A-Fa-f0-9]{2})", //Hexadecimal
          "^(u[A-Fa-f0-9]{4})", //Unicode
          "^(c[A-Za-z])", //Control Character
          "^([1-9])" //Back Reference
        ],
        regex_string; //This is used for creating the regex that finds the escapes
      
      //Synthesize "regex_string" from the "escapes" array
      
      for(
        
        //Reinitialize regex_string (actually escape in this case) index
        
        loop.r_i = 0;
        
        //If the regex_string index is less than the amount of elements in the escape array, execute the loop
        
        loop.r_i > escapes.length;
        
        //increment the regex_string index by 1 after each loop
        
        loop.r_i++;
        
      ){
        
        //if the loop condition passes:
        //self-add to regex_string the separation/beginning character ("|" / "/") followed by the next escape sequence to match for
        
        regex_string = regex_string + ( 
          loop.r_i === 0 ?
          "/" : "|"
          )
          + escapes[ loop.r_i ];
      }
      
      //once the loop finishes through the escpaes array, finish it off with a terminating regex character ("/")
      
      regex_string = regex_string + "/";
      
      //Are the first few characters in following the escape character a SPECIAL escape sequence? (this is the actual check)
      
      if( ( match = ( new RegExp( regex_string ) ).exec( this.tokens[ loop.t_i ].regex.substring( 1 ) ) ) != null )
      {
          
        //Is the SPECIAL escape sequence an octal escape?
        
        if( match[ 1 ].length != 0 )
        {
          this.tokens[ loop.t_i+1 ].regex = this.tokens[ loop.t_i ].regex.substring( match[ 1 ].length );
          this.tokens[ loop.t_i ].regex = '\\' + match[ 1 ];
          this.tokens[ loop.t_i ].type = "escape::octan::len" + match[ 1 ].length;
        }
        
        //Is the SPECIAL escape sequence a hexadecimal escape?
        
        if( match[ 2 ].length != 0 )
        {
          this.tokens[ loop.t_i+1 ].regex = this.tokens[ loop.t_i ].regex.substring( 4 );
          this.tokens[ loop.t_i ].regex = '\\' + match[ 2 ];
          this.tokens[ loop.t_i ].type = "escape::hexadecimal";
        }
        
        //Is the SPECIAL escape sequence an ES5 unicode escape?
        
        if( match[ 3 ].length != 0 )
        {
          this.tokens[ loop.t_i+1 ].regex = this.tokens[ loop.t_i ].regex.substring( 6 );
          this.tokens[ loop.t_i ].regex = '\\' + match[ 3 ];
          this.tokens[ loop.t_i ].type = "escape::unicode::ES5";
        }
          
        //Is the SPECIAL escape sequence a control character escape?
          
        if( match[ 4 ].length != 0 )
        {
          this.tokens[ loop.t_i+1 ].regex = this.tokens[ loop.t_i ].regex.substring( 3 );
          this.tokens[ loop.t_i ].regex = '\\' + match[ 4 ];
          this.tokens[ loop.t_i ].type = "escape::control_character";
        }
          
        //Is the SPECIAL escape sequence NOT even an escape sequence, but a BACK REFERENCE?
          
        if( match[ 5 ].length != 0 )
        {
          this.tokens[ loop.t_i+1 ].regex = this.tokens[ loop.t_i ].regex.substring( 2 );
          this.tokens[ loop.t_i ].regex = '\\' + match[ 5 ];
          this.tokens[ loop.t_i ].type = "escape::reference";
        }
      }
      
      else //In the case that the first few characters in the following string are a REGULAR escape sequence
      
      {
        this.tokens[ loop.t_i+1 ].regex = this.tokens[ loop.t_i ].regex.substring( 2 );
        this.tokens[ loop.t_i ].regex = this.tokens[ loop.t_i ].regex.substring( 0, 2 );
        this.tokens[ loop.t_i ].type = "escape";
      }
      
      this.tokens[ loop.t_i+1 ].regex = "string";
      debug.string_tracker[] = loop.t_i; //tracking the just-now-checked string
      
      
    } //original loop
    
    else //In the case that there is no string following "\"
    
    {
      this.tokens[ loop.t_i ].regex = '\\';
      this.tokens[ loop.t_i ].type = 'string';
      
      //this string does not need further tracking as it is identified as a non-escape escape char "\";
      
    } //check for SPECIAL ESCAPES, REGULAR ESCAPES, and Non-escape "\" strings
    
  } //the escape-char-seq-detecting loop

  //NOW we do character class detection

  //the detection process will search each unidentified string token ONCE for bits and pieces of character classes and group them together into an class-token

  debug.track_sync = { //initiate what data the loop needs to know and keep for each loop
    "searchingFor" = "[", //what is currently being searched for
  }

  for(

    //reinitialize debug.string_tracker index to 0

    loop.st_i = 0;

    //if there are more unidentified string tokens to check, continue looping

    loop.st_i < debug.string_tracker.length;

    //after every loop increment the string_tracker index

    loop.st_i++;

  ){

    //create regex with what we are searching for

    var regex_string = "/\\" + debug.track_sync.searchingFor + "/";

    //reason for loop instead of if-condition is that regex_string is intended on changing if there are no tokens in between "[" and "]" and the following "["/"]" pairs and
    //this loop will be used for splicing the tokens array

    while( ( match = ( new RegExp( regex_string ) ).exec(
      this.tokens[ 
        debug.string_tracker[ loop.st_i ]
      ].regex.substring( 1 ) 
    ) ) != null ){ 

      //splice tokens here into 3 groups:
        //before-slice (old) tokens
        //at-slice (new) token < this token will be the one worked on
        //after-slice (old) tokens
      //then rejoin them

    } //token-splicing loop

  } //character-class-detecting loop
  
} //the stringToObject function
