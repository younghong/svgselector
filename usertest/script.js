function UserManager() {

    var users=[];

    this.reset = function(){
        users=[];
    }

    this.addUser = function (user){
        users.push(user);
    }

    this.removeUser = function(user){
        
        var idx = users.findIndex( function(iter){
            return user == iter;
        } );

        var reuslt = users.splice(idx,1);
    }


    this.getUsers = function(){
        return users;
    }
    

    this.getUser = function(user){
        users.find(function(iter){
            return iter==user;
        });
    }

    this.getUserAt = function (index){
        return users[index];
    }

    this.getItemAuthorityInfo = function(item){
        var results=[];
        users.forEach( function(user){
            var items = user.items;

            var result = items.find( function(iter){
                return iter.id == item.id;
            } );

            if( result == undefined ){
                results.push({value:user.name,used:false,requred:false,user:user});
            }else{
                results.push({value:user.name,used:true,requred:result.requred,item:result,user:user});
            }
        });
        return results;
    }
}


function User(_name){

    this.name=_name;
    this.items=[];

    this.addItem = function (item,_requred){
        var userItem =  new UserItem(item.id,_requred);
        this.items.push(userItem);
    }

    this.removeUserItem = function(item){
        
        var idx = this.items.findIndex( function(iter){
            return item == iter.item;
        } );

        var reuslt = this.items.splice(idx,1);
    }
}

function UserItem(_id,_requred){
    this.id=_id;
    this.requred=_requred;
}




/*=========================================================================






=========================================================================*/



addAuthorityTable = function(item){

    var row=[{id:"ALL",value:'전체',used:false,requred:false}];
    var list = userManager.getItemAuthorityInfo(item);
    var rows = row.concat(list);	

    var columns=[
        {style:'width: 35%;',class:'text-center colored',value:'할당대상'},
        {style:'width: 35%;',class:'text-center colored',value:'필수'},
        {style:'width: 30%;',class:'text-center',value:''}
    ];

    createAuthorityTable('authorityinfo',rows,columns);
    "authorityinfo"
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

    var useId;
    var reqId;

    rows.forEach( function(itor) {

        var tr = document.createElement('tr');

        //할당대상
        useId='exampleCheck'+idx;

        var used = document.createElement('td');
        used.setAttribute('class','text-center');

        var input = document.createElement('input');
        input.setAttribute('type','checkbox');
        input.setAttribute('id',useId);
 
        var label = document.createElement('label');
        label.setAttribute('for',useId);

        used.appendChild(input);
        used.appendChild(label);

        idx++;
        
        //필수
        reqId='exampleCheck'+idx;

        var requred = document.createElement('td');
        requred.setAttribute('class','text-center');

        var input2 = document.createElement('input');
        input2.setAttribute('type','checkbox');
        input2.setAttribute('id',reqId);

        var label2 = document.createElement('label');
        label2.setAttribute('for',reqId);

        requred.appendChild(input2);
        requred.appendChild(label2);

        //사용자
        var user = document.createElement('td');
        user.setAttribute('class','text-right');

        var span = document.createElement('span');
        span.setAttribute('class','pink');
        span.innerText=itor.value;

        user.appendChild(span);

        itor.usedElementId=useId;
        itor.requredElementId=reqId;

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


    
userUsedClickHandler = function(event){
    
    var usedElement = event.currentTarget;

    var result =authorityElements.find(function(iter){
        return usedElement.id == iter.usedElementId;
    });

    var requredElement = document.getElementById(result.requredElementId);

    if( result.id == "ALL" ){
        authorityCheck(!result.used);
    }else{
        if( result.used ){
            requredElement.checked=false;
            requredElement.disabled=true;
            result.requred = false;
    
            //원본 목록에서 아이템 제거
            var item = testItem;
            var list = userManager.getItemAuthorityInfo(item);
    
            var idx = result.user.items.findIndex(function(iter){
                return iter == result.item;
            });
            result.user.items.splice(idx,1);

        }else{
            requredElement.disabled=false;
            var item = testItem;
            result.user.addItem(item,false);
            console.log(userManager.getUsers());
        }
    }
    result.used = !result.used;

}

userRequredClickHandler = function(event){
    
    var requredElement = event.currentTarget;
    var result =authorityElements.find(function(iter){
        return requredElement.id == iter.requredElementId;
    });

    var req = !result.requred;

    result.requred = req;
    result.item.requred = req;

    var item = testItem;
    var list = userManager.getItemAuthorityInfo(item);
    //원본 목록에서 requred 속성 수정
}




var testItem={
    name:'아이템1',
    id:"test1"
};


var userManager = new UserManager();
var user1 = new User("사용자1");
user1.addItem(testItem,true);
userManager.addUser(user1);

var user2 = new User("사용자2");
userManager.addUser(user2);


addAuthorityTable(testItem);


function authorityCheck(check){
    authorityElements.forEach(function(iter){

        //화면 제어
        var reqElement=document.getElementById(iter.requredElementId);
        if( check == false ){
            reqElement.checked=false;
        }
        reqElement.disabled=!check;
        
        var useElement=document.getElementById(iter.usedElementId);
        useElement.checked=check;


        //속성 제어
        if( iter.used ){
            requredElement.checked=false;
            requredElement.disabled=true;
            iter.requred = false;
        
            //원본 목록에서 아이템 제거
            var item = testItem;
        
            var idx = iter.user.items.findIndex(function(iter){
                return iter == iter.item;
            });
            iter.user.items.splice(idx,1);
        
        }else{
            requredElement.disabled=false;
            var item = testItem;
            iter.user.addItem(item,false);
        }

        iter.used = !iter.used;

    });
}


function loadimage(){
    toDataURL('http://127.0.0.1:5500/WebContent/eformPlus/image/editor/bg-logo.png', function(dataUrl) {
        console.log('RESULT:', dataUrl)
      })
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
  
