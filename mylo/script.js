
/**
 * 중복되는 숫자
 * 연속된 숫자
 * 숫자 학습
 */


const Log = console.log;
let total_numbers;
let myNumbers;

window.onload = () => {
    
    for(let i=0; i<5; i++){

        init();
        //loadData();
        makeNumbers();

        const div = document.createElement('div');
        div.innerHTML = Numbers.list.tmpl( myNumbers );
    
        var parent = document.querySelector('#container');
        parent.appendChild(div);
    
    }

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

    var client = new XMLHttpRequest();
    client.open('GET', './lotto.csv');
    client.onreadystatechange = function() {
        
        let contents = client.responseText;
        let numbers = contents.split(/\r?\n|\r/);

        console.log(numbers[0], numbers.length);
    }
    client.send();
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
