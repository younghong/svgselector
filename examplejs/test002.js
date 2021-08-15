window.onload = function (){
    numericFunc();
    replaceFunc();
    assignmentFunc();
}


numericFunc = function(){
    const a = 24959390;
    const b = 24_959_390;

    console.log(a);
    console.log(b);
}

replaceFunc = function(){
    var text = "i love 🍌 you love 🍌?";
    text = text.replaceAll('love','hate');
    console.log(text);
}

assignmentFunc = function(){
   let a=1;
   if(a){
    a=2;
   } 

   // b가 거짓이 아니면
   let b=1;
   b &&=2;

   console.log(b);


   let c= false;
   if(!c){
    c=true;
   }

   let d=false;
   d ||=true;
   console.log(d);


   let e=undefined;
   if(e===undefined){
    e="hello";
   }

   let f=undefined;
   f ??="hello";
   console.log(f);
}