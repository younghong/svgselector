
var items = [];


var TestItem = function(id,type){
    this.id = id;
    this.type=type;
}


idGenerater = function(type){
    var count=0;
    
    items.forEach(function (iter){

        if(iter.type == type){
            var has = checkID(type+count);
            if(has==false)return type+count;
            count++;
        }
    });
    return type+count;
}

checkID = function(id){
    
    var result = items.some(function(iter){
        return iter.id == id;
    });

    return result;
}




addRect = function(){
    var type = '사각형';
    items.push(new TestItem( idGenerater(type) , type ));
    console.log(items);
}

addLabel = function(){
    var type = '라벨';
    items.push(new TestItem( idGenerater(type) , type ));
    console.log(items);
}

remove=function(){
    items.shift();
}



