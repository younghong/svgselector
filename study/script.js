const log = console.log;


let products = [
    {name:'kim',age:1111},
    {name:'lee',age:1222},
    {name:'choi',age:334},
    {name:'ahn',age:444}
];

const delay = (time,a) => new Promise(resolve => 
    setTimeout(() => resolve(a) , time));


const Products={};

Products.list = () => products;
Products.list700 = () => delay(700,products);
Products.list250 = () => delay(250,products);
Products.list30 = () => delay(30,products);


Products.list.tmpl = products => `
    <table>
        <tr>
            <td>test1</td>
            <td>test2</td>
        </tr>
        ${products.map(p=>`
                <tr>
                    <td>${p.name}</td>
                    <td>${p.age}</td>
                </tr>
            `).join('')}
    </table>
`;

const el = html => {
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    return wrap.children[0];
}

const $ = (sel,parent=document) => parent.querySelector(sel);
const append = (parent,child) => parent.appendChild(child);

const editClass = method => (name,el) => (el.classList[method](name),el); 
const addClass = editClass('add');
const removeClass = editClass('remove');

//const show = el => setTimeout( () => removeClass('hide',el) , 1);
// const show = el => {
//     setTimeout( () => removeClass('hide',el) , 1);
//     return el;
// };

const tap = f => (a,...bs) => ( f(a,...bs),a );

const show = el => new Promise(resolve =>
    setTimeout(()=>{
        removeClass('hide',el)
        .addEventListener('transitionend',()=>resolve(el),{once:true});
    },1));



//log(document.querySelector('body'));
//$('body').appendChild(el( Products.list.tmpl(Products.list())));

// append( 
//     $('body'), 
//     el(Products.list.tmpl(Products.list())));


// const openPage = async(title,dataFn,tmplFn) => 
// show(append(
//     $('body'),
//     el(
//         `
//         <div class='page hide'>
//             <h2 class='title'>${title}</h2>
//             <div class='content'>${tmplFn(await dataFn())}</dev>
//         </div>
//         `       
//     )
// ));


const openPage2 = async(title,dataFn,tmplFn) => 
{
    const dataP = dataFn();
    const page =  await show(append(
        $('body'),
        el(
            `
            <div class='page hide'>
                <h2 class='title'>${title}</h2>
                <div class='content'></dev>
            </div>
            `       
        )
    ));
    
    show(
        tap(append)
            (
                addClass('hide', $('.content',page)),
                el(tmplFn(await dataP))
            )
    );
};







const isPromise = a => a instanceof Promise;

const openPage3 = async(title,dataFn,tmplFn) => 
{
    const dataP = dataFn();
    const page =  await show(append(
        $('body'),
        el(
            `
            <div class='page hide'>
                <h2 class='title'>${title}</h2>
                <div class='content'>${isPromise(dataP) ? '' : tmplFn(dataP)}</dev>
            </div>
            `       
        )
    ));
    
    isPromise(dataP) && 
    show(
        tap(append)
            (
                addClass('hide', $('.content',page)),
                el(tmplFn(await dataP))
            )
    );
};


const nop = Symbol('nop');

const isNop = a => a == nop;

const openPage4 = async(title,dataFn,tmplFn) => 
{
    const dataP = dataFn();
    const res = await Promise.race([
        dataP,
        delay(50,nop)
    ]);

    const page =  await show(append(
        $('body'),
        el(
            `
            <div class='page hide'>
                <h2 class='title'>${title}</h2>
                <div class='content'>${isNop(res) ? '' : tmplFn(await dataP)}</dev>
            </div>
            `       
        )
    ));
    
    isNop(res) && 
    show(
        tap(append)
            (
                addClass('hide', $('.content',page)),
                el(tmplFn(await dataP))
            )
    );
};








let i=0;

document.addEventListener('click', ()=>{
    openPage4('test', i++ %2?Products.list:Products.list700 , Products.list.tmpl);
});

window.onload = () => {
    const edit = method => (name,el) => (el.classList[method](name),el); 
    var fn=(name)=>{log(name)};
    var obj={ classList:{methodName:fn}};
    const ttt = edit('methodName');
    ttt('name',obj);

    const a=()=>{log('a')};
    const b=()=>{log('b')};
    const c = ()=>{
        a();b();
    }
    c();

};




