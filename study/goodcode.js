const log = console.log;

function printMessage(text){
    const message = text ?? 'Noting to Display';
    // null, undefined일때 오른쪽 실행.
    log(message);
}

printMessage('Hello');
printMessage(undefined);
printMessage(null);

printMessage(false);
printMessage(NaN);
printMessage(0);
printMessage('');

function printMessage2(text){
    const message = text || 'Noting to Display';
    // false일때만 오른쪽 실행.
    log(message);
}

printMessage2('Hello');
printMessage2(undefined);
printMessage2(null);

printMessage2(false);
printMessage2(NaN);
printMessage2(0);
printMessage2('');


function test1(){
    return null;
}
function test2(){
    return 'hello';
}


const result = test1() ?? test2();
log(result);



/*  =================================  */

function displayPerson(person){
    const {name,age} = person;
    log(name,age);
}


const person = {name:'martin',age:18,weight:180,code:001};
displayPerson(person);



/*  =================================  */

const item = {type:'man' , size:'M'};
const detail = {price:200 , made:'korea'};

const newObject = Object.assign(item,detail);
log(newObject);

const shirt = {...item, ...detail , price:1000};
log(shirt);
const shirt2 = {...item, ...detail , babo:1000};
log(shirt2);

/*  =================================  */

let fruits = ['🍎','🍌','🍍'];
fruits = [...fruits, '🥭'];
log(fruits);

const fruits2 = ['🍊','🍇'];
let combined = fruits.concat(fruits2);
let combined2 = [...fruits, '🍒' , ...fruits2];
log(combined2);


/*  =================================  */

function displayJobTitme(person){
    if( person.job && person.job.title ){
        log(person.job.title);
    }


    if(  person.job?.title ){
        log(person.job.title);
    }
}
displayJobTitme({job:{title:'student'}});

function displayJobTitle(person){
    const title = person.job?.title ?? 'not job yet';
    log(title);
}

displayJobTitle({job:{title:'student2'}});
displayJobTitle({name:'babo'});


/*  =================================  */

const numberitems = [1,2,3,4,5,6];

const result2=numberitems
.filter( iter => iter%2==0 )
.map( iter => iter*iter )
.reduce( (pre,cur) => pre+cur ,0 );

log(result2);


/*  =================================  */

function delay(ms){
    return new Promise( resolve => setTimeout(resolve,ms) );
}

async function fetchUser(){
    await delay(2000);
    //throw 'error';
    return {name:'kim',type:'student'};
}
async function fetchProfile(user){
    await delay(2000);
    return user.type;
}

function updateUI(user,profile){
    log( user.name , profile );
}

async function displayUser(){
    try {
        const user = await fetchUser();
        const profile = await fetchProfile(user);            
        updateUI(user,profile);
    } catch (error) {
        log(error);
    }
}

displayUser();


async function getApple(){
    await delay(2000);
    return '🍎';
}
async function getBanana(){
    await delay(1000);
    return '🍌';
}

function getAllFruits(){
    return Promise.all( [getApple(),getBanana()] ).then( values => values );
}

log(getAllFruits().then( v => log(v)));
log(getAllFruits().then( log ));



function pickOnlyone(){
    return Promise.race( [getApple(), getBanana() ]);
}


log( pickOnlyone().then(log) );

let yourname = prompt(`what's your name?`,'babo');
log(yourname);

/*  =================================  */

const array=[1,2,3,4,5,6,7,1,2,3];
log( [...new Set(array)] );