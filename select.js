
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

let resizePoints;

initRisizePoint = (target , id) => {

    let resizePoint=  {target:target};
    let update;
    switch (id) {
        case 'selector-e':
        
            update = (target) => {
                //selector size;
                const RS=10;
                width = parseInt(target.getAttribute("width"));
                height = parseInt(target.getAttribute("height"));
                e.setAttribute("x",width-(RS/2));
                e.setAttribute("y",(height/2-RS/2));
            }
            break;
        case 'selector-nw':
            update = (target) => {
                //nw
                const RS=10;
                nw.setAttribute("x",-(RS/2));
                nw.setAttribute("y",-(RS/2));
            }
            break;
        case 'selector-ne':
            update = (target) => {
                //selector size;
                const RS=10;
                width = parseInt(target.getAttribute("width"));
                height = parseInt(target.getAttribute("height"));
                //ne
                ne.setAttribute("x",width-(RS/2));
                ne.setAttribute("y",-(RS/2));
            }
            break;
        case 'selector-n':
            update = (target) => {
                //selector size;
                const RS=10;
                width = parseInt(target.getAttribute("width"));
                height = parseInt(target.getAttribute("height"));
                //n
                n.setAttribute("x",(width/2-RS/2));
                n.setAttribute("y",-(RS/2));
            }
            break;
        case 'selector-sw':
            update = (target) => {
                //selector size;
                const RS=10;
                width = parseInt(target.getAttribute("width"));
                height = parseInt(target.getAttribute("height"));
                //sw
                sw.setAttribute("x",-(RS/2));
                sw.setAttribute("y",height-(RS/2));
            }
            break;
        case 'selector-se':
            update = (target) => {
                //selector size;
                const RS=10;
                width = parseInt(target.getAttribute("width"));
                height = parseInt(target.getAttribute("height"));
                //se
                se.setAttribute("x",width-(RS/2));
                se.setAttribute("y",height-(RS/2));
            }
            break;
        case 'selector-s':
            update = (target) => {
                //selector size;
                const RS=10;
                width = parseInt(target.getAttribute("width"));
                height = parseInt(target.getAttribute("height"));
                //s
                s.setAttribute("x",(width/2-RS/2));
                s.setAttribute("y",height-(RS/2));
            }
            break;
        case 'selector-w':
            update = (target) => {
                //selector size;
                const RS=10;
                width = parseInt(target.getAttribute("width"));
                height = parseInt(target.getAttribute("height"));
                //w
                w.setAttribute("x",-(RS/2));
                w.setAttribute("y", (height/2-RS/2) );
            }
            break;
            default:
            break;
    }
    resizePoint.update = update;

    resizePoints.push(resizePoint);
}