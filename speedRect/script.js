
const TOTAL=50;
const WW=5;
const MAX=WW*WW;

let TempNumbers;
let currentCount=1;

window.onload = function(){
    initialize();
    initTimer();
}

initialize = function(){
    let numbers=createNumbers(TOTAL);
    let firstNumbers = numbers.slice(0,MAX);
    TempNumbers = numbers.slice(MAX,numbers.length);
    shakeValues(firstNumbers,MAX );
    createTemplate(firstNumbers,WW);
}

createNumbers = function(count){
    let numbers=[];
    for( let i=0; i<count; i++ ){
        numbers[i]=i+1;
    }
    return numbers;
}

shakeValues = function(numbers, count){
    let a;
    let b;
    for( let i=0; i<count; i++ ){        
        a = parseInt( Math.random()*count );
        b = parseInt( Math.random()*count );
        shakeValue(numbers,a,b);
    }
}

shakeValue = function(numbers,a,b){
    let temp = numbers[a];
    numbers[a] = numbers[b];
    numbers[b] = temp;
}


createTemplate = (numbers,columnCount) => {
    let table = document.createElement('table');
    let tr;
    for(let i=0; i<numbers.length; i++){
        if(i%columnCount==0){
            tr=document.createElement('tr');
            table.appendChild(tr);
        }
        let td = document.createElement('td');
        td.setAttribute('id','td'+i);
        td.addEventListener('click',itemClickHandler);
        td.addEventListener('mouseover',itemMouseOverHandler);
        td.addEventListener('mouseout',itemMouseOutHandler);
        td.innerHTML=numbers[i];
        tr.appendChild(td);
    }
    
    document.getElementById('container').appendChild(table);
}


itemClickHandler = function(event){

    let selectedvalue = parseInt(event.target.innerHTML);

    if(selectedvalue == currentCount ){

        if( selectedvalue == TOTAL ){
            clearInterval(Timer);
            event.target.innerHTML='';
            if( count < 80 ){
                alert(`${count}초가 걸리셨네요 당신은 20대~` );
            }else if(count < 100){
                alert(count+'초가 걸리셨네요 당신은 30대~');
            }else if(count < 120){
                alert(count+'초가 걸리셨네요 당신은 40대~');
            }else{
                alert(count+'초가 걸리셨네요 당신은 50대~');
            }
            window.location.reload();
        }else{
            if( TempNumbers.length == 0 ){
                event.target.innerHTML='';
                currentCount++;
            }else{


                

                $('#'+event.target.id).animate({opacity:0.1}, 
                {
                  duration: 200,
                  complete: function() {
                    
                    let value = TempNumbers.shift();
                    event.target.innerHTML = value;
                    currentCount++;

                    event.target.style.opacity = 1;

                  }
                });



            }
        }
    }



}

itemMouseOverHandler = function(event){
    event.target.style.backgroundColor = '#ff0000';
}

itemMouseOutHandler = function(event){
    event.target.style.backgroundColor = 'black';
}

let Timer;
let count=0;

initTimer = function(){

    let timer = document.getElementById('timer');
    count=0;

    Timer = setInterval(function(){
        count++
        timer.innerHTML=count+'초 지났어요~';
    },1000);
}