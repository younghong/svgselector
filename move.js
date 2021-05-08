let currentTarget;

let startX;
let startY;
let isMoveDown=false;

let mx;
let my;

targetDownHandler = (event) => {

    currentTarget=event.currentTarget;

    event.preventDefault();

    isMoveDown=true;
    movename.innerText="move:true";
    startX = event.pageX;
    startY = event.pageY;

    mx = parseInt(currentTarget.getAttribute("x"));
    my = parseInt(currentTarget.getAttribute("y"));

    updateSelector(currentTarget);
}

targetMoveHandler = (event) => {
    if( isMoveDown ){
        let x = event.pageX-startX;
        let y = event.pageY-startY;
        currentTarget.setAttribute("x", mx+x);
        currentTarget.setAttribute("y", my+y);
        updateSelector(currentTarget);
    }
}

targetMouseUpHandler = (event) => {
    isMoveDown=false;
    movename.innerText="move:false";
}
