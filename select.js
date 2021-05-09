
updateSelector = (target) => {

    x = parseInt(target.getAttribute("x"));
    y = parseInt(target.getAttribute("y"));
    width = parseInt(target.getAttribute("width"));
    height = parseInt(target.getAttribute("height"));

    
    g = document.getElementById('selector-g');

    let test = 'translate('+x+' '+y+')';
    g.setAttribute("transform",test);

    
    e = document.getElementById('selector-e');
    ne = document.getElementById('selector-ne');
    nw = document.getElementById('selector-nw');
    n = document.getElementById('selector-n');
    se = document.getElementById('selector-se');
    sw = document.getElementById('selector-sw');
    s = document.getElementById('selector-s');
    w = document.getElementById('selector-w');

    //selector size;
    const RS=10;

    //e
    e.setAttribute("x",width-(RS/2));
    e.setAttribute("y",(height/2-RS/2));
    
    //ne
    ne.setAttribute("x",width-(RS/2));
    ne.setAttribute("y",-(RS/2));

    //nw
    nw.setAttribute("x",-(RS/2));
    nw.setAttribute("y",-(RS/2));


    //n
    n.setAttribute("x",(width/2-RS/2));
    n.setAttribute("y",-(RS/2));

    //se
    se.setAttribute("x",width-(RS/2));
    se.setAttribute("y",height-(RS/2));

    //sw
    sw.setAttribute("x",-(RS/2));
    sw.setAttribute("y",height-(RS/2));

    //s
    s.setAttribute("x",(width/2-RS/2));
    s.setAttribute("y",height-(RS/2));

    //w
    w.setAttribute("x",-(RS/2));
    w.setAttribute("y", (height/2-RS/2) );
}


createSelector = () => {

    var svgns = "http://www.w3.org/2000/svg";
    
    var graphic = document.createElementNS(svgns, 'g');
    graphic.setAttributeNS(null, 'id', 'selector-g');
    graphic.setAttributeNS(null, 'stroke', 'yellow');
    graphic.setAttributeNS(null, 'stroke-width', 1);
    graphic.setAttributeNS(null, 'visibility', "hidden");

    
    const RS=10;
    const RF="#ff0000";

    let selectorPoint = [
        {id:'selector-e' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'e-resize'},
        {id:'selector-nw' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'nw-resize'},
        {id:'selector-ne' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'ne-resize'},
        {id:'selector-n' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'n-resize'},
        {id:'selector-sw' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'sw-resize'},
        {id:'selector-se' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'se-resize'},
        {id:'selector-s' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'s-resize'},
        {id:'selector-w' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'w-resize'},
    ];



    selectorPoint.forEach( (selector) => {

        var rect = document.createElementNS(svgns, 'rect');

        for (const key in selector) {
            if (Object.hasOwnProperty.call(selector, key)) {
                rect.setAttributeNS(null, key, selector[key]);
            }
        }

        rect.addEventListener("mousedown", mouseDownHandler);
        graphic.appendChild(rect);
    } );


    var svg = document.getElementById("ROOTSVG");
    svg.appendChild(graphic);
}

createBackgroundSVG = (id , width , height , color) => {
    var svgns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgns, 'svg');
    svg.setAttributeNS(null, 'id', id);

    svg.setAttributeNS(null, 'width', width);
    svg.setAttributeNS(null, 'height', height);
    svg.setAttributeNS(null, 'style', 'background-color:'+color);

    var svgparent = document.getElementById("drawsvg");
    svgparent.appendChild(svg);
}


testitme = ()=> {


    //var svgns = "http://www.w3.org/2000/svg";
    //var svg = document.createElementNS(svgns, 'svg');

    var svg = document.getElementById("ROOTSVG");

    var svgns = "http://www.w3.org/2000/svg";
    var g = document.createElementNS(svgns, 'g');
    g.setAttributeNS(null, 'id', 'selectorParentGroup');
    g.setAttributeNS(null, 'transform', 'translate(0,0)');


    var text = document.createElementNS(svgns, 'text');

    text.setAttributeNS(null, 'fill', '#000000');
    text.setAttributeNS(null, 'stroke', '#000');
    text.setAttributeNS(null, 'stroke-width', '0');
    text.setAttributeNS(null, 'x', 163.3);
    text.setAttributeNS(null, 'y', 172.2);
    text.setAttributeNS(null, 'font-size', 24);

    text.setAttributeNS(null, 'text-anchor', 'start');
    text.setAttributeNS(null, 'style', 'cursor: text;');
    
    text.innerHTML = "test"
    



    var path = document.createElementNS(svgns, 'path');
    path.setAttributeNS(null, 'fill', 'none');
    path.setAttributeNS(null, 'stroke', '#4F80FF');
    path.setAttributeNS(null, 'shape-rendering', 'crispEdges');
    path.setAttributeNS(null, 'd', 'M160.296875,142.796875 L238.546875,142.796875 238.546875,180.8125 160.296875,180.8125z');
    

    var line = document.createElementNS(svgns, 'line');
    line.setAttributeNS(null, 'id', 'text_cursor');
    line.setAttributeNS(null, 'stroke', '#333');
    line.setAttributeNS(null, 'stroke-width', '1');
    line.setAttributeNS(null, 'x1', '206.6476593017578');
    line.setAttributeNS(null, 'y1', '145.796875');
    line.setAttributeNS(null, 'x2', '206.6476593017578');
    line.setAttributeNS(null, 'y2', '177.8125');
    line.setAttributeNS(null, 'visibility', 'visible');
    line.setAttributeNS(null, 'display', 'inline');

    g.appendChild(text);
    g.appendChild(path);
    g.appendChild(line);


    
    svg.appendChild(g);


    var svgparent = document.getElementById("drawsvg");
    svgparent.appendChild(svg);
    
    setInterval("playTextCuror()", 500); // 3000ms(3초)가 경과하면 ozit_timer_test() 함수를 실행합니다.    



    addItemEvent(g);
}



playTextCuror = () => {
    let curor = document.getElementById('text_cursor');
    curor.setAttributeNS(null, 'display',  curor.getAttribute("display") == 'none' ? 'inline': 'none' );
}
