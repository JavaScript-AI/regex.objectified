
    //ESCAPE DETECTOR

    while(

      //update match (match.index) and if it exists,

      ( match = ( new RegExp( "/\\\\/" ) ).exec( this.tokens[ loop.st__v ].regex ) ) != null &&

      //at this point if there was no change to loop.st__v (debug.detector_sync.prev_st__v === loop.st__v) set debug.cycler_sync.detector to 1
      //and if the detection switch (debug.cycler_sync.detector) is set to 0, perform the ESCAPE DETECTOR

      ( debug.cycler_sync.detector = //parenthesis: assign a value to debug.cycler_sync.detector, then return (that) debug.cycler_sync.detector's value

        ( loop.st_i === debug.string_tracker.length - 1 ? //if the STRING TRACKER INDEX (index of STRING TRACKER) is the last index

          ( debug.detector_sync.prev_dt_i === loop.dt_i ? //and if the STRING TRACKER VALUE (index of token) did not change

            /*incremented value:*/ 1 : //increment the value
            /*kept/maintained/static value:*/ 0 //otherwise maintain the value at the same state

          ) : //STRING TRACKER VALUE CHANGE?

          /*kept/maintained/static value:*/ 0 //otherwise maintain the value at the same state

        ) //STRING TRACKER INDEX IS LAST?

      ) === /*value associated with detector: (in ESCAPE DETECTOR) 0*/

    ){

      debug.detector_sync.prev_st__v = loop.st__v;

      //if match the match is NOT at the beginning (match.index !== 0) of the string, make the first token be all the junk before the "\", and create a new token that will be a MIXED TOKEN (ESCAPE/UNIDENTIFIED STRING)

      if( match.index !== 0 )
      {

        //create the new MIXED TOKEN

        this.tokens[ loop.st__v+1 ].regex = this.tokens[ loop.st__v ].regex.substring( match.index );

        //Debugger will NOT track this string token, because it is not PARTIALLY AN ESCAPE and AN UNIDENTIFIED STRING (a MIXED TOKEN)

        this.tokens[ loop.st__v+1 ].type = "string::mixed";

        //Create token for the UNIDENTIFIED STRING that exists before the escape character ("\"), as it has already been processed (it is already being tracked)

        this.tokens[ loop.st__v ].regex = this.tokens[ loop.st__v ].regex.substring( 0, match.index );
        this.tokens[ loop.st__v ].type = "string::unidentified";

        //increase ALL STRING TRACKER VALUES by 1 as a NEW TOKEN (the MIXED ONE) was INSERTED.

        for(

          //reinitialize the INCREMENTATION INDEX to be the current STRING TRACKER INDEX

          loop.st_for = loop.st_i;

          //if the INCREMENTER INDEX is less than the amount of values in the STRING TRACKER, loop through TRACKER INCREMENTATION

          loop.st_for < debug.string_tracker.length;

          //increment the INCREMENTATION INDEX by 1 after every loop

          loop.st_for++;

        ){
          debug.string_tracker[ loop.st_for ]++;
        } //TRACKER INCREMENTER (issue #32)

        //increase THE TOKENS ARRAY INDEX STORED **WITHIN** the string tracker array
        //A.K.A. reset the short-hand STRING TRACKER VALUE to the current long-hand STRING TRACKER VALUE

        loop.st__v = debug.string_tracker[ loop.st_i ];

        //it is important to note that this WILL NOT CREATE AN EMPTY STRING TOKEN for the MIXED TOKEN, because the loop condition will not pass if the match is an empty string

      }else{

        //there is no this.tokens[].regex statement, because this.tokens[ loop.st__v ].regex = this.tokens[ loop.st__v ].regex.substring( 0 ) would be a self assigment

        //assign the CURRENTLY EXISTING TOKEN, WHICH DOES NOT REQUIRE CHANGE in the regex property, the MIXED TOKEN class

        this.tokens[ loop.st__v ].type = "string::mixed";

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

        if( ( match = ( new RegExp( regex_string ) ).exec( this.tokens[ loop.st__v ].regex.substring( 1 ) ) ) != null )
        {

          //is the SPECIAL ESCAPE sequence an OCTAL ESCAPE?

          if( match[ 1 ].length != 0 )
          {

            //PREVENTIVE CHECK for NO EMPTY TOKENS creation (if the string after the match is empty, do not create a token for it)
            //creates unidentified string tokens for the string following the SPECIAL ESCAPE SEQUENCE, if PREVENTIVE CHECK passes

            if( this.tokens[ loop.st__v ].regex.substring( match[ 1 ].length /*-1 (to get final index) +1 (to make final index non-inclusive)*/ +1 /*include the length of the "\"*/ ).length > 0 )
            {
              this.tokens[ loop.st__v+1 ].regex = this.tokens[ loop.st__v ].regex.substring( match[ 1 ].length /*-1 (to get final index) +1 (to make final index non-inclusive)*/ +1 /*include the length of the "\"*/ );
              this.tokens[ loop.st__v+1 ].type = "string::unidentified";

              //increase ALL STRING TRACKER VALUES by 1 as a NEW TOKEN (the MIXED ONE) was INSERTED.

              for(

                //reinitialize the INCREMENTATION INDEX to be the current STRING TRACKER INDEX

                loop.st_for = loop.st_i;

                //if the INCREMENTER INDEX is less than the amount of values in the STRING TRACKER, loop through TRACKER INCREMENTATION

                loop.st_for < debug.string_tracker.length;

                //increment the INCREMENTATION INDEX by 1 after every loop

                loop.st_for++;

              ){
                debug.string_tracker[ loop.st_for ]++;
              } //TRACKER INCREMENTER (issue #32)

              //reset the short-hand STRING TRACKER VALUE to the current long-hand STRING TRACKER VALUE

              loop.st__v = debug.string_tracker[ loop.st_i ];

            } //PREVENTIVE CHECK DESIGN (issue #26)

            //cut and modify CURRENTLY-BEING-CHECKED token to be the SPECIAL ESCAPE sequence

            this.tokens[ loop.st__v ].regex = "\\" + match[ 1 ];
            this.tokens[ loop.st__v ].type = "escape::octal::len-" + match[ 1 ].length;

          } //OCTAL SPECIAL ESCAPE

          //is the SPECIAL ESCAPE sequence an HEXADECIMAL ESCAPE?

          if( match[ 2 ].length != 0 )
          {

            //PREVENTIVE CHECK for NO EMPTY TOKENS creation (if the string after the match is empty, do not create a token for it)
            //creates unidentified string tokens for the string following the SPECIAL ESCAPE SEQUENCE, if PREVENTIVE CHECK passes

            if( this.tokens[ loop.st__v ].regex.substring( 3 /*-1 (to get final index) +1 (to make final index non-inclusive)*/ +1 /*include the length of the "\"*/ ).length > 0 )
            {
              this.tokens[ loop.st__v+1 ].regex = this.tokens[ loop.st__v ].regex.substring( 4 /*explanation is in "if" statement*/ );
              this.tokens[ loop.st__v+1 ].type = "string::unidentified";

              //increase ALL STRING TRACKER VALUES by 1 as a NEW TOKEN (the MIXED ONE) was INSERTED.

              for(

                //reinitialize the INCREMENTATION INDEX to be the current STRING TRACKER INDEX

                loop.st_for = loop.st_i;

                //if the INCREMENTER INDEX is less than the amount of values in the STRING TRACKER, loop through TRACKER INCREMENTATION

                loop.st_for < debug.string_tracker.length;

                //increment the INCREMENTATION INDEX by 1 after every loop

                loop.st_for++;

              ){
                debug.string_tracker[ loop.st_for ]++;
              } //TRACKER INCREMENTER (issue #32)

              //reset the short-hand STRING TRACKER VALUE to the current long-hand STRING TRACKER VALUE

              loop.st__v = debug.string_tracker[ loop.st_i ];

            } //PREVENTIVE CHECK DESIGN (issue #26)

            //cut and modify CURRENTLY-BEING-CHECKED token to be the SPECIAL ESCAPE sequence

            this.tokens[ loop.st__v ].regex = "\\" + match[ 2 ];
            this.tokens[ loop.st__v ].type = "escape::hexadecimal";

          } //HEXADECIMAL ESCAPE

          //is the SPECIAL ESCAPE sequence an ES3-ES5 UNICODE ESCAPE?

          if( match[ 3 ].length != 0 )
          {

            //PREVENTIVE CHECK for NO EMPTY TOKENS creation (if the string after the match is empty, do not create a token for it)
            //creates unidentified string tokens for the string following the SPECIAL ESCAPE SEQUENCE, if PREVENTIVE CHECK passes

            if( this.tokens[ loop.st__v ].regex.substring( 5 /*-1 (to get final index) +1 (to make final index non-inclusive)*/ +1 /*include the length of the "\"*/ ).length > 0 )
            {
              this.tokens[ loop.st__v+1 ].regex = this.tokens[ loop.st__v ].regex.substring( 6 /*explanation is in "if" statement*/ );
              this.tokens[ loop.st__v+1 ].type = "string::unidentified";

              //increase ALL STRING TRACKER VALUES by 1 as a NEW TOKEN (the MIXED ONE) was INSERTED.

              for(

                //reinitialize the INCREMENTATION INDEX to be the current STRING TRACKER INDEX

                loop.st_for = loop.st_i;

                //if the INCREMENTER INDEX is less than the amount of values in the STRING TRACKER, loop through TRACKER INCREMENTATION

                loop.st_for < debug.string_tracker.length;

                //increment the INCREMENTATION INDEX by 1 after every loop

                loop.st_for++;

              ){
                debug.string_tracker[ loop.st_for ]++;
              } //TRACKER INCREMENTER (issue #32)

              //reset the short-hand STRING TRACKER VALUE to the current long-hand STRING TRACKER VALUE

              loop.st__v = debug.string_tracker[ loop.st_i ];

            } //PREVENTIVE CHECK DESIGN (issue #26)

            //cut and modify CURRENTLY-BEING-CHECKED token to be the SPECIAL ESCAPE sequence

            this.tokens[ loop.st__v ].regex = "\\" + match[ 3 ];
            this.tokens[ loop.st__v ].type = "escape::unicode::ES3";

          } //ES3 UNICODE ESCAPE

          //is the SPECIAL ESCAPE sequence a CONTROL CHARACTER ESCAPE?

          if( match[ 4 ].length != 0 )
          {

            //PREVENTIVE CHECK for NO EMPTY TOKENS creation (if the string after the match is empty, do not create a token for it)
            //creates unidentified string tokens for the string following the SPECIAL ESCAPE SEQUENCE, if PREVENTIVE CHECK passes

            if( this.tokens[ loop.st__v ].regex.substring( 2 /*-1 (to get final index) +1 (to make final index non-inclusive)*/ +1 /*include the length of the "\"*/ ).length > 0 )
            {
              this.tokens[ loop.st__v+1 ].regex = this.tokens[ loop.st__v ].regex.substring( 3 /*explanation is in "if" statement*/ );
              this.tokens[ loop.st__v+1 ].type = "string::unidentified";

              //increase ALL STRING TRACKER VALUES by 1 as a NEW TOKEN (the MIXED ONE) was INSERTED.

              for(

                //reinitialize the INCREMENTATION INDEX to be the current STRING TRACKER INDEX

                loop.st_for = loop.st_i;

                //if the INCREMENTER INDEX is less than the amount of values in the STRING TRACKER, loop through TRACKER INCREMENTATION

                loop.st_for < debug.string_tracker.length;

                //increment the INCREMENTATION INDEX by 1 after every loop

                loop.st_for++;

              ){
                debug.string_tracker[ loop.st_for ]++;
              } //TRACKER INCREMENTER (issue #32)

              //reset the short-hand STRING TRACKER VALUE to the current long-hand STRING TRACKER VALUE

              loop.st__v = debug.string_tracker[ loop.st_i ];

            } //PREVENTIVE CHECK DESIGN (issue #26)

            //cut and modify CURRENTLY-BEING-CHECKED token to be the SPECIAL ESCAPE sequence

            this.tokens[ loop.st__v ].regex = "\\" + match[ 4 ];
            this.tokens[ loop.st__v ].type = "escape::control_character";

          } //CONTROL CHARACTER ESCAPE
          
          //is the SPECIAL ESCPAE sequence NOT even an escape sequence, but a BACK REFERENCE?

          if( match[ 5 ].length != 0 )
          {

            //PREVENTIVE CHECK for NO EMPTY TOKENS creation (if the string after the match is empty, do not create a token for it)
            //creates unidentified string tokens for the string following the SPECIAL ESCAPE SEQUENCE, if PREVENTIVE CHECK passes

            if( this.tokens[ loop.st__v ].regex.substring( 1 /*-1 (to get final index) +1 (to make final index non-inclusive)*/ +1 /*include the length of the "\"*/ ).length > 0 )
            {
              this.tokens[ loop.st__v+1 ].regex = this.tokens[ loop.st__v ].regex.substring( 2 /*explanation is in "if" statement*/ );
              this.tokens[ loop.st__v+1 ].type = "string::unidentified";

              //increase ALL STRING TRACKER VALUES by 1 as a NEW TOKEN (the MIXED ONE) was INSERTED.

              for(

                //reinitialize the INCREMENTATION INDEX to be the current STRING TRACKER INDEX

                loop.st_for = loop.st_i;

                //if the INCREMENTER INDEX is less than the amount of values in the STRING TRACKER, loop through TRACKER INCREMENTATION

                loop.st_for < debug.string_tracker.length;

                //increment the INCREMENTATION INDEX by 1 after every loop

                loop.st_for++;

              ){
                debug.string_tracker[ loop.st_for ]++;
              } //TRACKER INCREMENTER (issue #32)

              //reset the short-hand STRING TRACKER VALUE to the current long-hand STRING TRACKER VALUE

              loop.st__v = debug.string_tracker[ loop.st_i ];

            } //PREVENTIVE CHECK DESIGN (issue #26)

            //cut and modify CURRENTLY-BEING-CHECKED token to be the SPECIAL ESCAPE sequence

            this.tokens[ loop.st__v ].regex = "\\" + match[ 5 ];
            this.tokens[ loop.st__v ].type = "escape::reference";

          } //BACK REFERENCE

        } //SPECIAL ESCAPES DETECTOR

        else //In the case that the first few characters in the following string are a REGULAR escape sequence

        {

          //PREVENTIVE CHECK for NO EMPTY TOKENS creation (if the string after the match is empty, do not create a token for it)
          //creates unidentified string tokens for the string following the REGULAR ESCAPE SEQUENCE, if PREVENTIVE CHECK passes

          if( this.tokens[ loop.st__v ].regex.substring( 2 /*uses same logic as BACK REFERENCE ^^^*/ ).length > 0 )
          {
            this.tokens[ loop.st__v+1 ].regex = this.tokens[ loop.st__v ].regex.substring( 2 /*uses same logic as BACK REFERENCE ^^^*/ );
            this.tokens[ loop.st__v+1 ].type = "string::unidentified";

            //increase ALL STRING TRACKER VALUES by 1 as a NEW TOKEN (the MIXED ONE) was INSERTED.

            for(

              //reinitialize the INCREMENTATION INDEX to be the current STRING TRACKER INDEX

              loop.st_for = loop.st_i;

              //if the INCREMENTER INDEX is less than the amount of values in the STRING TRACKER, loop through TRACKER INCREMENTATION

              loop.st_for < debug.string_tracker.length;

              //increment the INCREMENTATION INDEX by 1 after every loop

              loop.st_for++;

            ){
              debug.string_tracker[ loop.st_for ]++;
            } //TRACKER INCREMENTER (issue #32)

            //reset the short-hand STRING TRACKER VALUE to the current long-hand STRING TRACKER VALUE

            loop.st__v = debug.string_tracker[ loop.st_i ];

          } //PREVENTIVE CHECK DESIGN (issue #26)

          //cut and modify CURRENTLY-BEING-CHECKED token to be the REGULAR ESCAPE sequence

          this.tokens[ loop.st__v ].regex = this.tokens[ loop.st__v ].regex.substring( 0, 2 /*there is no match for the REGULAR ESCAPE sequence, so we use this alternative for creating the regex portion*/ );
          this.tokens[ loop.st__v ].type = "escape;

        } //REGULAR ESCPAPES DETECTOR (which is really the SPECIAL ESCAPE DETECTOR's "else" statement)

      } //CHECK FOR ANY FOLLOWING STRING

      else //in the case that there are no characters following the "\"

      {

        this.tokens[ loop.st__v ].regex = "\\";
        this.tokens[ loop.st__v ].type = "string::bad::escape";

      } //CHECK FOR ANY FOLLOWING STRING ("else" statement)

    } // ESCAPE DETECTOR loop

    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE

    //CLASS DETECTOR

    while(

      //update match (match.index) and if it exists,

      ( match = ( new RegExp( "/\\\\/" ) ).exec( this.tokens[ loop.st__v ].regex ) ) != null &&

      //at this point if there was no change to loop.st__v (debug.detector_sync.prev_st__v === loop.st__v) set debug.cycler_sync.detector to 1
      //and if the detection switch (debug.cycler_sync.detector) is set to 0, perform the ESCAPE DETECTOR

      ( debug.cycler_sync.detector = //parenthesis: assign a value to debug.cycler_sync.detector, then return (that) debug.cycler_sync.detector's value

        ( loop.st_i === debug.string_tracker.length - 1 ? //if the STRING TRACKER INDEX (index of STRING TRACKER) is the last index

          ( debug.detector_sync.prev_dt_i === loop.dt_i ? //and if the STRING TRACKER VALUE (index of token) did not change

            /*incremented value:*/ 1 : //increment the value
            /*kept/maintained/static value:*/ 0 //otherwise maintain the value at the same state

          ) : //STRING TRACKER VALUE CHANGE?

          /*kept/maintained/static value:*/ 0 //otherwise maintain the value at the same state

        ) //STRING TRACKER INDEX IS LAST?

      ) === /*value associated with detector: (in ESCAPE DETECTOR) 0*/

    ){}

    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE
    //CURRENT WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE WORKSPACE CURRENT WORKSPACE CURRENT WORKSPACE

  } //TOKEN CYCLER loop

  //NOW we do character class detection

  //the detection process will search each unidentified string token ONCE for bits and pieces of character classes and group them together into an class-token

  debug.track_sync = { //initiate what data the loop needs to know and keep for each loop
    "searchingFor" = "[", //what is currently being searched for
  }

  for( // class detector loop. loops over tokens (tracked ones) to find character classes in the string(s) and convert them over to class objects (tokens)

    //reinitialize debug.string_tracker index to 0

    loop.st_i = 0;

    //if there are more unidentified string tokens to check, continue looping

    loop.st_i < debug.string_tracker.length;

    //after every loop increment the string_tracker index

    loop.st_i++;

  ){

    //create regex with what we are searching for, then match for it in the current token

    var regex_string = "/\\" + debug.track_sync.searchingFor + "/";

    //assign the match, and if it exists, check the token, else continue looping
    //if it does exist and "]" exists in the same string check for new ones (loop over code check-handling again)

    if( ( match = ( new RegExp( regex_string ) ).exec( this.tokens[ debug.string_tacker[ loop.st_i ] ].regex ) ) != null ) //this will not loop over!!!
    {

      //create new token, but do not attach it yet, as it is currently incomplete.

      debug.track_sync.class_token = {
        "regex": "[",
        "type": "class",
        "tokens" : []
      }

      debug.track_sync.onTerm = {
        "token_index" : debug.string_tracker[ loop.st_i ] //index of token in token array FOUND-IN (where "[" was found in)
        "match_index" : match.index //index of "[" in token FOUND-AT
      }

      debug.track_sync.searchingFor = "]"

      regex_string = "/\\" + debug.track_sync.searchingFor + "/";

      if( ( match = ( new RegExp( regex_string ) ).exec( this.tokens[ debug.string_tacker[ loop.st_i ] ].regex ) ) != null ){

        //assign the regex to all characters between, but including the "[" (debug.track_sync.onTerm.match_index) and the "]" (match.index)
        debug.track_sync.class_token.regex = this.tokens[ debug.string_tacker[ loop.st_i ] ].regex.substring( debug.track_sync.onTerm.match_index, match.index + 1 );

        //starting at the token with 1 index higher than the tracked string in which the "[" was found, delete 0 tokens, and insert before the newly created class token, then the post-slice token
        this.tokens.splice( debug.track_sync.onTerm.token_index + 1, 0, debug.track_sync.class_token, {
          "regex" : this.tokens[ debug.track_sync.onTerm.token_index ].regex.substring( match.index + 1 ), //make the regex of the post-slice token that of an unidentified string token with the post-slice string
          "type" : "string" //assign it to a string type
        }); //at-slice & post-slice handling

        //track the post-slice
        if( debug.string_tracker.length > loop.st_i + 1) //check to see if string_tracker index is at the end, and needs a new tracker created on the end, or otherwise a new tracker inserted after the currently being used tracker
        {
          debug.string_tracker.splice( loop.st_i + 1, 0, debug.track_sync.onTerm.token_index + 2 );
        }else{
          debug.string_tracker[] = debug.track_sync.onTerm.token_index + 2;
        }

        //replace the regex in the token where the "[" was found at with all the string data before it
        this.tokens[ debug.track_sync.onTerm.token_index ].regex = this.tokens[ debug.string_tacker[ loop.st_i ] ].regex.substring( 0, debug.track_sync.onTerm.match_index )

      }

    } //handler for "["

    //needs handling/handler for "]"

  } //character-class-detecting loop + token-splcer
  
} //the stringToObject function
