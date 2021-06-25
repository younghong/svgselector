
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
 * 
 * 2,3,6, 31,33,34
 * 2,3,6, 26,28,29
 */


const Log = console.log;
let data_numbers;
let total_numbers;
let myNumbers;

getGapNumbers = (v) =>{
    let gaps=[1,3,2,1,1];
    let makeNumbers=[v];
    for(let i=0; i<gaps.length; i++){
        makeNumbers.push(makeNumbers[i]+gaps[i]);
    }
    return makeNumbers;
}

/**
 * gap 규칙에 맞는 번호를 생성한다.
 */
createGapNumber = () => {
    
    for(let i=0; i<37;i++){

        const div = document.createElement('div');
        div.innerHTML = Numbers.list.tmpl( getGapNumbers(i+1) );
        var parent = document.querySelector('#container');
        parent.appendChild(div);
    }
}

countIndexNumber = ()=>{

    for(let j=0; j<6; j++){
        let checkNums=[];
        for(let i=1; i<46; i++){
            checkNums[i]=0;
        }
    
        data_numbers.forEach(element => {
    
            let numberString = element;
            let numbers = numberString.split(',');
    
            let n1=numbers[j];
            let v =checkNums[n1];
            checkNums[n1]=v+1;
        });
        Log('checkNums'+j,checkNums);
    }


}



window.onload = () => {
    
    loadDataHandler();

    //createGapNumber();
    
}


loadDataHandler = ()=>{
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
        countIndexNumber();
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

    //Log('FUcker',equleData([1,3,2,1,1],total_gaps));
    
    Log('전체 갭',total_gaps);
    //createEqule(total_gaps);

    
}


getValueGap = (a,b) =>{
    return Math.abs(b-a);
}

/**
 * 전체 데이터 중에서 같은 gap이 있는지 판단한다.
 */
createEqule = (total_gaps)=>{
    let equleDatas = [];

    while (total_gaps.length>0) {
        equleDatas.push(equleData(total_gaps[0],total_gaps));
        total_gaps.shift();
    }
    Log('createEqule',equleDatas);
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


/** 
 * 분석 데이터 - 다음 숫자와의 간견은 얼마나 되는가?
 * 6개 자리수
 * 46개 번호
*/
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
    Log('getTotalIndexGap',total);
}

/**
 * total_gaps 다음숫자와의 간격을 계산한 배열 모음.
 * number(다음 숫자와의 간격) 1~45 간격
 * index  1~6번째 데이터
 * 예) [1,3,5,7,6]  첫번째 index의 간격이 number인 경우는 얼마나 되는지 판단함.
 * 간격이 1인 경우는 몇번이나 있었나
 * total_gaps의 index위치의 값이 number인 경우는 몇번이나 있었나.
 */
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
