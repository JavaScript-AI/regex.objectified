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
- "DRAFT [#]" : comment about draft compliance
- "ERROR HANDLING" : comment denoting when a type of error is going to be handled/created

**************************************************************************************************************************************************/

//Convert a String (or a Regexp which will immediately be converted to a String) to a RegExSearch Object

//FUTURE RELEASES are supposed to be able to convert JSON-compliant JavaScript Objects to RegExSearcn Objects

function RegExSearch( RegExArg )
{
	
	var native_regexp, //Used for creating RegExp Objects dynamically
		native_match; //Used for finding matches to RegExp Objects

	//Yes, regex.objectified requires native regex to be built in to the language, that is why it is referred to as an "extension upon regex"

	//NOW we initialize the process (and initialize the new RegExSearch Object)

		/**************************************************************************************************************************************************

		DRAFT 3 (PART I and II):

		- Argument Validation
		- Flag Detection

		**************************************************************************************************************************************************/

		//DRAFT 3: According to Draft 3 and above of regex.objectified, the process (workflow) must start with an argument-validation system

	//ERROR HANDLING: -ERROR- RegExArg must either be a native regex object or a string

	//if RegExArg is a RegExp Object, convert it to a string, otherwise if it is a string, validate the string, otherwise log the above error and return "false" signifying a failed construction

	if( RegExArg instanceof RegExp ) //if RegExArg is a RegExp Object,
	{

		//convert it to a string

		RegExArg = RegExArg.toString();

	}
	else if( RegExArg typeof String ) //otherwise if it is a string,
	{

		//validate the string

		//ERROR HANDLING: -ERROR- RegExArg must start with a "/" and must end with a "/" or a "/" followed by a flag

		//if the starting character in RegExArg is a "/", cut it off as it is not needed, else log the above error and return "false" signifying a failed construction

		if( RegExArg.charAt(0) === "/" ) //if the starting character in RegExArg is a "/",
		{

			//cut it off as it is not needed

			RegExArg = RegExArg.substring( 1 );

		}
		else
		{

			//log the above error and return "false" signifying a failed construction

			console.log("RegExSearch(): -ERROR- RegExArg must start with a \"/\" and must end with a \"/\" or a \"/\" followed by a flag");
			return false;

		}

		//ERROR HANDLING (PART II): -ERROR- RegExArg must start with a "/" and must end with a "/" or a "/" followed by a flag

			//DRAFT 3: According to Draft 3 and above of regex.objectified, the flag section of the regex will have its own property, and this property can be an empty string

		//FUTURE RELEASES will have more extensive flags, and flags will be able to be attached to any token, not just the main search object

		//if the ending characters in RegExArg are a "/" or a "/" followed by a flag, attach the flags to the RegExSearch Object as a property ("this.flag") and cut this ending off as it is not needed,
		//else log the above error and return "false" signifying a failed construction

		if( ( match = ( new RegExp( "/\\/([A-Za-z])/" ) ).exec( RegExArg ) ) ) //if the ending characters in RegExArg are a "/" or a "/" followed by a flag,
		{

			//attach the flags to the RegExSearch Object as a property ("this.flag")

		    this.flags = match[ 1 ];

		    //cut the ending off as it is not needed

		    RegExArg = RegExArg.substring( 0, ( RegExArg.length -2 -match[1].length ) )

		}
		else
		{

			//log the above error and return "false" signifying a failed construction

			console.log("RegExSearch(): -ERROR- RegExArg must start with a \"/\" and must end with a \"/\" or a \"/\" followed by a flag");
			return false;

		}

	}
	else
	{

		//log the above error and return "false" signifying a failed construction

		console.log("RegExSearch(): -ERROR- RegExArg must either be a native regex object or a string");
		return false;

	}

	//The primer token is initialized here
	//The primer token is pretty much the main token (which is pretty much the RegExSearch Object minus the Search methods)

	this.tokens = [

		{

			"regex" : RegExArg,
			"type" : "string::unidentified"

		}

	]

	//Initialize the debug object, this contains all varialbes relevant to the constructor, but not to the tokens (outside of the native regex ones listed above in the beginnning of the script)

		//DRAFT 3: According to Draft 3 and above of regex.objectified, the Debug Object is to contain 3 properties, string tracker, cycler sync, and detector sync

	var debug = {

		"string_tracker" : [], //Used for tracking unidentified string tokens
		"cycler_sync" : { //Used for storing data over different Cycler Loops

				//DRAFT 3: According to Draft 3 and above of regex.objectified, the cycler_sync object is to contain 3 properties, detector number, group depth, and a boolean identifying if a block (group) is unfinished

			"detector" : 0 //Used for identifying what detector to use
			"group_depth" : 0, //Used for tracking how deep a detected group is
			"is_unfinished_block" : false, //Used for keeping track of the fact that atleat one group is unfinished

		},
		"detector_sync" : { //Used for storing data over different Detector Loops

			"prev_string_tracker_index": -1 //Used to help detect whether the current value existing at the currently-being checked string tracker index has changed, if it did not, detector will stop looping, so that the next token can be cycled through

		},
		"incremental_sync" : {

			"string_tracker_index" : 0, //Incremental value also referred to as the current string tracker index that is used to help access the current string tracker value
			"native_regex_part_index" : 0, //Incremental value used to assemple native regex parts into a complete native regex object
			"string_tracker_index_not_current" : 0 //Incremental value used to help apply changes to string tracker values that ar not the current string tracker value

		}

	}

	//track the primer token

	debug.string_tracker[] = 0 //0 is the index of the primer token

		/**************************************************************************************************************************************************

		DRAFT 3 (PART III):

		- Token Cycler

		**************************************************************************************************************************************************/

	for( //TOKEN CYCLER (loops through unidentified string tokens: tokens that could possibly have undiscovered (identifiable) tokens within them)

		//reinitialize the string tracker index to 0

		debug.incremental_sync.string_tracker_index = 0;

		//if the amount of checked strings plus 1 (amount is based off of the current string tracker index - already checked values are everything, but the value found at the current string tracker index, because that value has not yet been checked) (if the currently checking index) is less than the total amount of tracked strings, loop through checks

		debug.incremental_sync.string_tracker_index < debug.string_tracker.length;

		//after every loop increment the checking index by 1

		debug.incremental_sync.string_tracker_index++;

	){

	    //reinitialize detector_sync

	    debug.detector_sync = {

	    	"prev_string_tracker_index": -1
    	
	    }
}