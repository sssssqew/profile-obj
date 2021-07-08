function buildElement(type, attrs, contents){
  const el = document.createElement(type);

  for(let attr in attrs){
    el.setAttribute(attr, attrs[attr]);
  }
  if(contents !== undefined && contents !== null && contents.length !== 0){
    contents.forEach(function(content){
      el.append(content);
    })
  }
  
  return el;
}

export default buildElement;