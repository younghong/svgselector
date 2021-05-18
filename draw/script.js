
const svgns = "http://www.w3.org/2000/svg";
svgContainer = document.getElementById('svgContainer');
var multi;

createMultiSel = function(){
    
    var rect = document.createElementNS(svgns, 'rect');
    rect.setAttribute('id','multi');
    rect.setAttribute('x',0);
    rect.setAttribute('y',0);
    rect.setAttribute('width',100);
    rect.setAttribute('height',100);
    rect.setAttribute('stroke','#ff0000');
    rect.setAttribute('stroke-dasharray','4 1');
    rect.setAttribute('fill','transparent');
    svgContainer.appendChild(rect);

    multi = rect;
}


mouseUpHandler = function(event){
    isDrawDown=false;
    multi.style.visibility='hidden';

    multi.setAttribute('x',0);
    multi.setAttribute('y',0);
    multi.setAttribute('width',1);
    multi.setAttribute('height',1);
}

var startX;
var startY;

mouseDownHandler = function(event){
    isDrawDown=true;

    startX = event.pageX;
    startY = event.pageY;

    console.log(startX,startY);
    multi.style.visibility='visible';
}


mouseMoveHandler = function(event){
    if( isDrawDown ){

        var w=event.pageX-startX;
        var h=event.pageY-startY;

        if(w<0)return;
        if(h<0)return;

        console.log(w,h);

        multi.setAttribute('x',startX);
        multi.setAttribute('y',startY);
        multi.setAttribute('width',w);
        multi.setAttribute('height',h);
    }
}


var isDrawDown=false;

this.addEventListener("mouseup", mouseUpHandler);
this.addEventListener("mousemove", mouseMoveHandler);
this.addEventListener("mousedown", mouseDownHandler);



createMultiSel();