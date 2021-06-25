
/**
 * 중복되는 숫자
 * 연속된 숫자
 * 숫자 학습
 * 
 * 간격 1,2,3,4,5,6
 * [1]: 1gap=147 , 2gap=106 , 4gap:98
 * [2]: 3gap=105 , 1gap=104 , 2gap:96
 * [3]: 2gap=138 , 1gap=134 , 3gap:115
 * [4]: 1gap=127 , 2gap=115 , 3gap:115
 * [5]: 1gap=132 , 4gap=112 , 3gap:104
 * 
 * 
 * 1,2,5,7,8,9
 */


const Log = console.log;
let data_numbers;
let total_numbers;
let myNumbers;

window.onload = () => {
    
    const loady = loadData2();

    loady.then( (v)=>{

        //Log('loady',v);

        for(let i=0; i<5; i++){

            init();
            makeNumbers();
            const div = document.createElement('div');
            div.innerHTML = Numbers.list.tmpl( myNumbers );
        
            var parent = document.querySelector('#container');
            parent.appendChild(div);
        }
        checking();
    } );


}

checking = () => {

    var total_gaps=[];

    data_numbers.forEach(element => {

        let firstNumberString = element;
        let firstNumbers = firstNumberString.split(',');
    
        var gapArray=[];    
        for(var i=0; i<firstNumbers.length-1; i++){        
            gapArray.push(getValueGap(firstNumbers[i] ,firstNumbers[i+1]));
        }
        total_gaps.push(gapArray);         
    });

    getTotalIndexGap(total_gaps);

   // Log(total_gaps);
    createEqule(total_gaps);

    
}


getValueGap = (a,b) =>{
    return Math.abs(b-a);
}


createEqule = (total_gaps)=>{
    let equleDatas = [];

    while (total_gaps.length>0) {
        equleDatas.push(equleData(total_gaps[0],total_gaps));
        total_gaps.shift();
    }
}


equleData = (targets,allData) => {

    let count=0;

    allData.forEach((row)=>{

        let result = row.every((iter,idx)=>{
            return targets[idx] == iter;
        });
        if(result==true){
            count++;
        }
    });

    return {numbers:targets,count:count}
}

getTotalIndexGap=(total_gaps)=>{

    let total={};
    let count=0;
    
    for(let index=0; index<6; index++){
        let ar=[];
        for(let i=1; i<46; i++){
            count = getIndexGap(total_gaps,i,index);
            ar.push( {number:i, count:count, index:index} );
        }
        total[index]=ar;
    }
    Log(total);
}


getIndexGap = (total_gaps ,number , index) => {

    let count=0;

    total_gaps.forEach( (row)=>{
        if(number == row[index]){
            count++;
        }
    } );
    return count;
}






init = () => {
    total_numbers=[];
    total_numbers.length = 45;

    for(let i=0; i<total_numbers.length; i++){
        total_numbers[i] = i+1;
    }

    myNumbers=[];
    myNumbers.length=6;

    for(let j=0; j<myNumbers.length; j++){
        myNumbers[j]=0;
    }
}


makeNumbers = () => {
    myNumbers = myNumbers.map( ()=>{
        let idx = parseInt(Math.random()*total_numbers.length);
        let number = total_numbers.splice(idx,1);
        return number;
    });
}

const Numbers={};
Numbers.list=()=> myNumbers;
Numbers.list.tmpl = myNumber => `
    <ul>
    ${myNumber.map( v => `
        <li>${v}</li>
    `).join('')}
    </ul>
`;





function loadData(){

    return new Promise( (resolve,reject)=> {

        var client = new XMLHttpRequest();
        client.open('GET', './lotto.csv');
        client.onreadystatechange = function() {
            
            let contents = client.responseText;
            data_numbers = contents.split(/\r?\n|\r/);
            //Log('resolve',data_numbers);
            resolve(data_numbers);
        }
        client.send();

    } );
}

function loadData2(){

    return new Promise((resolve,reject)=>{
        let request = new XMLHttpRequest();
        request.onload = () => {
            let contents = request.responseText;
            data_numbers = contents.split(/\r?\n|\r/);
            //Log('resolve',data_numbers);
            resolve(data_numbers);
        }
        request.open('GET', './lotto.csv');
        request.send();
    });

}




function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  









  function openTextFile() {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "text/plain"; // 확장자가 xxx, yyy 일때, ".xxx, .yyy"
    input.onchange = function (event) {
        processFile(event.target.files[0]);
    };
    input.click();
}
function processFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
        output.innerText = reader.result;
    };
    reader.readAsText(file, /* optional */ "euc-kr");
}
