




var scale=1;

function minus(){

    scale=scale-0.1;

    var ta = document.getElementById('ta');
    ta.style.transform = "scale("+scale+")";

    var svg = document.getElementById('ROOTSVG');

    var w = parseInt(svg.getAttribute("width")) * scale;
    var h = parseInt(svg.getAttribute("height")) * scale;

    svg.setAttribute("width",w);
    svg.setAttribute("height",h);
}

function plus(){
    scale=scale+0.1;

    var ta = document.getElementById('ta');
    ta.style.transform = "scale("+scale+")";



    var svg = document.getElementById('ROOTSVG');

    var w = parseInt(svg.getAttribute("width")) * scale;
    var h = parseInt(svg.getAttribute("height")) * scale;

    svg.setAttribute("width",w);
    svg.setAttribute("height",h);
}


function taChange(){
    var ta = document.getElementById('ta');
    
    console.log(ta.value);
}



window.onload = function(){

    //var te = document.getElementById('text-editor');
    //te.addEventListener( 'keydown' , textChangeHandler );




    var ff = 'hello<tspan>world</tspan><tspan>babo</tspan><tspan>fucker</tspan><tspan>man</tspan>';
    // 첫번째 문자가 tspan인지 판단한다.


    displayPerson( {name:'apple' , age:18} );



    
    test0000( {id:111,name:'kim'} , {age:18,job:'student'} );
    test0001( {id:111,name:'kim'} , {age:18,job:'student'} );
    test0002();
    test0003();


    var person1= {
        job: {title:'doctor'}
    };
    var person2= {
        job1: {title:'doctor'}
    };

    test0004(person1);
    test0004(person2);

    test0005();

    test0006();
    test0007();
    test0008();
}



function test0000(item0 , item1){

    var t0 = Object.assign(item0 , item1 );
    console.log(t0);
}

function test0001(item0 , item1){
    var t0 = { ...item0 , ...item1 , value:100 };
    console.log(t0);
}


function test0002(){
    var t0 = ['apple' , 'banana'];
    t0 = [...t0 , 'jelly'];
    console.log(t0);
}


function test0003(){
    var t0 = ['apple1' , 'banana1'];
    var t1 = ['apple2' , 'banana2'];

    var t2 = t0.concat(t1);
    
    console.log(t2);
}


function test0004(person){

    if(person.job?.title){
        console.log(person.job.title);
    }

    var title1 = person.job?.title ?? "fucker1";

    var title2 = person.job?.title || "fucker2";

    console.log('A:',title1);
    console.log('B:',title2);

}


function test0005(){

    var person = {name:'fucker',age:18};
    console.log(`hello ${person.name}, and your age ${person.age}`);


    const {name,age} = person;
console.log(`hello ${name}, and your age ${age}`);

}


function test0006(){
    const itmes = [1,2,3,4,5,6];
    //짝수값만 출력.

    var a = itmes.filter( ( iter)=>{
        iter % 2 === 0;
    } );

    var b = a.map( (iter)=>{ iter*4} );

    var c = b.reduce( (a,b) => a+b,0 );

    console.log(c);



    var result = itmes
    .filter( (iter)=>iter%2===0 )
    .map( (iter)=>iter*4 )
    .reduce( (a,b) => a+b,0 );
    console.log(result);

}

function test0007(){

}

async function displayUser(){
    const user = await fetchUser();
    const profile = await fetchProfile();
    updateUI(user,profile);
}



function test0008(){
    const array = ['dog','cat','dog','banana'];

    console.log(array);
    console.log([... new Set(array)]);
}




function printMessage(text){
    const message = text || 'hehe';
    console.log(message);
}



function printMessage2(text){
    const message = text ?? 'hehe';
    console.log(message);
}




function displayPerson(person){
    const {name , age} = person;
    printMessage2(name);
    printMessage2(age);
}





function textChangeHandler(event){
    var te = document.getElementById('text-editor');

    
    var result = document.getElementById('Fucker');

    var tag =  te.innerHTML;
    tag = tag.replace(/div/gi,'tspan');

    console.log(tag);


    result.innerHTML = tag;


    

}