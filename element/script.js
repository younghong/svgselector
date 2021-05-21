

var svgns = "http://www.w3.org/2000/svg";


createPlusElement = function(){

    var g = document.createElementNS(svgns, 'g');
    g.setAttributeNS(null, 'id', 'plusbtn');
    g.setAttributeNS(null, 'transform', 'translate(0,-0) scale(2)');

    var circle = document.createElementNS(svgns, 'circle');
    circle.setAttributeNS(null, 'fill', '#EE3C83');
    circle.setAttributeNS(null, 'cx', '8');
    circle.setAttributeNS(null, 'cy', '8');
    circle.setAttributeNS(null, 'r', '8');

    var path = document.createElementNS(svgns, 'path');
    path.setAttributeNS(null, 'fill', '#FFFFFF');
    path.setAttributeNS(null, 'd', 'M9.4,5.2L8,6.6L6.6,5.2c-0.4-0.4-1-0.4-1.4,0l0,0c-0.4,0.4-0.4,1,0,1.4L6.6,8L5.2,9.4c-0.4,0.4-0.4,1,0,1.4l0,0c0.4,0.4,1,0.4,1.4,0L8,9.4l1.4,1.4c0.4,0.4,1,0.4,1.4,0l0,0c0.4-0.4,0.4-1,0-1.4L9.4,8l1.4-1.4c0.4-0.4,0.4-1,0-1.4l0,0C10.4,4.8,9.8,4.8,9.4,5.2z');

    g.appendChild(circle);
    g.appendChild(path);

    return g;
}

createRemoveElement = function(){
    var g = document.createElementNS(svgns, 'g');
    g.setAttributeNS(null, 'id', 'removebtn');
    g.setAttributeNS(null, 'transform', 'translate(0,-0) scale(2)');

    var circle = document.createElementNS(svgns, 'circle');
    circle.setAttributeNS(null, 'fill', '#EE3C83');
    circle.setAttributeNS(null, 'cx', '8');
    circle.setAttributeNS(null, 'cy', '8');
    circle.setAttributeNS(null, 'r', '8');

    var path = document.createElementNS(svgns, 'path');
    path.setAttributeNS(null, 'fill', '#FFFFFF');
    path.setAttributeNS(null, 'd', d);

    g.appendChild(circle);
    g.appendChild(path);

    return g;
}


createButtonElement = function(id,d){

    var g = document.createElementNS(svgns, 'g');
    g.setAttributeNS(null, 'id', id);
    g.setAttributeNS(null, 'transform', 'translate(0,-0) scale(2)');

    var circle = document.createElementNS(svgns, 'circle');
    circle.setAttributeNS(null, 'fill', '#EE3C83');
    circle.setAttributeNS(null, 'cx', '8');
    circle.setAttributeNS(null, 'cy', '8');
    circle.setAttributeNS(null, 'r', '8');

    var path = document.createElementNS(svgns, 'path');
    path.setAttributeNS(null, 'fill', '#FFFFFF');
    path.setAttributeNS(null, 'd', d);

    g.appendChild(circle);
    g.appendChild(path);

    return g;
}



window.onload = function(){

    var g = document.getElementById('selector-g');


    var plusbtn = createButtonElement('plusbtn','M9.4,5.2L8,6.6L6.6,5.2c-0.4-0.4-1-0.4-1.4,0l0,0c-0.4,0.4-0.4,1,0,1.4L6.6,8L5.2,9.4c-0.4,0.4-0.4,1,0,1.4l0,0c0.4,0.4,1,0.4,1.4,0L8,9.4l1.4,1.4c0.4,0.4,1,0.4,1.4,0l0,0c0.4-0.4,0.4-1,0-1.4L9.4,8l1.4-1.4c0.4-0.4,0.4-1,0-1.4l0,0C10.4,4.8,9.8,4.8,9.4,5.2z');
    var removebtn = createButtonElement('removebtn','M11,7H9V5c0-0.5-0.4-1-1-1h0C7.4,4,7,4.4,7,5v2H5C4.4,7,4,7.4,4,8v0c0,0.5,0.4,1,1,1h2v2c0,0.5,0.4,1,1,1h0c0.5,0,1-0.4,1-1V9h2c0.5,0,1-0.4,1-1v0C12,7.4,11.6,7,11,7z');

    g.appendChild(plusbtn);
    g.appendChild(removebtn);

    plusbtn.addEventListener('click',clickHandler);
    removebtn.addEventListener('click',clickHandler);
}

clickHandler = function(event){
    console.log(event.currentTarget.id);
}