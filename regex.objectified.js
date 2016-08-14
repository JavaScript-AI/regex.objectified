function RegExCapture( RegExArg , string ) {
  RegExArg = RegExObj.convert( RegExArg );
  this.source = RegExArg.source;
  this.source.string = string;
  this[0] = null;
}

function RegExObj( RegExArg ){
  this.verify = function( RegExArg ) {
  }
  this.convert = function( RegExArg ){
  }
  this.source = {
    "regex" : {
      "string" : RegExObj.convert( RegExArg, "string" );
      "json" : RegExObj.convert( RegExArg, "json" );
    }
  }
  this[0] = null;
  
  //Construct this[i]...
  
}
