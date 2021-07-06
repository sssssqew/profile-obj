function buildElement(type, props){
  const el = document.createElement(type);

  for(let prop in props){
    el.setAttribute(prop, props[prop]);
  }
  return el;
}

export default buildElement;