const MAX=25;
const TOTAL=30;
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
    createTemplate(firstNumbers,5);
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
    console.log(numbers);
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


    if( selectedvalue == TOTAL ){
        clearInterval(Timer);
        event.target.innerHTML='';
    }else{
        if(selectedvalue == currentCount ){

            if( TempNumbers.length == 0 ){
                event.target.innerHTML='';
                currentCount++;
            }else{
                let value = TempNumbers.shift();
                event.target.innerHTML = value;
                currentCount++;
            }

        }
    }
}

itemMouseOverHandler = function(event){
    event.target.style.backgroundColor = '#ff0000';
}

itemMouseOutHandler = function(event){
    event.target.style.backgroundColor = 'aquamarine';
}

let Timer;

initTimer = function(){

    let timer = document.getElementById('timer');
    let count=0;

    Timer = setInterval(function(){
        count++
        timer.innerHTML=count;
        console.log(count);
    },1000);
}