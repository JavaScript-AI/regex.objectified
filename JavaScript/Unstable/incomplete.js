//Directly convert String to Object

function stringToObj( RegExArg ){

  var regex_string; //used for creating RegExp objects dynamically

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
      "cycler_sync" : { //Used for storing data across loops in the token cycler
        "detector" : 0
      },
      "detector_sync" //Used for storing data across loops in the detector loops
    },
    loop = {
      "dt_i" : 0, //tracked token index. Main and Mini alternate between indeces 0 and 1 respectively
      "st_i" : 0, //string_tracker index. Main and Mini alternate between indeces 0 and 1 respectively
      "r_i" : 0 //used for creating regex strings for searching
    };

  //track the main string
  
  debug.string_tracker[] = 0 //0 is the index of the token that is the original string

  for( //TOKEN CYCLER (loops through possible tokens: tokens that could possibly have undiscovered tokens within them)

    //reinitialize the string tracker index to 0

    loop.st_i;

    //if the amount of checked strings minus 1 (if the currently checking index) is less than the total amount of tracked strings, loop through checks

    loop.st_i < debug.string_tracker.length;

    //after every loop increment the checking index by 1

    loop.st_i++;

  ){

    //Reinitialize quick short hand index to be the currently tracked token index

    loop.dt_i = debug.string_tracker[ loop.st_i ];

    //ESCAPE DETECTOR

    while(

      //update match (match.index) and if it exists,

      ( match = ( new RegExp( "/\\\\/" ) ).exec( this.tokens[ loop.dt_i ].regex ) ) != null &&

      //and if the detection switch (debug.cycler_sync.detector) is set to 0, perform the ESCAPE DETECTOR

      debug.cycler_sync.detector === 0

    ){

      //if match the match is NOT at the beginning (match.index !== 0) of the string, make the first token be all the junk before the "\", and create a new token that will be a MIXED TOKEN (ESCAPE/UNIDENTIFIED STRING)

      if( match.index !== 0 )
      {

        //create the new MIXED TOKEN

        this.tokens[ loop.dt_i+1 ].regex = this.tokens[ loop.dt_i ].regex.substring( match.index );

        //Debugger will NOT track this string token, because it is not PARTIALLY AN ESCAPE and AN UNIDENTIFIED STRING (a MIXED TOKEN)

        this.tokens[ loop.dt_i+1 ].type = "string::mixed";

        //Create token for the UNIDENTIFIED STRING that exists before the escape character ("\"), as it has already been processed (it is already being tracked)

        this.tokens[ loop.dt_i ].regex = this.tokens[ loop.dt_i ].regex.substring( 0, match.index );
        this.tokens[ loop.dt_i ].type = "string::unidentified";

        //increase THE TOKENS ARRAY INDEX STORED **WITHIN** the string tracker array

        loop.dt_i = debug.string_tracker[ loop.st_i ] = loop.dt_i + 1;

        //it is important to note that this WILL NOT CREATE AN EMPTY STRING TOKEN for the MIXED TOKEN, because the loop condition will not pass if the match is an empty string

      }else{

        //there is no this.tokens[].regex statement, because this.tokens[ loop.dt_i ].regex = this.tokens[ loop.dt_i ].regex.substring( 0 ) would be a self assigment

        //assign the CURRENTLY EXISTING TOKEN, WHICH DOES NOT REQUIRE CHANGE in the regex property, the MIXED TOKEN class

        this.tokens[ loop.dt_i ].type = "string::mixed";

      }

      //The following section is for detecting whether the following characters (after the "\" taken from the match) form a string with a length greater than 0 (the following string is not an empty string)?
      //The tokens beginning (due to the above if/else script) now is at the place where the MATCH starts

      if( this.tokens[ loop.t_i ].regex.substring( 1 ).length > 0 ){

        //the following is a preparatory script for a detector that checks for special escape sequences
        //the following array contains those sequences (in regex)

        var escapes = [
            "^(\\d\\d\\d?)", //Octal
            "^(x[A-Fa-f0-9]{2})", //Hexadecimal
            "^(u[A-Fa-f0-9]{4})", //Unicode
            "^(c[A-Za-z])", //Control Character
            "^([1-9])" //Back Reference
          ];

        //synthesize the "regex_string" from the "escapes" array

        for(

          //Reinitialize the regex_string (acually escape) index

          loop.r_i = 0;

          //if the escape index is less than the amount of escapes, execute the loop

          loop.r_i < escapes.length;

          //increment the index after each loop

          loop.r_i++;

        ){

          regex_string += ( loop.r_i === 0 ? "/" : "|" ) + escapes[ loop.r_i ];

        }

        //at this point regex_string has all necessary characters except for the terminator (and any flags, but we don't need flags)

        regex_string += "/";

        //detector for special escape sequences
        //NOTE: detection STARTS AT INDEX '1'

        if( ( match = ( new RegExp( regex_string ) ).exec( this.tokens[ loop.dt_i ].regex.substring( 1 ) ) ) != null )
        {

          //is the SPECIAL ESCAPE sequence an OCTAL ESCAPE?

          if( match[ 1 ].length != 0 )
          {

            //PREVENTIVE CHECK for NO EMPTY TOKENS creation (if the string after the match is empty, do not create a token for it)
            //creates unidentified string tokens for the string following the SPECIAL ESCAPE SEQUENCE, if PREVENTIVE CHECK passes

            if( this.tokens[ loop.dt_i ].regex.substring( match[ 1 ].length /*-1 (to get final index) +1 (to make final index non-inclusive)*/ +1 /*include the length of the "\"*/ ).length > 0 )
            {
              this.tokens[ loop.dt_i+1 ].regex = this.tokens[ loop.dt_i ].regex.substring( match[ 1 ].length /*-1 (to get final index) +1 (to make final index non-inclusive)*/ +1 /*include the length of the "\"*/ );
              this.tokens[ loop.dt_i+1 ].type = "string::unidentified";

              //increase THE TOKENS ARRAY INDEX STORED **WITHIN** the string tracker array

              loop.dt_i = debug.string_tracker[ loop.st_i ] = loop.dt_i + 1;

            } //PREVENTIVE CHECK DESIGN (issue #26)

            //cut and modify CURRENTLY-BEING-CHECKED token to be the SPECIAL ESCAPE sequence

            this.tokens[ loop.dt_i ].regex = "\\" + match[ 1 ];
            this.tokens[ loop.dt_i ].type = "escape::octal::len-" + match[ 1 ].length;

          } //OCTAL SPECIAL ESCAPE

          //is the SPECIAL ESCAPE sequence an HEXADECIMAL ESCAPE?

          if( match[ 2 ].length != 0 )
          {

            //PREVENTIVE CHECK for NO EMPTY TOKENS creation (if the string after the match is empty, do not create a token for it)
            //creates unidentified string tokens for the string following the SPECIAL ESCAPE SEQUENCE, if PREVENTIVE CHECK passes

            if( this.tokens[ loop.dt_i ].regex.substring( 3 /*-1 (to get final index) +1 (to make final index non-inclusive)*/ +1 /*include the length of the "\"*/ ).length > 0 )
            {
              this.tokens[ loop.dt_i+1 ].regex = this.tokens[ loop.dt_i ].regex.substring( 4 /*explanation is in "if" statement*/ );
              this.tokens[ loop.dt_i+1 ].type = "string::unidentified";

              //increase THE TOKENS ARRAY INDEX STORED **WITHIN** the string tracker array

              loop.dt_i = debug.string_tracker[ loop.st_i ] = loop.dt_i + 1;

            } //PREVENTIVE CHECK DESIGN (issue #26)

            //cut and modify CURRENTLY-BEING-CHECKED token to be the SPECIAL ESCAPE sequence

            this.tokens[ loop.dt_i ].regex = "\\" + match[ 2 ];
            this.tokens[ loop.dt_i ].type = "escape::hexadecimal";

          } //HEXADECIMAL ESCAPE

          //is the SPECIAL ESCAPE sequence an ES3-ES5 UNICODE ESCAPE?

          if( match[ 3 ].length != 0 )
          {

            //PREVENTIVE CHECK for NO EMPTY TOKENS creation (if the string after the match is empty, do not create a token for it)
            //creates unidentified string tokens for the string following the SPECIAL ESCAPE SEQUENCE, if PREVENTIVE CHECK passes

            if( this.tokens[ loop.dt_i ].regex.substring( 5 /*-1 (to get final index) +1 (to make final index non-inclusive)*/ +1 /*include the length of the "\"*/ ).length > 0 )
            {
              this.tokens[ loop.dt_i+1 ].regex = this.tokens[ loop.dt_i ].regex.substring( 6 /*explanation is in "if" statement*/ );
              this.tokens[ loop.dt_i+1 ].type = "string::unidentified";

              //increase THE TOKENS ARRAY INDEX STORED **WITHIN** the string tracker array

              loop.dt_i = debug.string_tracker[ loop.st_i ] = loop.dt_i + 1;

            } //PREVENTIVE CHECK DESIGN (issue #26)

            //cut and modify CURRENTLY-BEING-CHECKED token to be the SPECIAL ESCAPE sequence

            this.tokens[ loop.dt_i ].regex = "\\" + match[ 3 ];
            this.tokens[ loop.dt_i ].type = "escape::unicode::ES3";

          } //ES3 UNICODE ESCAPE

          //is the SPECIAL ESCAPE sequence a CONTROL CHARACTER ESCAPE?

          if( match[ 4 ].length != 0 )
          {

            //PREVENTIVE CHECK for NO EMPTY TOKENS creation (if the string after the match is empty, do not create a token for it)
            //creates unidentified string tokens for the string following the SPECIAL ESCAPE SEQUENCE, if PREVENTIVE CHECK passes

            if( this.tokens[ loop.dt_i ].regex.substring( 2 /*-1 (to get final index) +1 (to make final index non-inclusive)*/ +1 /*include the length of the "\"*/ ).length > 0 )
            {
              this.tokens[ loop.dt_i+1 ].regex = this.tokens[ loop.dt_i ].regex.substring( 3 /*explanation is in "if" statement*/ );
              this.tokens[ loop.dt_i+1 ].type = "string::unidentified";

              //increase THE TOKENS ARRAY INDEX STORED **WITHIN** the string tracker array

              loop.dt_i = debug.string_tracker[ loop.st_i ] = loop.dt_i + 1;

            } //PREVENTIVE CHECK DESIGN (issue #26)

            //cut and modify CURRENTLY-BEING-CHECKED token to be the SPECIAL ESCAPE sequence

            this.tokens[ loop.dt_i ].regex = "\\" + match[ 4 ];
            this.tokens[ loop.dt_i ].type = "escape::control_character";

          } //CONTROL CHARACTER ESCAPE
          
          //is the SPECIAL ESCPAE sequence NOT even an escape sequence, but a BACK REFERENCE?

          if( match[ 5 ].length != 0 )
          {

            //PREVENTIVE CHECK for NO EMPTY TOKENS creation (if the string after the match is empty, do not create a token for it)
            //creates unidentified string tokens for the string following the SPECIAL ESCAPE SEQUENCE, if PREVENTIVE CHECK passes

            if( this.tokens[ loop.dt_i ].regex.substring( 1 /*-1 (to get final index) +1 (to make final index non-inclusive)*/ +1 /*include the length of the "\"*/ ).length > 0 )
            {
              this.tokens[ loop.dt_i+1 ].regex = this.tokens[ loop.dt_i ].regex.substring( 2 /*explanation is in "if" statement*/ );
              this.tokens[ loop.dt_i+1 ].type = "string::unidentified";

              //increase THE TOKENS ARRAY INDEX STORED **WITHIN** the string tracker array

              loop.dt_i = debug.string_tracker[ loop.st_i ] = loop.dt_i + 1;

            } //PREVENTIVE CHECK DESIGN (issue #26)

            //cut and modify CURRENTLY-BEING-CHECKED token to be the SPECIAL ESCAPE sequence

            this.tokens[ loop.dt_i ].regex = "\\" + match[ 5 ];
            this.tokens[ loop.dt_i ].type = "escape::reference";

          } //BACK REFERENCE

        } //SPECIAL ESCAPES DETECTOR

        else //In the case that the first few characters in the following string are a REGULAR escape sequence

        {

          //PREVENTIVE CHECK for NO EMPTY TOKENS creation (if the string after the match is empty, do not create a token for it)
          //creates unidentified string tokens for the string following the REGULAR ESCAPE SEQUENCE, if PREVENTIVE CHECK passes

          if( this.tokens[ loop.dt_i ].regex.substring( 2 /*uses same logic as BACK REFERENCE ^^^*/ ).length > 0 )
          {
            this.tokens[ loop.dt_i+1 ].regex = this.tokens[ loop.dt_i ].regex.substring( 2 /*uses same logic as BACK REFERENCE ^^^*/ );
            this.tokens[ loop.dt_i+1 ].type = "string::unidentified";

            //increase THE TOKENS ARRAY INDEX STORED **WITHIN** the string tracker array

            loop.dt_i = debug.string_tracker[ loop.st_i ] = loop.dt_i + 1;

          } //PREVENTIVE CHECK DESIGN (issue #26)

          //cut and modify CURRENTLY-BEING-CHECKED token to be the REGULAR ESCAPE sequence

          this.tokens[ loop.dt_i ].regex = this.tokens[ loop.dt_i ].regex.substring( 0, 2 /*there is no match for the REGULAR ESCAPE sequence, so we use this alternative for creating the regex portion*/ );
          this.tokens[ loop.dt_i ].type = "escape;

        } //REGULAR ESCPAPES DETECTOR (which is really the SPECIAL ESCAPE DETECTOR's "else" statement)

      } //CHECK FOR ANY FOLLOWING STRING

      else //in the case that there are no characters following the "\"

      {

        this.tokens[ loop.dt_i ].regex = "\\";
        this.tokens[ loop.dt_i ].type = "string::bad::escape";

      } //CHECK FOR ANY FOLLOWING STRING ("else" statement)

    } // ESCAPE DETECTOR loop

  } //TOKEN CYCLER loop