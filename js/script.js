var svgCanvas;

var datas;
window.onload = function()
{
    svgCanvas = new SvgCanvas();
    svgCanvas.initialize('container',alrarmPropertyUpdate);

     var sign = new Sign();
    // sign.init();
    // sign.setProperty('x',100);
    // sign.setProperty('y',150);
    // sign.setProperty('width',100);
    // sign.setProperty('height',150);
    // sign.setProperty('data','hell world');
       
    svgCanvas.addItem(sign);
    
    //console.log(sign instanceof Sign); // true
    //console.log(sign instanceof Item); // true
    
    var text = new Text();
    
    //text.setProperty('x',50);
    //text.setProperty('y',50);
    //text.setProperty('width',200);
    //text.setProperty('height',50);
    //text.setProperty('text','hell world');
    
    svgCanvas.addItem(text);

    datas = svgCanvas.getData();

    console.log(datas);
    
    
}

alrarmPropertyUpdate = function( properties ){
    console.log(properties);
}

function setItems(){
    svgCanvas.setData(datas);
}
function clearItmes(){
    svgCanvas.reset();
}