/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
SECTION: Escape Lineotransferent
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

// (BEG) Escape Lineotransferent

while(

	( // (BEG) Escape Hybrid-Clause

		debug.cycler_sync.lineotransferent = ( // (BEG) Lineotransferent Specifier

			debug.cycler_sync.lineotransferent === 0 ? //Lineotransferent Identifier

			// (BEG) Lineotransferent Switch

			( // (BEG) Match Switch

				( // (BEG) Match Specifier

					NIU["match"] = (

						new RegExp( "/\\\\/" ) //NIU Search

					).exec(

						this.tokens[

							debug.string_tracker[

								debug.incremental_sync.current_tracker_id

							]

						].regex

					)

				) != null ? //Match Identifier and (END) Match Specifier

				0 :

				( // (BEG) Last Token Switch

					debug.incremental_sync.current_tracker_id === debug.string_tracker.length - 1 ? //Last Token Identifier

					1 :
					( // (BEG) Current Tracker ID Not-Null Switch

						( // (BEG) Current Tracker ID Incrementer (Never-Null Specifier)

							current_tracker_id++

						) != null ? // (END) Current Tracker ID Incrementer (Never-Null Specifier)

						0 :
						console.log( "R.O. SEARCH CONSTRUCTOR: -DEVELOPER ERROR- Never-Null Specifier returned 'null' for the Current Tracker ID Incrementer inside the Escape Lineotransferent Clause" );

					) // (END)

				) // (END) Last Token Switch

			) : // (END) Match Switch

			debug.cycler_sync.lineotransferent

			// (END) Lineotransferent Switch

		) // (END) Lineotransferent Specifier

	) === 0 // (END) Escape Hybrid-Clause

){

	// (BEG) Preceeding Token Lineotransfer and Initialize Sequential Token Lineotransfer

	if( NIU["match"].index !== 0 ) //Preceding Token Detector
	{

		// (BEG) Sequential Lineotransfer Prepartory Section (ESCAPE-SLPS-1)

		this.tokens[ // (BEG) Set Regex

			1 + debug.string_tracker[ /* ---- 1+ Token Creation ---- */

				debug.incremental_sync.current_tracker_id

			]

		].regex = this.tokens[

			debug.string_tracker[

				debug.incremental_sync.current_tracker_id

			]

		].regex.substring( NIU["match"].index );

		// (END) Set Regex

		this.tokens[ // (BEG) Set Type

			1 + debug.string_tracker[ /* ---- 1+ Token Creation ---- */

				debug.incremental_sync.current_tracker_id

			]

		].type = "string::developer::mixed";

		// (END) Set Type

		// (END) Sequential Lineotransfer Prepartory Section (ESCAPE-SLPS-1)

		debug.string_tracker[ /* ---- (++)Tracker Creation ---- */

			++debug.incremental_sync.current_tracker_id

		] = 1 + debug.string_tracker[ /* ---- Used in 1+ Token Creation ---- */

			debug.incremental_sync.current_tracker_id

		]

	} // (END) Preceeding Token Lineotransfer
	else
	{ // (CONT) Initialize Sequential Token Lineotransfer

		// Set Regex is left out here intentionally

		this.tokens[ // (BEG) Set Type

			1 + debug.string_tracker[ /* ---- 1+ Token Creation ---- */

				debug.incremental_sync.string_tracker_id_num

			]

		].type = "string::developer::mixed";

		// (END) Set Type

	} // (END) Initialize Sequential Token Lineotransfer

	// (BEG) Sequential Token Lineotransfer

	

	// (END) Succeeding Token Lineotransfer

} // (END) Escape Lineotransferent