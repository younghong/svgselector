
clickHandler = (event) => {

    g = document.getElementById('selector-g');
    g.setAttribute("visibility","visible");

    currentTarget=event.currentTarget;
    updateSelector(event.currentTarget);
}



canvasMouseDownHandler = (event) => {
    if( isMoveDown == true || isDown == true ){
        
        
    }else{
        g = document.getElementById('selector-g');
        g.setAttribute("visibility","hidden");    
    }
}

this.addEventListener("mouseup", mouseUpHandler);
this.addEventListener("mousemove", mouseMoveHandler);


let movename = document.getElementById('movename');
movename.innerText="move:false";

let scalename = document.getElementById('scalename');
scalename.innerText="scale:false";

createBackgroundSVG("ROOTSVG",400,400,'green');
createSelector();

var svg = document.getElementById("ROOTSVG");
svg.addEventListener("mousedown", canvasMouseDownHandler);



