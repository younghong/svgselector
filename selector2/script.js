
const Log = console.log;

function DivSelector(){


    var isMoveDown=false;
    var isDown=false;
    var isDrawDown=false;  
    
    var startDivDrawX;
    var startDivDrawY;
    var divSelector;

    this.my;
    
    this.init = function(){  
        my=this;
        divSelector = document.querySelector('#divselector');
        window.addEventListener("mouseup", this.divSelectorMouseUpHandler);
        window.addEventListener("mousemove", this.divSelectorMouseMoveHandler);
        window.addEventListener("mousedown", this.divSelectorMouseDownHandler);
    }

    
    this.updateDivSelector = function(v,x,y,w,h){
    
        if( v ){

            var sx=x;
            var sy=y;
            var sw=w;
            var sh=h;

            if( w <0 ){
                w = Math.abs(w);
                sx=x-w;
                sw=w;
            }

            if( h < 0 ){
                h = Math.abs(h);
                sy=y-h;
                sh=h;
            }
            
            divSelector.style.left = sx+'px';
            divSelector.style.top = sy+'px';
            divSelector.style.width = sw+'px';
            divSelector.style.height = sh+'px';
            divSelector.style.display = '';

        }else{
            divSelector.style.display = 'none';
        }
    }
    
    
    this.divSelectorMouseMoveHandler = function(event)  {

       // if( event.target != divSelector ){
            if( isDown == false && isMoveDown == false && isDrawDown ){
    
                var w=event.clientX-startDivDrawX;
                var h=event.clientY-startDivDrawY;
       
                my.updateDivSelector(true,startDivDrawX,startDivDrawY,w,h);
            }
       // }



    };
    this.divSelectorMouseUpHandler = function(event)  {
    
        isDown=false;
        isMoveDown=false;
        isDrawDown=false;
        if( divSelector.style.display !='none' ){
            my.updateDivSelector(false);
        }
    };
    
    this.divSelectorMouseDownHandler = function(event)  {
        isDrawDown=true;
        startDivDrawX = event.clientX;
        startDivDrawY = event.clientY;
    };

}

window.onload = function(){
    var selector = new DivSelector();
    selector.init();
}