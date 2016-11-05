/*****************************************************************************

if( subject_string.indexOf( "\\`" ) !== -1 ) - does string exist?
if( subject_string.indexOf( "\\`" ) === 0 ) - is string at start of token?

check if character is alphabetic

char.toLowerCase() != char.toUpperCase()

*****************************************************************************/

/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
Regex.Objectified
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

var Regex = {

	"Objectified" : function( search_arg ){
		
		// (BEG) Debugger

		var debug = {
			"loops" : {
				"flag-checker" : 0,
				"token-index" : 0,
				"doBreak" : false
			}
		}

		// (END) Debugger

		// (BEG) Simple Argument Validator

		if( search_arg.indexOf( "/" ) === 0 ){
			search_arg = search_arg.substring( 1 );
		}else{
			return null;
			console.log('R.O.-ERR: search_arg invalid, because it does not start with "/"');
		}

		// (END) Simple Argument Validator

		// (BEG) Flag Lineotransfer

		if( search_arg.indexOf( "/" ) !== -1 ){

			this.flags = search_arg.substring( search_arg.indexOf( "/" ) + 1 );

			// (BEG) Flag Validator

			for(

				debug.loops.flag-checker = 0;

				debug.loops.flag-checker < flags.length;

				debug.loops.flag-checker++;

			){

				if(
					flags.charAt(

						debug.loops.flag-checker

					).toLowerCase() === flags.charAt(

						debug.loops.flag-checker

					).toUpperCase()
				){
					return null;
					console.log('R.O.-ERR: search_arg invalid, because it contains non-alphabetic flags');
				}

			} //(END) Flag Validator

			search_arg = search_arg.substring( 0 , search_arg.indexOf( "/" ) - 1 );

		} //(END) Flag Lineotransfer

		// (BEG) Priming Lineotransfer

		this.tokens = [];
		this.tokens[] = {
			
			"parse-type" : "unknown-string",
			"token-type" : "string",
			"value" : search_arg

		}

		// (END) Priming Lineotransfer

		/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
		Slashed-Engraver Parser
		||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

		// (BEG) Slashed-Engraver Parser

		while(

			this.tokens[

				debug.loops.token-index

			].value.indexOf( "\\`" ) !== -1

			&&

			!debug.loops.doBreak

		){

			this.tokens[ debug.loops.token-index + 1 ] = {

				"parse-type" : "slashed-engraver",
				"token-type" : "escape::escaped_engraver",
				"value" : "\\`"

			}

			// (BEG) Following-Token Parser

			if(

				this.tokens[

					debug.loops.token-index

				].value.substring( this.tokens[

					debug.loops.token-index

				].value.indexOf( "\\`" ) + 3 )

			){

				this.tokens[ debug.loops.token-index + 2 ] = {

					"parse-type" : "unknown-string",
					"token-type" : "string",
					"value" : this.tokens[

						debug.loops.token-index

					].value.substring( this.tokens[

						debug.loops.token-index

					].value.indexOf( "\\`" ) + 3 )

				}

				debug.loops.token-index = debug.loops.token-index + 2 

			}else{

				debug.loops.doBreak = true;

			}

			// (END) Following-Token Parser

			// (BEG) Leading-Token Parser

			if(

				this.tokens[

					debug.loops.token-index

				].value.substring( this.tokens[

					debug.loops.token-index

				].value.indexOf( 0 , "\\`" ) - 1 )

			){

				this.tokens[ debug.loops.token-index ].parse-type = "unknown-string",
				this.tokens[ debug.loops.token-index ].token-type = "string",
				this.tokens[ debug.loops.token-index ].value = this.tokens[

						debug.loops.token-index

					].value.substring( this.tokens[

						debug.loops.token-index

					].value.indexOf( "\\`" ) - 1 );

				debug.loops.token-index++;

			}

			// (END) Leading-Token Parser

		}

		// (END) Slashed-Engraver Parser

		/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
		Engraved Parser
		||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

		// (BEG) 

	} //(END) Objectified Declaration

} //(END) Regex Declaration