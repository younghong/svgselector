


/*

[공통] authority=> 사용자관리도 기능 이동.
id 

[sign]
tooltipText


[text]
tooltipText
keypadType
maxChars
placeHolder


[label]
기본값

*/
setElementVisible = function(element,visible){
    
    var el = document.getElementById(element);

    if( visible == true ){
        el.removeAttribute('style');
    }else{
        el.setAttribute('style','display:none');
    }
    
}


init = function(){
    //item id
    setElementVisible('attrID',false);

    //item list
    setElementVisible('itemList',false);

    //max char
    setElementVisible('maxLength',false);

    //keypad type
    setElementVisible('keypadType',false);

    //tooltip
    setElementVisible('tooltip',false);

    //place holder
    setElementVisible('placeholder',false);

}



display = function(){
    setElementVisible('container',true);
}

none = function(){
    setElementVisible('container',false);
}



setTable =function(){

    var container = 'container2';
    var columns = ['서명','텍스트1'];
    createAuthorityTable(container,columns);
}


createAuthorityTable = function(container ,columns){
		   
    var parent = document.getElementById(container);
    parent.innerHTML='';


    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var thead_tr = document.createElement('tr');

    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');


    columns.forEach( function(itor) {
        var th = document.createElement('th');
        th.setAttribute('class','text-center');
        th.innerText=itor;
        thead_tr.appendChild(th);


        var td = document.createElement('td');
        var div = document.createElement('div');
        div.setAttribute('class','input-group line');

        var input = document.createElement('input');
        input.setAttribute('type','text');
        input.setAttribute('class','form-control text-center');
        input.setAttribute('placeholder','');
        input.setAttribute('value','');
 
        var span = document.createElement('span');

        div.appendChild(input);
        div.appendChild(span);

        td.appendChild(div);
        tr.appendChild(td);

    });
    
    thead.appendChild(thead_tr);
    tbody.appendChild(tr);


    
    table.appendChild(thead);
    table.appendChild(tbody);

    parent.appendChild(table);

}


getData = function(container){
    container="container2";

    var parent = document.getElementById(container);
    var ths = parent.getElementsByTagName('th');
    var input = parent.getElementsByTagName('input');

    var result=[];
    for( var i=0; i<ths.length; i++ ){
        result.push( {id: ths[i].innerHTML, value:input[i].value} );
    }
    console.log(result);
}

testAuthority = function(){
    var rows = [
        {
            "id": "ALL",
            "value": "전체",
            "used": false,
            "requred": false
        },
        {
            "value": "참여자1",
            "used": false,
            "requred": false,
        }
    ];
    var columns = [
        {
            "style": "width: 35%;",
            "class": "text-center colored",
            "value": "할당대상"
        },
        {
            "style": "width: 35%;",
            "class": "text-center colored",
            "value": "필수"
        },
        {
            "style": "width: 30%;",
            "class": "text-center",
            "value": ""
        }
    ];
    createAuthorityTable( 'container3',rows ,columns);
}



createAuthorityTable = function(container ,rows,columns){
		   
    var parent = document.getElementById(container);
    parent.innerHTML='';


    var table = document.createElement('table');

    var colgroup = document.createElement('colgroup');
    var thead = document.createElement('thead');
    var thead_tr = document.createElement('tr');

    columns.forEach( function(itor) {
        var col = document.createElement('col');
        col.setAttribute('style',itor.style);
        colgroup.appendChild(col);

        var th = document.createElement('th');
        th.innerText=itor.value;
        thead_tr.appendChild(th);
    });
    thead.appendChild(thead_tr);

    var tbody = document.createElement('tbody');
    

    var idx=0;

    rows.forEach( function(itor) {

        var tr = document.createElement('tr');

        //할당대상
        var used = document.createElement('td');
        used.setAttribute('class','text-center');

        var input = document.createElement('input');
        input.setAttribute('type','checkbox');
        input.setAttribute('id','exampleCheck'+idx);
 
        var label = document.createElement('label');
        label.setAttribute('for','exampleCheck'+idx);

        used.appendChild(input);
        used.appendChild(label);

        idx++;
        
        //필수
        var requred = document.createElement('td');
        requred.setAttribute('class','text-center');

        var input2 = document.createElement('input');
        input2.setAttribute('type','checkbox');
        input2.setAttribute('id','exampleCheck'+idx);

        var label2 = document.createElement('label');
        label2.setAttribute('for','exampleCheck'+idx);

        requred.appendChild(input2);
        requred.appendChild(label2);

        //사용자
        var user = document.createElement('td');
        user.setAttribute('class','text-right');

        var span = document.createElement('span');
        span.setAttribute('class','pink');
        span.innerText=itor.value;

        user.appendChild(span);

        itor.usedElement=input;
        itor.requredElement=input2;

        input.addEventListener('click',userUsedClickHandler);
        input2.addEventListener('click',userRequredClickHandler);
        

        //속성처리
        if(itor.used==true){
            input.setAttribute('checked','');

            if(itor.requred==true){
                input2.setAttribute('checked','');
            }

        }else{
            //input.setAttribute('disabled','');
            input2.setAttribute('disabled','');
        }


        tr.appendChild(used);
        tr.appendChild(requred);
        tr.appendChild(user);

        tbody.appendChild(tr);

        idx++;
    } );


    table.appendChild(colgroup);
    table.appendChild(thead);
    table.appendChild(tbody);

    parent.appendChild(table);

    authorityElements=rows;
}

var authorityElements;
var items=[];


userUsedClickHandler = function(event){
		
    var usedElement = event.currentTarget;

    var result =authorityElements.find(function(iter){
        return usedElement == iter.usedElement;
    });

    var requredElement = result.requredElement;

    if( result.used ){
        //usedElement.removeAttribute('checked');
        requredElement.removeAttribute('checked');
        result.requred = false;

        //원본 목록에서 아이템 제거
        var item = {};

        var idx = result.user.items.findIndex(function(iter){
            return iter == result.item;
        });
        result.user.items.splice(idx,1);


    }else{
        var item = {};
        result.user.addItem(item,false);
    }
    result.used = !result.used;

}

userRequredClickHandler = function(event){
    
    var requredElement = event.currentTarget;
    var result =authorityElements.find(function(iter){
        return requredElement == iter.requredElement;
    });

    var req = !result.requred;

    result.requred = req;
    result.item.requred = req;

    var item = {};
}