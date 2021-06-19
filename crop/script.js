const Log=console.log;

// 1.이미지를 불러온다.
// 2.9등분으로 나눈다.
// 3.배열의 순서를 바꾼다.
// 4.퍼즐을 맞춘다.


let OC={};
var AREA=[];
const VIEW_COUNT=3;

window.onload = function(){
    window.addEventListener('keyup',keyupHandler);
    load2();
}


keyupHandler = function(event){
    let key = event.key;
    let v =parseInt(key);

    if( v > 0 && v <10 ){
        //좌 우 상 하 0값이 있는지 찾는다.
        //0값이 있다면 내가 0이되고 0인 객체는 1이된다.
        
        let r=OC[key][0];
        let c=OC[key][1];

        //좌
        let ll = -1;
        if(r>0)ll =AREA[r-1][c].value;
        
        //우
        let rr = -1;
        if(r < VIEW_COUNT-1)rr =AREA[r+1][c].value;

        //상
        let tt = -1;
        if(c>0)tt =AREA[r][c-1].value;

        //하
        let bb = -1;
        if(c<VIEW_COUNT-1)bb =AREA[r][c+1].value;

        if(ll==0){
            itemSwitch( AREA[r][c] , AREA[r-1][c] );
        }else if(rr==0){
            itemSwitch( AREA[r][c] , AREA[r+1][c] );
        }else if(tt==0){
            itemSwitch(AREA[r][c] , AREA[r][c-1] );
        }else if(bb==0){
            itemSwitch( AREA[r][c] , AREA[r][c+1] );
        }

        Log(AREA);
    }

}


checkSider = function(r,c){
    //좌
    let ll = -1;
    if(r>0)ll =AREA[r-1][c].value;
    
    //우
    let rr = -1;
    if(r < VIEW_COUNT-1)rr =AREA[r+1][c].value;

    //상
    let tt = -1;
    if(c>0)tt =AREA[r][c-1].value;

    //하
    let bb = -1;
    if(c<VIEW_COUNT-1)bb =AREA[r][c+1].value;

    if(ll==0){
        itemSwitch( AREA[r][c] , AREA[r-1][c] );
    }else if(rr==0){
        itemSwitch( AREA[r][c] , AREA[r+1][c] );
    }else if(tt==0){
        itemSwitch(AREA[r][c] , AREA[r][c-1] );
    }else if(bb==0){
        itemSwitch( AREA[r][c] , AREA[r][c+1] );
    }
}



shakeValues = function(array, count){
    let arow;
    let acol;
    let brow;
    let bcol;
    for( let i=0; i<count; i++ ){        
        
        arow = parseInt( Math.random()*count%VIEW_COUNT );
        acol = parseInt( Math.random()*count/VIEW_COUNT );
        brow = parseInt( Math.random()*count%VIEW_COUNT );
        bcol = parseInt( Math.random()*count/VIEW_COUNT );
        shakeValue(array,arow,acol,brow,bcol);
    }
}

shakeValue = function(array,arow,acol,brow,bcol){

    itemSwitch( array[arow][acol] , array[brow][bcol] );

    //let temp = array[arow][acol];
    //array[arow][acol] = array[brow][bcol];
    //array[brow][bcol] = temp;
}

itemSwitch = function(a,b){
    
    var temp_left = a.element.style.left;
    var temp_top = a.element.style.top;
    var temp_element = a.element;
    var temp_value = a.value;

    a.element.style.left =b.element.style.left; 
    a.element.style.top = b.element.style.top;
    a.element = b.element;
    a.value = b.value;


    b.element.style.left =temp_left; 
    b.element.style.top = temp_top;
    b.element = temp_element;
    b.value = temp_value;
}


load2 = function(){

    var container   = document.getElementById('container2');
    
    const ELEMENT_COUNT=9;

    var img = new Image();
    img.onload = function() {
        
        let w = img.width/3;
        let h = img.height/3;
        let rowIndex;
        let columnIndex;
        let count=0;
        for( let i=0; i<ELEMENT_COUNT; i++ ){

            var canvas      = document.createElement('canvas');
            canvas.width = w;
            canvas.height= h;
            container.appendChild(canvas);
            var ctx = canvas.getContext("2d");

            rowIndex = count%VIEW_COUNT;
            columnIndex = parseInt(count/VIEW_COUNT);

            console.log(rowIndex,columnIndex);
            OC[i+1] = [rowIndex,columnIndex];


            canvas.addEventListener('click',function(event){

                var targetItem;

                for( var i=0; i<AREA.length; i++ ){
                    var row=AREA[i];
                    for( var j=0; j<row.length; j++ ){
                        if(row[j].element==event.target){
                            targetItem=row[j];
                            break;
                        }
                    }
                    if(targetItem!=undefined)break;
                }

                console.log( 'test',targetItem ,i,j);
                checkSider(i,j);

            });


            ix=w*rowIndex;
            iy=h*columnIndex;
            iw=w;
            ih=h;

            if( i==ELEMENT_COUNT-1 ){
                AREA[VIEW_COUNT-1][VIEW_COUNT-1]={element:canvas,value:0};
                //ctx.drawImage(img, ix,iy,iw,ih, 0,0,iw,ih);
                ctx.rect(0,0,iw,ih);
                ctx.fill();
            }else{
                if(AREA[rowIndex]==undefined)AREA[rowIndex]=[];
                AREA[rowIndex][columnIndex]={element:canvas,value:1};

                // 0,0,50,50  / 50,0,50,50 / 100,0,50,50
                // 0,50,50,50  / 50,50,50,50 / 100,50,50,50
                // 0,100,50,50  / 50,100,50,50 / 100,100,50,50

                ctx.drawImage(img, ix,iy,iw,ih, 0,0,iw,ih);
                count++;
            }
        }

        Log(AREA);
        Log(OC);
        setPosition2();
        shakeValues(AREA,ELEMENT_COUNT);
    };
    //img.src = './test.jpg';
    img.src = './gologo.png';
    
}


setPosition2 = function(){
    let count=0;
    var container   = document.getElementById('container2');
    for( var canvas of container.children ){
        canvas.style.left = (count%3)*canvas.width+'px';
        canvas.style.top = (parseInt(count/3))*canvas.height+'px';
        count++;
    }
}


createRect = function(){

}































load = function(){

    var container   = document.getElementById('container2');
    var canvas      = document.createElement('canvas');
    container.appendChild(canvas);
    var ctx = canvas.getContext("2d");

    var img = new Image();
    img.onload = function() {
        
        canvas.width = img.width;
        canvas.height= img.height;

        let w = img.width/3;
        let h = img.height/3;
        let rowIndex;
        let columnIndex;
        let count=0;
        for( let i=0; i<9; i++ ){

            rowIndex = count%3;
            columnIndex = parseInt(count/3);

            ix=w*rowIndex;
            iy=h*columnIndex;
            iw=w;
            ih=h;

            // 0,0,50,50  / 50,0,50,50 / 100,0,50,50
            // 0,50,50,50  / 50,50,50,50 / 100,50,50,50
            // 0,100,50,50  / 50,100,50,50 / 100,100,50,50

            ctx.drawImage(img, ix,iy,iw,ih, ix+i*2,iy+i*2,iw,ih);
            count++;
        }


    };
    img.src = './test.jpg';
}

setPosition = function(){

    let count=0;

    var container   = document.getElementById('container');

    for( var li of container.children ){
        li.style.left = (count%3)*55+'px';
        li.style.top = (parseInt(count/3))*55+'px';
        count++;
    }
    
}