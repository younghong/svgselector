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
    

    // 꼭 여기서 꺼내야 하나. 바로 붙여도될까?
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
                results.push({id:user.id,value:user.name,used:false,requred:false,user:user});
            }else{
                results.push({id:user.id,value:user.name,used:true,requred:result.requred,item:result,user:user});
            }
        });
        return results;
    }
}


function User(_id,_name){

    this.id=_id;
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

function TestRect(_id){
    this.id=_id;
}







var userManager = new UserManager();


// 사용자1이 기본으로 생성된다.  사용자 관리 클래스에 등록한다.
var user1 = new User('user1','사용자1');
userManager.addUser(user1);

// 아이템1을 생성한다.  기본으로  아이템1의 할당대상 및 권한을  사용자1로 지정한다.
var rect = new TestRect('id'+parseInt(Math.random()*100));
userManager.getUserAt(0).addItem(rect,true);


// 사용자2를 생성한다.
var user2 = new User('user2','사용자2');
userManager.addUser(user2);

// 사용자2를 생성한다.
var user3 = new User('user3','사용자3');
userManager.addUser(user3);


// 아이템2를 생성한다.  기본으로  아이템1의 할당대상 및 권한을  사용자1로 지정한다.
var rect2 = new TestRect('id'+parseInt(Math.random()*100));
userManager.getUserAt(0).addItem(rect2,true);

console.log('첫번째 사용자의 아이템 목록:',userManager.getUserAt(0).items);


//할당대상을 누르면 필수가 활성화된다.
//사용자2의 아이템 리스트에 아이템2를 추가한다.
console.log('user2의 아이템:',user2.items);
user2.addItem(rect2,true);
console.log('user2의 아이템:',user2.items);
console.log('두번째 사용자의 아이템 목록:',userManager.getUserAt(1).items);


authorityList = userManager.getItemAuthorityInfo(rect2);
console.log("아이템2의 권한을 가진 사용자 test",authorityList);



/*=============================================================
=============================================================*/

addUser = function(){
    var user4 = new User('user4','사용자4');
    userManager.addUser(user4);
    addTable();
}

addTable = function(){

    var tesst =getUserData();

    var row=[{id:"ALL",value:'전체',used:false,requred:false}];
    var list = userManager.getItemAuthorityInfo(rect2);
    var rows = row.concat(list);

    console.log(rows);

    var columns=[
        {style:'width: 35%;',class:'text-center colored',value:'할당대상'},
        {style:'width: 35%;',class:'text-center colored',value:'필수'},
        {style:'width: 30%;',class:'text-center',value:''}
    ];

    createInfoTable('container',rows,columns);

}

createInfoTable = function(container ,rows,columns){
	   
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
    
    rows.forEach( function(itor) {

        var tr = document.createElement('tr');

        //할당대상
        var used = document.createElement('td');
        used.setAttribute('class','text-center');

        var input = document.createElement('input');
        input.setAttribute('type','checkbox');
        input.setAttribute('id','exampleCheck1');
 
        var label = document.createElement('label');
        label.setAttribute('for','exampleCheck1');

        used.appendChild(input);
        used.appendChild(label);
        
        //필수
        var requred = document.createElement('td');
        requred.setAttribute('class','text-center');

        var input2 = document.createElement('input');
        input2.setAttribute('type','checkbox');
        input2.setAttribute('id','exampleCheck2');

        var label2 = document.createElement('label');
        label2.setAttribute('for','exampleCheck2');

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
    } );


    table.appendChild(colgroup);
    table.appendChild(thead);
    table.appendChild(tbody);


    
    parent.appendChild(table);



    authorityElements=rows;
}

var authorityElements=[];

userUsedClickHandler = function(event){
    
    var usedElement = event.currentTarget;

    var result =authorityElements.find(function(iter){
        return usedElement == iter.usedElement;
    });

    console.log(result);

    var requredElement = result.requredElement;

    if( result.used ){
        //usedElement.removeAttribute('checked');
        requredElement.removeAttribute('checked');
        result.requred = false;

        //원본 목록에서 아이템 제거
        var list = userManager.getItemAuthorityInfo(rect2);
        console.log(list);

        var idx = result.user.items.findIndex(function(iter){
            return iter == result.item;
        });
        result.user.items.splice(idx,1);


    }else{
        //usedElement.setAttibute('checked','');

        result.user.items.push(result.item);

    }
    result.used = !result.used;

    










    console.log(userManager.getUsers());

    
    
}

userRequredClickHandler = function(event){
    
    var requredElement = event.currentTarget;
    var result =authorityElements.find(function(iter){
        return requredElement == iter.requredElement;
    });

    var req = !result.requred;

    result.requred = req;

    result.item.requred = req;

    var list = userManager.getItemAuthorityInfo(rect2);
    console.log(list);
    console.log(userManager.getUsers());


    //원본 목록에서 requred 속성 수정
}












setUserData = function(userData){
    //좌측영역 참여자 정보 입력

    var users = JSON.parse(testUserData);

    users.forEach(function(iter){

        var user = new User(iter.id,iter.name);

        iter.items.forEach(function(child){
            user.addItem(child,child.requred);
        });

        userManager.addUser(user);
    });

}


getUserData = function (){
    console.log( userManager.getUsers() );

    return userManager.getUsers();   
}



var testUserData;
testGetUserData = function(){
    testUserData = JSON.stringify(getUserData());
    console.log( testUserData );
}

testSetUserData = function(){

    
    userManager.reset();
    getUserData()

    setUserData(testUserData);
    getUserData()
}

testcreaUserMenu = function(){
    createUserMenu('userMenu',getUserData());
}


testcreaddUser = function(){
    createAddUser('add-user',getUserData());
}



createUserMenu = function(container,users){

    var userMenu = document.getElementById('userMenu');

    //초기화
    userMenu.innerHTML='';

    users.forEach(function(iter){
        var li = document.createElement('li');
    
        var a = document.createElement('a');
        a.setAttribute('id','userItem');
        a.setAttribute('class','dropdown-item');
        a.setAttribute('href','#');
        a.setAttribute('onclick','selectUser(this)');
        a.innerHTML=iter.name;

        li.appendChild(a);
    
        userMenu.appendChild(li);
    });

}

createAddUser = function(container,users){

    var adduser = document.getElementById('add-user');

    //초기화
    adduser.innerHTML='';

    var idx=0;

    users.forEach(function(iter){

        var li = document.createElement('li');

        var span = document.createElement('span');
        span.innerHTML = idx;
        
        var div = document.createElement('div');
        div.setAttribute('class','input-group');
    
        var input = document.createElement('input');
        input.setAttribute('type','text');
        input.setAttribute('class','form-control');
        input.setAttribute('placeholder','');
        input.setAttribute('value',iter.name);
    
        var button = document.createElement('button');
        button.setAttribute('type','button');
        button.setAttribute('class','btn btn-input-clear');
    
        div.appendChild(input);
        div.appendChild(button);
    
    
        var dbutton = document.createElement('button');
        dbutton.setAttribute('class','btn btn-remove');
        dbutton.innerHTML='삭제';
    
    
        li.appendChild(span);
        li.appendChild(div);
        li.appendChild(dbutton);
    
    
        adduser.appendChild(li);

        idx++;
    });

    
}

