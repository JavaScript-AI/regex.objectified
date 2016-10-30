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