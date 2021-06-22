window.onload = () => {
    //initTimer();
}

let Timer;
let count=1;

initTimer = function(){
    Timer = setInterval(function(){
        update2();
        count++;
    },10);
}


let speedX=10;

update = function(){
    x = count + speedX;                       // speedX 로 정의된 속도로 움직입니다.
    y = func2dim(x,-0.025,200);   // x 좌표를 증가시키고, 그에 따른 y값을 출력합니다.

    var c = document.querySelector('#myCanvas');
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.stroke();
}


func2dim = function(x, a, b){
  return (a*x*(x-b));

}

update2 = function(){

    const max = 1000;

    x= count;
    y= x < (max/2) ? x*2 : (max-x)*2;

    console.log(x,y);


    if(x==max){
        clearInterval(Timer);
    }


    var c = document.querySelector('#myCanvas');
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.stroke();

}



