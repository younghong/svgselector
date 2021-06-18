window.onload = function(){
    const user = fetchUser();
    user.then(console.log);
    //console.log(user);

    const user2 = fetchUser2();
    user2.then( (msg)=> {console.log('meg='+msg)});

}


function fetchUser(){
    return new Promise( (resolve,reject)=>{
        resolve('test');
    });
}

async function fetchUser2(){

    setTimeout( ()=>{}, 1000);
    return 'babo';
}