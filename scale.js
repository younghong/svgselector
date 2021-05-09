let isDown=false;
let scaleW;
let scaleH;

let scaleX;
let scaleY;

let mouseDownX;
let mouseDownY;

let currentTransTarget;

mouseDownHandler = (event) => {

    currentTransTarget = event.currentTarget;

    isDown=true;
    scalename.innerText="scale:true";

    scaleX = parseInt(currentTarget.getAttribute("x"));
    scaleY = parseInt(currentTarget.getAttribute("y"));

    scaleW = parseInt(currentTarget.getAttribute("width"));
    scaleH = parseInt(currentTarget.getAttribute("height"));
    mouseDownX = event.pageX;
    mouseDownY = event.pageY;
}


mouseMoveHandler = (event) => {
    if( isDown ){

        // 최초 mouse down 위치 값 mouseDownX
        // 현재 mouse move 위치 값 pageX
        // 현재 위치에서 최초 위치값의 차를 
        if( currentTransTarget.id == "selector-n" ){
            let h = -(event.pageY-mouseDownY);
            setAttr("y",scaleY-h);
            setAttr("height", scaleH+h);
        }else if( currentTransTarget.id == "selector-e" ){
            let w = event.pageX-mouseDownX;
            setAttr("width", scaleW+w);
        }else if( currentTransTarget.id == "selector-ne" ){
            let h = -(event.pageY-mouseDownY);
            setAttr("y", scaleY-h);
            setAttr("height", scaleH+h);
            let w = event.pageX-mouseDownX;
            setAttr("width", scaleW+w);
        }else if( currentTransTarget.id == "selector-nw" ){
            let h = -(event.pageY-mouseDownY);
            setAttr("y", scaleY-h);
            setAttr("height", scaleH+h);
            let w = -(event.pageX-mouseDownX);
            setAttr("x", scaleX-w);
            setAttr("width", scaleW+w);
        }else if( currentTransTarget.id == "selector-se" ){
           let w = event.pageX-mouseDownX;
           let h = event.pageY-mouseDownY;
           setAttr("width", scaleW+w);
           setAttr("height", scaleH+h);
        }else if( currentTransTarget.id == "selector-sw" ){
            let h = event.pageY-mouseDownY;
            setAttr("height", scaleH+h);
            let w = -(event.pageX-mouseDownX);
            setAttr("x", scaleX-w);
            setAttr("width", scaleW+w);
        }  else if( currentTransTarget.id == "selector-s" ){
            let h = event.pageY-mouseDownY;
            setAttr("height", scaleH+h);
        }else if( currentTransTarget.id == "selector-w" ){
           let w = -(event.pageX-mouseDownX);
           setAttr("x", scaleX-w);
           setAttr("width", scaleW+w);
       }
       updateSelector(currentTarget);
    }
}

mouseUpHandler = (event) => {
    isDown=false;
    scalename.innerText="scale:false";

    isMoveDown=false;
    movename.innerText="move:false";
}

let setAttr = (key , value) => {
    currentTarget.setAttribute(key, value);
}