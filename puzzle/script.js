


window.onload = function(){

    let container = document.getElementById('container');
    var boxWidth = 300;
    var boxHeight = 300;

    var xmlns = "http://www.w3.org/2000/svg";
    var svgElem = document.createElementNS(xmlns, "svg");
    svgElem.setAttributeNS(null, "width", boxWidth);
    svgElem.setAttributeNS(null, "height", boxHeight);
    svgElem.style.display = "block";
    
    var rects = [1,2,3,4,5,6,7,8];
    const SIZE=30;

    for( var i=0; i<rects.length; i++ ){
        var rectElem = document.createElementNS(xmlns, "rect");

        
        
        rectElem.setAttributeNS(null,"x", parseInt(i/3)*SIZE );
        rectElem.setAttributeNS(null,"y", parseInt(i%3)*SIZE );
        rectElem.setAttributeNS(null,"width", SIZE );
        rectElem.setAttributeNS(null,"height", SIZE );
        rectElem.setAttributeNS(null,"fill", "#dadada" );
        rectElem.setAttributeNS(null,"stroke", "black" );
        rectElem.addEventListener('click',rectClickHandler);
        
        svgElem.appendChild(rectElem);
    }
    container.appendChild(svgElem);

}


rectClickHandler = function(event){
    alert('');
}