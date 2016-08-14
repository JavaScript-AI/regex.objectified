function RegExCapture( RegExArg , string ) {
  RegExArg = RegExObj.convert( RegExArg );
  this.source = RegExArg.source;
  this.source.string = string;
  this[0] = null;
}

function RegExObj( RegExArg ){
  if( RegExArg instanceof RegExObj ){
    this = new RegExObj();
    this.source = JSON.parse( JSON.stringify( RegExObj.source ) );
    this.length = RegExObj.length;
    for( var i = 0; i < result.length; i++) this[i] = JSON.parse( JSON.stringify( RegExObj[i] ) );
  }else if( RegExObj.verify( RegExArg ) ){
    this.source = {
      "regex" : {
        "string" : RegExObj.convert( RegExArg, "string" );
        "json" : RegExObj.convert( RegExArg, "json" );
      }
    }
    this.length = 0;
    this[0] = null;
    
    //Construct this[i]...
    
  }else{
    this.verify = function( RegExArg ) {
      
    }
    this.convert = function( RegExArg, option ){
      
    }
    this.length = 0;
    this[0] = null;
  }
}

RegExObj.prototype = {
  "verify" : null,
  "convert" : null
}
