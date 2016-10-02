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
- SECTION : start of a section and a naming of it
- (BEG) : start of a section
- (END) : end of a section
- DICTIONARY : definitions of concepts from the draft dictionary (written in markup)

*************************************************************************************************************************************************
Comments inside these are generic
*************************************************************************************************************************************************

|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
Comments inside these are dictionaries
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
Comments inside these are section headers
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

**************************************************************************************************************************************************/






/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

DICTIONARY:

### Regular Expressions Objectified or Regex Objectified (RO):
- An extension upon the native powers of regex, while at the same time, objectifying it.

### Loop Clauses:
- Pieces of code used for determining whether a loop execute or continue to execute that simultaneously set important variables for the loop

### Tokens:
- Smaller sub parts of a RO object
  - Detoken:
    - (noun): Token that content is lineotransferred from
    - (verb): Lineotransfer from
  - Atoken:
    - (noun): Token that content is lineotransferred to
      - Supertoken/Parental Token: Token containing other tokens
      - Subtoken/Child Token: Token contained by a Supertoken/Parental Token
    - (verb): Lineotransfer to
  - Token Type: A classification of token
    - String Tokens: Tokens that are not a specialized RO Token, and just represent a string
      - Identified Tokens: Tokens identified by lineotransferents not to match any form of a token
      - Unidentified Tokens: Tokens that have not yet been fully processed or by lineotransferents, or none of the lineotransferents were able to identify them 
      - Developer Tokens: If a Token does not have a defined Token Type, the Token Type is equivalent to the `token.dev_type` property, and this Token Type represents that value
    - Escape Tokens: (Self-explanatory) Tokens used to escape parts of the RO Search
      - Escape-All Tokens: An entire portion of the Search that is escaped
      - Octal Tokens: Represent Octal Escapes
      - Hexadecimal Tokens: Represent Hexadecimal Escapes
      - Unicode Tokens: Represent Unicode Escapes
      - Control Character Tokens: Represent Control Character Escapes
    - Reference Tokens: Tokens that reference other Tokens like variables
      - Capture Reference: (Comparable to the Backreference) Reference a Capture Group Token in a specific order or suborder
      - Specific Reference: Reference a Token via the Token Name Attribute
    - Class Token: Token representing a NIU Class
    - Group Token: Token representing a NIU Group
      - Non-Capture Token: Token representing a NIU Non-Capture Group
      - Capture Token: Token representing a NIU Capture Group
    - Attribute Token: Token that applies certain attributes to other tokens
      - Quantifier Token: Token representing a NIU Quantifier
      - Token Name Token: Token that applies the Token Name attribute to a Token
      - Token Class Token: Token that applies the Token Class attribute to a Token
  - Token Regex: A string representing the Token
  - (NOTE:) RO Tokens are also classified by the Lineotransferent it was created by. The property this is stored in is `token.dev_type`
    - If a Token does not have a defined Token Type, the Token Type is equivalent to the `token.dev_type` property

### Lineotransfer:
  - (verb): to pass posession and linear position of certain parts of the argument to the new search object
  - (noun): a process of passing possession and linear position of certain parts of the argument to the new search object
    - Lineotransfer Clause: Determining if a lineotransfer should execute by checking the ID number, and if it should continue to execute by finding another NIU Match, and whether the Lineotransferent ID should change by setting it within the clause
    - Subjects: Detokens of interest by the Lineotransferent. These tokens will be turned into tokens with a corresponding Token Type
      - Subject's Interest: A point between Subject Tokens and non-Subject Tokens
    - Subject Tokens: Tokens that the Lineotransferent intends on lineotransferring, and represent the Subject.
      - Sequential Subject Token: Subject Token that contains the entire Subject
      - Bounded Detoken Subject Token: Subject Token that consists of a single substring from the Detoken that exists between the Subject's 2 boundaries
      - Bounded Atokens Subject Token (Supertoken): Subject Token that consists of multiple Tokens that exist between the Subject's 2 boundaries
    - Subject Token Lineotransfer: Lineotransfer of a Subject Token
      - Sequential Subject Token Lineotransfer: Lineotransfer of a Sequential Subject Token
      - Bounded Detoken Subject Token Lineotransfer: Lineotransfer of a Bounded Detoken Subject Token
      - Bounded Atokens Subject Token (Supertoken) Lineotransfer: Lineotransfer of a Bounded Atokens Subject Token (Supertoken)
    - Leading Token: Token that exists before the Subject's Interest
      - Preceding Token: Leading Token that is not part of the Subject
      - Terminating Token: Leading Token that is part of the Subject
    - Leading Token Lineotransfer: Lineotransfer of a Leading Token
      - Preceding Token Lineotransfer: Lineotransfer of a Preceding Token
      - Terminating Token Lineotransfer: Lineotransfer of a Terminating Token
    - Following Tokens: Token that exists after the Subject's Interest
      - Initiating Token: Following Token that is part of the Subject
      - Succeeding Token: Following Token that is not part of the Subject
    - Following Token Lineotransfer: Lineotransfer of a Following Tokens
      - Initiating Token Lineotransfer: Lineotransfer of a Initiating Token
      - Succeeding Token Lineotransfer: Lineotransfer of a Succeeding Token
  - (-ent) (noun): passer of possession and linear position of certain parts of the argument to the new search object; doer of lineotransfers
    - Slashed ( `\` ) Lineotransferent: Lineotransferent whose Subject starts with a "\"
    - Shorthand (single characters) Lineotransferent: Lineotransferent whose Subject is a single character
    - Bracketed ( `[ ]` ) Lineotransferent: Lineotransferent whose Subject begins with a "[" and ends with a "]"
    - Parenthetical ( `( )` ) Lineotransferent: Lineotransferent whose Subject begins with a "(" and ends with a ")"
    - Braced ( `{ }` ) Lineotransferent: Lineotransferent whose Subject begins with a "{" and ends with a "}"
    - Engraved (`` ` ` ``) Lineotransferent: Lineotransferent whose Subject begins with a "\`"
  - (-ence) (noun): the phenomenon of passing posession and linear position of certain parts of the argument to the new search object; the doing of lineotransfers

### Searches:
- Patterns that are used for searching a string for matches
  - Search Objects: RO objects used as searches
    - Search Tokens: RO objects that are sub parts of a Search Object
    - Search Constructor: RO function used to construct RO Search Objects
      - Search Constructor Initiation: Section of code dedicated to preparing for the Lineotransferents
        - Argument Validation: Verifies that the argument provided to the Constructor is a valid argument
        - Flag Lineotransfer: The lineotransfer responsible for transferring the flag data over to the search object
        - Debug Object: Used for holding and maintaining all of the data that is relevant to the constructor, but not the constructed object, and assisting with debugging in IDEs
          - Native Internal Usage (NIU): The usage of a native form of the extension to assist the extension
            - Initiation of NIU: the process of verifying that NIU is available and peparing for NIU's usage
              - NIU Verification: the process of validating that NIU is available
              - NIU Preparartion: the process of preparing necessary data for NIU
          - Debug Object Creation: Section of code dedicated to creating the Debug Object
          - String Tracker: Debug Object property used for tracking Unidentified String Tokens
            - Subtracker: Sub part of the String Tracker
            - Tracker Alteration: Process of changing a series of tracker values, as well as introducing new trackers
          - Cycler Sync: Used for storing variables over several Token Cycles
            - Lineotransferent ID: Number corresponding to a Lineotransferent
            - Bounded Token Depth: Determines how deep a bounded token is nested
          - Incremental Sync: Used for storing variables that are incremented over loops. These are used in the incremental statement of for loops
            - Current Tracker ID: Incremental identification (index) value for the tracker that is currently being used to modify the tokens 
            - NIU Part Index: Incremental index value used to assemble NIU Searches
            - Tracker Alteration Tracker ID: Incremental identification (index) value for a trackers within a series of trackers marked for Tracker Alteration.
        - Priming Lineotransfer: The lineotransfer responsible for transferring the search data over to the first search token, therefore creating the first Unidentified String Token
  - NIU Searches: Regex Search Objects previously supported by the language
    - NIU Search Parts: Strings containing NIU regex that are used to construct NIU Searches

### Matches:
- Information returned from searches
  - Match Objects: RO objects used as matches
    - Match Tokens: RO objects that are sub parts of a Match Object
    - Match Constructor: RO function used to construct RO Match Objects
  - NIU Matches: Regex Match Objects previously supported by the language

|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/






/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
SECTION: Search Constructor
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

function roSearch( search_argument )
{ // (BEG) Search Constructor

	/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
	SECTION: Initiation of Native Internal Usage of Regex
	&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/



	/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
	SECTION: Constructor Initiation
	&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

		/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
		SECTION: Argument Validation
		&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

		/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
		SECTION: Flag Lineotransfer
		&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

		/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
		SECTION: Debugger Creation
		&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

		/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
		SECTION: Priming Lineotransfer
		&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

	/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
	SECTION: Token Cycler
	&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

		//Most Contained: (Escapes)

		/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
		SECTION: Engraved Lineotransferent
		&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

		/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
		SECTION: Slashed Lineotransferent
		&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

		//Can Contain Escpaes, but Cannot Contain Groups, and Shorthands:

		/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
		SECTION: Bracketed Lineotransferent
		&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

		/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
		SECTION: Braced Lineotransferent
		&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

		//Cannot Contain Anything, but Can Be Contained by Groups

		/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
		SECTION: Shorthand Lineotransferent
		&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

		//Can Contain Anything, but Cannot be Contained by Other Types

		/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
		SECTION: Parenthetical Lineotransferent
		&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
	
} // (END) Search Constructor