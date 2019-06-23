var iwenEvent = {};
iwenEvent.event = {};

//添加事件
iwenEvent.event.on = function(id, type, handler){
  var dom = iwenEvent.dom.getId(id);
  if(dom.addEventListener){
    dom.addEventListener(type, handler, false);
  }else if(dom.attachEvent){
    dom.attachEvent('on' + type, handler);
  }else{
    dom['on' + type] = handler;
  }
};
//解除事件
iwenEvent.event.off = function(id, type, handler){
  var dom = iwenEvent.dom.getId(id);
  if(dom.removeEventListener){
    dom.removeEventListener(type, handler);
  }else if(dom.detachEvent){
    dom.detachEvent(type, handler);
  }else{
    dom['on' + type] = null;
  }
}

// 获取事件对象
iwenEvent.event.getEvent = function(event){
  return event ? event : window.event;
}

//获取元素对象

iwenEvent.event.getTarget = function(event){
  var event = iwenEvent.event.getEvent(event);
  return event.target;
}

iwenEvent.dom = {};

iwenEvent.dom.getId = function(id){
  return document.getElementById(id);
};

iwenEvent.dom.getTagName = function(names){
  if(document.getElementsByClassName){
    return document.getElementsByClassName(names);
  }
  return "不支持getElementsByClassName";
}

iwenEvent.dom.getClassName = function(names){
  if(document.getElementsByClassName){
    return document.getElementsByClassName(names);
  }
  return "不支持getElementsByClassName";
}

iwenEvent.dom.css = function(id, key, value){
  iwenEvent.dom.getId(id).style[key] = value;
}

iwenEvent.dom.html = function(id, value){
  if(value){
    iwenEvent.dom.getId(id).innerHTML = value;
  }else{
    return iwenEvent.dom.getId(id).innerHTML;
  }

}
