

function *filter(iter){
    for( const a of iter ){
        if(a%2==0)yield a;
    }
}


const list = [0,1,2,3,4,5,6,7,8,9,10];


list.forEach( 
    (iter)=>{
        console.log(filter(iter));
    } 
);



const Log = console.log;

Log('test');
