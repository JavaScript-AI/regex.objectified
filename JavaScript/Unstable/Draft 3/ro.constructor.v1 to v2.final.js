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
- SECTION : start of a section and a naming of it
- (BEG) : start of a section
- (END) : end of a section
- VOCAB : definition of a concept

**************************************************************************************************************************************************/

/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

VOCAB: (R.O. or otherwise known as) Regex.Objectified: An extension upon the native powers of regex, while at the same time, objectifying its application
VOCAB: Search Object: an R.O. object containing data used to perform a regex search within a string
VOCAB: Match Objects: an R.O. object containing data returned from perfoming a regex search within a string
VOCAB: Search Constructor: the R.O. function that creates the Search Objects.

|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

//FUTURE RELEASES: The Saearch Constructor is supposed to take a JSON argument as well, with a future possibility of XML.

/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
SECTION: Search Constructor
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

function RO_Search( search_argument )
{ // (BEG) Search Constructor

	/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

	VOCAB: Native Internal Usage (NIU): the term used for using native API within an extension upon that API to assist creating an extended API
		-NIU Initiation: the process of verifying that NIU is available and peparing for NIU's usage
			-NIU Verification: the process of validating that NIU is available
			-NIU Preparation: the process of preparing necessary data for NIU

	|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

	/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
	SECTION: NIU Initiation
	&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

	// (BEG) NIU Initiation (validation excluded in this draft for javascript)

	var NIU = {
		"search", //NIU variation of the Search Object
		"match", //NIU variation of the Match Object
		"parts" //Used for constructing NIU Search Objects
	}

	// (END) NIU initiation

	/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

	VOCAB: Loop Clauses: Conditional expressions, that also dynamically set variables
		-Hybrid Clauses: Loop Clauses formed from other related Loop Clauses
		-Initiation Clause: Used for setting loop-related varialbes before any of the loops execute
		-Incremental Clause: Used for setting/incrementing loop-related variables after each and all of the loops execute
	VOCAB: Lineotransfer:
		-(verb): to pass posession and linear position of certain parts of the argument to the new search object
		-(noun): a process of passing possession and linear position of certain parts of the argument to the new search object
		-(-ent)(noun): passer of posession and linear position of certain parts of the argument to the new search object
		-(-ence)(noun): the phenomenon of passing posession and linear position of certain parts of the argument to the new search object
	VOCAB: Token: a contextual piece of a Search or Match Object
	VOCAB: Initial Search Constructor Lineotransference:
		-Argument Validation: the process of making sure that the argument passed to the constructor is acceptable and usable
			-NOTE: Argument Validation must include a method for checking NIU, as NIU regex is compatible with R.O. regex
		-Flag Lineotransfer: the lineotransfer responsible for transferring the flag data over to the search object
		-Priming Lineotransfer: the lineotransfer responsible for transferring the search data over to the first search token, therefore creating the first unidentified string token
			-NOTE: This Lineotransfer is the only Token Lineotransfer to occur outside the Token Cycler, and is immediately marked as an Unidentified String Token
			-Priming Token: Token created by the Priming Lineotransfer

	|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

	/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
	SECTION: Initial Search Constructor Lineotransference
	&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

	// (BEG) Initial Search Constructor Lineotransference

		/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
		SECTION: Argument Validation
		&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

		// (BEG) Argument Validation

		if( search_argument instanceof RegExp)
		{ // (BEG) NIU Validation in JavaScript

			//Convert it to String

			RegExArg = RegExArg.toString();

		} // (END) NIU Validation

		if( search_argument typeof String)
		{ // (BEG) Search Argument must be a String (PASSED)

			/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
			SECTION: Flag Lineotransfer
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

			if(

				search_argument.charAt(0) === "/" && //Search Object must have a initiating "/"
				typeof ( NIU["match"] = ( new RegExp( "/\\/([A-Za-z]*)/" ) ).exec( search_argument ) ) !== "undefined" //Flag Lineotransfer and Search Object must have a terminating "/" optionally followed by flags

			)
			{ // (BEG) Flag Lineotransfer and ( Search Object must have a initiating and terminating "/" optionally followed by flags (PASSED) )

				//cut off the initiating "/" as it is not needed

				search_argument = search_argument.substring( 1 );

				//attach the flags to the RegExSearch Object as a property ("this.flag")

			    this.flags = NIU["match"][ 1 ];

			    //cut the ending (terminating "/" and the flags) off as it is not needed

			    search_argument = search_argument.substring( 0, ( search_argument.length -2 -NIU["match"][1].length ) )

			} // (END) Flag Lineotransfer and ( Search Object must have a initiating and terminating "/" optionally followed by flags (PASSED) )
			else
			{ // (BEG) Search Object must have a initiating and terminating "/" optionally followed by flags (FAILED)

				console.log("R.O. SEARCH CONSTRUCTOR: -ERROR- The argument passed to the R.O. Search Constructor must be a valid regular expression starting and ending with forward-slashes (\"/\") and possibly contain flags at the termination of the regular expression");
				return false;

			} // (END) Search Object must have a initiating and terminating "/" optionally followed by flags (FAILED)

		} // (END) Search Argument must be a String (PASSED)
		else
		{ // (BEG) Search Argument must be a String (FAILED)

			console.log("R.O. SEARCH CONSTRUCTOR: -ERROR- The argument passed to the R.O. Search Constructor must either be a Native Regex Object or a String");
			return false;

		} // (END) Search Argument must be a String (FAILED)

		// (END) Argument Validation

	// (END) Initial Search Constructor Lineotransference

	/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
	FIRST PART OF SECTION: Priming Lineotransfer - Priming Tokem
	&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

	// (BEG) Priming Lineotransfer - Priming Tokem

	this.tokens = [

		{

			"regex" : search_argument,
			"type" : "string::unidentified"

		}

	]

	// (END) Priming Lineotransfer - Priming Tokem

	/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

	VOCAB: Token Cycler: Loop that loops over tracked (unidentified) string tokens
		-Token Cycle (loop): one loop within the Token Cycler
	VOCAB: Tracker Alteration: the process of altering a token or series of token in means to "update" them
	VOCAB: Debugger Object: Used for 2 purposes:
		-NOTE: Holding and maintaining all of the data that is relevant to the constructor, but not the constructed object.
		-NOTE: Assisting with debugging in IDEs

		-String Trackers: Used for keeping track of unidentified string tokens
			-String Subtracker: A single tracker that is a collection of string trackers
				-NOTE: Used when a single token is a collection of tokens itself
		-Cycler Sync: Used for storing variables over several Token Cycles
			-Lineotransferent ID: Used for selecting a lineotransferent
			-Nested-Token Depth: Used for tracking how deep tokens are being inserted
		-Lineotransfer Sync: Used for storing variables over several loops of a lineotransferent
			-Previous Tracker Value: Used to store last value for the current tracker index
				-NOTE: primarily used for determining if a tracker was created or alterred
		-Incremental Sync: Used for storing variables that are incremented over loops. These are used in the inremental statement of for loops
			-Current Tracker Identification Number: Incremental value also referred to as the string tracker index. This is used to get the current string tracker and its value
			-NIU Part Index: Incremental value used to access the NIU Parts in order to assemble a NIU Search
			-Tracker Alteration Tracker ID: Incremental value similar to the String Tracker Identification Number, except it is not for the current string tracker, but for trackers that are intended on being changed via Tracker Alteration

	|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

	/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
	SECTION: Debugger Object
	&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/	

	var debug = { // (BEG) Debugger Object

		"string_trackers" : [], //String Trackers
		"cycler_sync" : { // (BEG) Cycler Sync

			"lineotransferent_id", //Lineotransferent ID
			"nest_depth" //Nested Token Depth

		} // (END) Cycler Sync
		"lineotransfer_sync" : { // (BEG) Lineotransfer Sync

			"prev_tracker_value" : -1 //Previous Tracker Value

		},
		"incremental_sync" : { //Incremental Sync

			"current_tracker_id" : 0, //Current Tracker Identification Number
			"NIU_part_index" : 0, //NIU Part Index
			"alteration_tracker_id" : //Tracker Alteration Tracker ID

		}

	} // (END) Debugger Object

	/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
	SECOND PART OF SECTION: Priming Lineotransfer - Priming Tracker
	&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

	debug.string_tracker[] = { // (BEG) Priming Lineotransfer - Priming Tracker

		"value" : 0, //0 is the index of the primer token
		"subtracker_trackers" : [] //Empty String Subtracker

	} // (END) Priming Lineotransfer - Priming Tracker

	/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

	VOCAB: Detoken:
		-(noun): Token that content is lineotransferred from
		-(verb): Lineotransfer from
			-Singular Detoken Lineotransfer (non-groupable): Lineotransfer from a single token
				-Sequential Lineotransfer: Lineotransfer a sequence of characters from a single detoken
				-Shorthand Lineotransfer: Lineotransfer a single character from a single detoken
			-Multiple Detoken Lineotransfer (groupable): Lineotransger from multiple tokens
				-NOTE: Groupable Detoken Lineotransfers will always be followed with a Supertoken Assembly, possibly and most probably meaning that Multiple Detoken Lineotrnafers will do the same
	VOCAB: Atoken:
		-(noun): Token that content is lineotransferred to
			-Supertoken (Multiple-Atoken Atoken): Token containing other tokens
			-Subtoken: Token contained by a Supertoken
		-(verb): Lineotransfer to
			-Supertoken Assembly/Multiple Atoken Lineotransfer: Lineotransfer from a detoken into an atoken
	VOCAB: Lineotransfer Clause: Hybrid Clause used for:
		-PROGRAM FORK: determining if a lineotransfer should execute by checking the ID number
		-PROGRAM FORK: determining if it should continue to execute by finding another NIU Match
		-PROGRAM FORK: determining whether the Lineotransferent ID should change by setting it within the clause

	|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

	/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
	SECTION: Token Cycler
	&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

	for( //Token Cycler

		//Cycler Initialization Clause:

		debug.incremental_sync.current_tracker_id = 0;

		//Cycler Clause:

		debug.incremental_sync.current_tracker_id < debug.string_trackers.length && //Determines if Cycler should continue/start
		( debug.lineotransfer_sync = { // (BEG) Reinitialize Lineotransfer Sync

			"prev_tracker_value": -1

		} ) != null // (END) Reinitialize Lineotransfer Sync

		//Cycler Incremental Clause:

		debug.incremental_sync.current_tracker_id++;

	){



	}

} // (END) Search Constructor