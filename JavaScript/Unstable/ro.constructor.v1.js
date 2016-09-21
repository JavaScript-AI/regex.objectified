/**************************************************************************************************************************************************

This Library is licensed under the MIT/X11 License

Copyright (c) 2016 Nicholas Jackson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**************************************************************************************************************************************************/

/**************************************************************************************************************************************************

Legend for comments:

- "FUTURE RELEASES" : comment about what will be changed to the API in the future
- (BEG) : start of a section
- (END) : end of a section
- VOCAB : definition of a concept

**************************************************************************************************************************************************/

//VOCAB: RegExSearch Constructor ( RegExSearch() ): Convert a String (or a Regexp which will immediately be converted to a String) to a RegExSearch Object

//FUTURE RELEASES: Supposed to be able to convert JSON-compliant JavaScript Objects to RegExSearcn Objects

function RegExSearch( RegExArg ) 
{ // (BEG) RegExSearch Constructor

	//VOCAB: Native Internal (Regex) Usage (NIU): The usage of native regex or something similar that assists in the construction of this higher form of regex
	//	-NIU Initiation: This is the process of verifying that native regex is built into the programming language and initiating the usage of it.
	//		-NIU Availability Verification: Process of checking that regex is built-in/available in the currently-being-used language
	//		-NIU Preparation:  Preparing for the application of NIU
	//VOCAB: (Regular Expression) Search: A new name assigned to regular expressions and regex.objectified equivalents that reconceptualizes what it is:
	//	-An expression that is used for searching a string for syntactical patterns
	//	-The difference here is that R.O. has more emphasis on the search part of that statement

	//NIU Initiation (in JavaScript):

	var native_regex = { //Used for assisting the construction of RegExSearch and RegExMatch objects using natively built-in regex
		"search", //Used as a native search
		"match", //Used for storing native match information
		"parts" //Used in the assembly of a native search
	}

	//VOCAB: (Argumentative) Lineotransfer: (verb) to pass possession and linear position of certain parts of the argument to the new search object
	//	-Lineotransferrent: (noun:physical) the process (object) that passes possession and linear position of certain parts of the argument to the new search object
	//	-Lineotransferrence: (noun:conceptual) the process (act) of passing possession and linear position of certain parts of the argument to the new search object
	//VOCAB: Argument Validation: the process of making sure that the argument passed to the constructor is acceptable and usable
	//VOCAB: Flag and Argumentative Content Lineotransfer: the process of lineotransferring the flag data from the non-flag argument content over to the new search object

	//if RegExArg is a RegExp Object, convert it to a string
	//Argument Validation in JavaScript requires that the argument be a string

	if( RegExArg instanceof RegExp ) //if RegExArg is a RegExp Object,
	{

		//convert it to a string

		RegExArg = RegExArg.toString();

	}

	//Argumentative Content Lineotransfer and Argument Validation:

	if( RegExArg typeof String ) //(Basic) Argument Validation requires that the argument passed to the R.O. Search Constructor must either be a Native Regex Object or a String
	{ // (BEG) Basic Argument Validation (VALIDATED)

		//(Master) Argument Validation requires that the string has the most basic parts of an argument (initiating "/", terminating "/", and the flags)

		if(

			RegExArg.charAt(0) === "/" && //initiating "/"
			( native_regex["match"] = ( new RegExp( "/\\/([A-Za-z]*)/" ) ).exec( RegExArg ) ) //terminating "/" with the flags

		)
		{ // (BEG) Master Argument Validation (VALIDATED)

			//cut off the initiating "/" as it is not needed

			RegExArg = RegExArg.substring( 1 );

			//attach the flags to the RegExSearch Object as a property ("this.flag")

		    this.flags = native_regex["match"][ 1 ];

		    //cut the ending (terminating "/" and the flags) off as it is not needed

		    RegExArg = RegExArg.substring( 0, ( RegExArg.length -2 -native_regex["match"][1].length ) )

		} // (END) Master Argument Validation (VALIDATED)
		else
		{ // (BEG) Master Argument Validation (FAILED)

			console.log("R.O. SEARCH CONSTRUCTOR: -ERROR- The argument passed to the R.O. Search Constructor must be a valid regular expression starting and ending with forward-slashes (\"/\") and possibly contain flags at the termination of the regular expression");
			return false;

		} // (END) Master Argument Validation (VALIDATED)

	} // (END) Basic Argument Validation (VALIDATED)
	else
	{ // (BEG) Basic Argument Validation (FAILED)

		console.log("R.O. SEARCH CONSTRUCTOR: -ERROR- The argument passed to the R.O. Search Constructor must either be a Native Regex Object or a String");
		return false;

	} // (END) Basic Argument Validation (FAILED)

	//VOCAB: (R.O; Search; Match) Token: a contextual piece of a Search or Match Object
	//VOCAB: Priming Lineotransfer: This is the Lineotransfer that occurs after Flag Lineotransferrence and is the first Lineotransfer to transfer content to a Token
	//	-This Lineotransfer is the only Token Lineotransfer to occur outside the Token Cycler, and is immediately marked as an Unidentified String Token

	this.tokens = [

		{

			"regex" : RegExArg,
			"type" : "string::unidentified"

		}

	]

	//This is the Constructor's Debug Object - it is used for containing all varialbes relevant to the constructor, but not to the tokens (outside of the native regex ones listed above in the beginnning of the script):

	var debug = {
		
		//VOCAB: String Tracker: Used for keeping track of unidentified string tokens
		//VOCAB: Token Cycler: Loop that loops over tracked string tokens
		//VOCAB: Token Cycle: One loop within the Token Cycler
		//VOCAB: Cycler Sync: Used for storing variables over several Token Cycles
		//	-Token Lineotransferent: used for lineotransfering tokens to the search object
		//	-Nestable-Group Token Depth: self-explanatory. tracks depth of the currently being detected group
		//		-This is also useful for detecting whether a group-block was unfinished or not
		//VOCAB: Lineotransfer Sync: Used for storing variables over several loops of a lineotransferent
		//	-Previous String Tracker Value: used when a tracker value is to be changed. This can be used to detect a change
		//VOCAB: Incremental Sync: Used for storing increases data over certain loops. This has a significant tie tp the incrementation statement of for loops

		"string_tracker" : [], //String Tracker
		"cycler_sync" : { //Cycler sync
		
			"lineotransferent" : 0 //Token Lineotransferent
			"group_depth" : 0, //Nestable-Group Token Depth

		},
		"lineotransfer_sync" : { //Lineotransfer Sync

			"prev_string_tracker_value": -1 //Previous String Tracker Value

		},
		"incremental_sync" : { //Incremental Sync

			"string_tracker_id_num" : 0, //Incremental value also referred to as the current string tracker index that is used to help access the current string tracker value
			"native_regex_part_index" : 0, //Incremental value used to assemple native regex parts into a complete native regex object
			"string_tracker_id_num_not_current" : 0 //Incremental value used to help apply changes to string tracker values that ar not the current string tracker value

		}

	}




} // (END) RegExSearch Constructor
