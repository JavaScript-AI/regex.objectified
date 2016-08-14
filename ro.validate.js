var regex_validator = function( regex, bool ){
  var result = [],
      i = 0,
  var tree_height = 0;
  result[i] = {
    "regex" : regex,
    "type" : "string"
  }
  var re = /^((?:\((?:\?(?:!|:!?|=|<(?:=|!)?|))?))|^(\))/g,
      match,
      p = 0;
  while ((match = re.exec(regex)) != null) {
    if(regex.substring(match.index,0).length > 0){}
      result[i+1].regex = regex.substring(match.index,0);
      if(match[1] === ""){
        result[i+1].type = match[2];
        tree_height--;
      }else{
        result[i+1].type = match[2];
        tree_height++;
      }
    }
    if(regex.substring(p,match.index).length > 0){
      result[i].regex = regex.substring(p,match.index);
    }
    p = match.index;
    i++;
    i++;
  }
  if(tree_height > 0){
  
  //error
  
  }
}
