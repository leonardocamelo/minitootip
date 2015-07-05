(function(){

  // search all minitooltips elements
  var all = document.getElementsByTagName('*'),
  length = all.length, tooltips = [];
  for(var i = 0; i < length; i++){
    if(all[i].getAttribute('data-tip'))
    tooltips.push(all[i]);
  }

  // create the tip element and her style
  var tip = document.createElement('div'), style = document.createElement('style'),
  css = '#tip{display:block;opacity:0;position:absolute;z-index:9999;color:#fff;text-align:center;'
  +'background-color:#333;padding:8px;font-family:sans-serif;font-size:.8em;font-weight:lighter;'
  +'border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px;pointer-events:none;}'
  +'#tip:after{content:"";width:0;height:0;left:50%;border-left:8px transparent solid;margin-left:-8px;'
  +'border-right:8px transparent solid;position:absolute;}#tip[data-p=u]:after{top:100%;'
  +'border-top:8px #333 solid;}#tip[data-p=d]:after{border-bottom:8px #333 solid;bottom:100%;}';
  tip.id = 'tip';
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));

  // append tip and style to document
  document.head.appendChild(style);
  document.body.appendChild(tip);

  // add events to show/hide tips
  tooltips.forEach(function(tooltip){
    tooltip.onmouseover = function(){
      // set the content of tip and show it
      tip.textContent = this.dataset.tip;

      // suport to positions
      var position = 'u', top,
      dataP = this.dataset.tipPosition,
      rect = this.getBoundingClientRect();
      if(dataP && ['u', 'd'].indexOf(dataP.charAt(0)) != -1)
      position = dataP.charAt(0);
      else if(rect.top - 40 <= 0)
      position = 'd';
      if(position == 'u')
      top = rect.top + window.scrollY - tip.offsetHeight - 9 + 'px';
      else if(position == 'd')
      top = rect.top + window.scrollY + rect.height + 9 + 'px';
      tip.style.top = top;
      tip.dataset.p = position;

      // align horizontal
      tip.style.left = (rect.left + rect.width / 2) - tip.offsetWidth / 2 + 'px';

      // show it!
      tip.style.opacity = 1;
    };
    tooltip.onmouseout = function(){
      tip.style.opacity = 0;
    };
  });

})();
