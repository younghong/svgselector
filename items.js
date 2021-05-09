
addRect = () => {

    let x = Math.random() * 300;
    let y = Math.random() * 300;
    let w = 50;
    let h = 50;
    let color = '#'+Math.round(0xffffff * Math.random()).toString(16);

    var svgns = "http://www.w3.org/2000/svg";
    //var svg = document.getElementsByTagName('svg')[0];
    var svg = document.getElementById("ROOTSVG");
    
    var rect = document.createElementNS(svgns, 'rect');
    rect.setAttributeNS(null, 'x', x);
    rect.setAttributeNS(null, 'y', y);
    rect.setAttributeNS(null, 'height', w);
    rect.setAttributeNS(null, 'width', h);
    rect.setAttributeNS(null, 'fill', color);

    g = document.getElementById('selector-g');

    //svg.appendChild(rect);
    svg.insertBefore(rect,g);

    addItemEvent(rect);
}


addItemEvent = (target) => {
    target.addEventListener("click",clickHandler);
    target.addEventListener("mousemove", targetMoveHandler);
    target.addEventListener("mousedown", targetDownHandler);
    target.addEventListener("mouseup", targetMouseUpHandler);
}


