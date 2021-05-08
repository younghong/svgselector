
addRect = () => {

    let x = Math.random() * 300;
    let y = Math.random() * 300;

    var svgns = "http://www.w3.org/2000/svg";
    //var svg = document.getElementsByTagName('svg')[0];
    var svg = document.getElementById("ROOTSVG");
    
    var rect = document.createElementNS(svgns, 'rect');
    rect.setAttributeNS(null, 'x', x);
    rect.setAttributeNS(null, 'y', y);
    rect.setAttributeNS(null, 'height', '50');
    rect.setAttributeNS(null, 'width', '50');
    rect.setAttributeNS(null, 'fill', '#'+Math.round(0xffffff * Math.random()).toString(16));

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