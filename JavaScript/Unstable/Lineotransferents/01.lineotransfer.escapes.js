/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
SECTION: Escape Lineotransferent
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

while( // (BEG) Escape Lineotransfer Clause

	( //Overall-Switcher
	    debug.cycler_sync.lineotransferent = ( //Overall-Switcher
	        debug.cycler_sync.lineotransferent === 0 ? //Overall-Switcher

            ( //Overall-Switcher
	            ( //Matcher
	                NIU["match"] = ( //NIU Match for the lineotransfer //Matcher
	                    new RegExp( "/\\\\/" ) //Matcher
	                ).exec( //Matcher
	                    this.tokens[ //Matcher

	                        debug.string_tracker[ //Matcher

	                            debug.incremental_sync.current_tracker_id //Matcher

	                        ] //Matcher

	                    ].regex //Matcher
	                ) //Matcher
	            ) != null ? //Matcher

	            0 :
	            ( //Last-Token Switcher
	                debug.incremental_sync.current_tracker_id = debug.string_tracker.length - 1 ? //Last-Token Switcher

	                0 : //Last-Token Switcher
	                1 //Last-Token Switcher

	            ) //Last-Token Switcher

	        ) : //Overall-Switcher
        	debug.cycler_sync.lineotransferent  //Overall-Switcher

	    ) //Overall-Switcher
	) === 0 //Overall-Switcher

) // (END) Escape Lineotransfer Clause
{ // (BEG) Escape Lineotransferent

	//If match is at beginning of the token, just change the token's type

	if( NIU["match"].index === 0 )
	{

	}
	else
	{

	}

} // (END) Escape Lineotransferent