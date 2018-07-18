function hasOwnProps(obj,...props){
  if(!(obj instanceof Object)){
    throw new Error('the first augument of hasOwnProps must be a instance of Object!');
  }
  for(let prop of props){
    if(!obj.hasOwnProperty(prop)){
      return false;
    }
  }
  return true;
}

export default {
  hasOwnProps
}
