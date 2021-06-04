
let OC={};
let area=[];
const Log=console.log;
const row=3;
const col=3;

window.onload = function(){


    window.addEventListener('keyup',keyupHandler);


    
    
    let count=0;

    for( let rowIndex=0; rowIndex<row; rowIndex++ ){
        area[rowIndex]=[];
        for( let colIndex=0; colIndex<col; colIndex++ ){
            area[rowIndex][colIndex]=1;
            OC[++count] = [rowIndex,colIndex];
        }
    }
    
    area[2][2]=0;
    Log(area);
    Log(OC);
}

keyupHandler = function(event){
    let key = event.key;
    //let v =parseInt(key);

    //좌 우 상 하 0값이 있는지 찾는다.
    //0값이 있다면 내가 0이되고 0인 객체는 1이된다.

    
    let r=OC[key][0];
    let c=OC[key][1];

    //좌
    let ll = -1;
    if(r>0)ll =area[r-1][c];
    

    //우
    let rr = -1;
    if(r < row-1)rr =area[r+1][c];

    //상
    let tt = -1;
    if(c>0)tt =area[r][c-1];

    //하
    let bb = -1;
    if(c<col-1)bb =area[r][c+1];

    if(ll==0){
        area[r][c]=0;
        area[r-1][c]=1;
    }else if(rr==0){
        area[r][c]=0;
        area[r+1][c]=1;
    }else if(tt==0){
        area[r][c]=0;
        area[r][c-1]=1;
    }else if(bb==0){
        area[r][c]=0;
        area[r][c+1]=1;
    }



    Log(area);


    
    
    

}