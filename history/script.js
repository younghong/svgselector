

addItem = function(){
    container.appendChild(item.element);
    historyManager.add('add',[item],addItem2,removeItem2);
}


removeItem = function(){
    container.removeChild(item.element);
    historyManager.add('remove',[item],removeItem2,addItem2);
}


addItem2 = function(item2){container.appendChild(item2.element);}
removeItem2 = function(item2){container.removeChild(item2.element);}

getProperty = function(target,attrs){

    var properties = attrs.map(function(iter){
        return {name:iter , value:target[iter] };
    });

    return properties;
}




moveItem = function(){

    var actionP = getProperty(item,['x','y']);
    item.x+=5;
    item.y+=5;

    var element = item.element;
    element.style.left=item.x+'px';
    element.style.top=item.y+'px';
    var inverseP = getProperty(item,['x','y']);

    var applyList=[
        {
            target:item,
            actionProperties:actionP,
            inverseProperties:inverseP
        }
    ];

    historyManager.add('move',applyList,setProperties,setProperties);
}


setProperties = function(target,ppts){

    ppts.forEach(function(iter){
        target[iter.name]=iter.value;
        console.log(target[iter.name],iter.value);
        var element = target.element;

        if( iter.name == 'x' ){
            element.style.left=target.x+'px';
        }else if( iter.name == 'y' ){
            element.style.top=target.y+'px';
        }else if( iter.name == 'width' ){
            element.style.width=target.width+'px';
        }else if( iter.name == 'height' ){
            element.style.height=target.height+'px';
        }
    });
    
}




scaleItem = function(){

    var actionP = getProperty(item,['width','height']);
    item.width+=5;
    item.height+=5;

    var element = item.element;
    element.style.width=item.width+'px';
    element.style.height=item.height+'px';
    var inverseP = getProperty(item,['width','height']);

    var applyList=[
        {
            target:item,
            actionProperties:actionP,
            inverseProperties:inverseP
        }
    ];
    historyManager.add('scale',applyList,setProperties,setProperties);
}

requredItem = function(){
    var actionP = getProperty(item,['requred']);
    item.requred = !item.requred;
    var inverseP = getProperty(item,['requred']);
    var applyList=[
        {
            target:item,
            actionProperties:actionP,
            inverseProperties:inverseP
        }
    ];
    historyManager.add('property',applyList,setProperties,setProperties);
}





var container = document.getElementById('container');


getItem = function(id){

    var div = document.createElement('div');
    div.setAttribute('id',id);
    div.setAttribute('style','width: 100px; height: 100px; background-color: green; top: 100px; left: 20px; position: absolute');

    item={};
    item.id = id;
    item.width=100;
    item.height=100;
    item.backgroundColor = 'green';
    item.x=20;
    item.y=100;
    item.requred=false;
    item.element=div;

    return item;
}

var item=getItem('item1');
var item3=getItem('item2');




undo = function(){
    historyManager.undo();
    console.log(item);
}

redo = function(){
    historyManager.redo();
    console.log(item);
}






function HistoryData(type,targets,action,inverse){
    this.type=type;
    this.targets=targets;
    this.action=action;
    this.inverse=inverse;
}

function HistoryManager(){

    this.list=[];
    step=-1;

    app = this;

    this.add = function(type,targets,action,inverse){
        var hdata = new HistoryData(type,targets,action,inverse);

        step++;
        this.list.splice(step,this.list.length);
        this.list.push(hdata);
        

        console.log(this.list.length,step);
    }

    

    this.undo = function(){
        if(step>-1){
            var hdata = this.list[step];
            var can = this.canUndo(hdata);
            if(can){
                if(hdata.type == 'add' || hdata.type == 'remove'){
                    hdata.targets.forEach(function(iter){
                        hdata.inverse(iter);
                    });
                }else if(hdata.type == 'move' || hdata.type == 'scale' || hdata.type == 'property'){
                    hdata.targets.forEach(function(iter){
                        hdata.inverse(iter.target,iter.actionProperties);
                    });
                }
            }
            if(step>-1)step--;
            console.log('undo step',step);
        }
    }

    this.redo = function(){

        if(step<this.list.length-1){
            step++;

            console.log('redo step',step);

            var hdata = this.list[step];
            var can = this.canRedo(hdata);
            if(can){
                if(hdata.type == 'add' || hdata.type == 'remove'){
                    hdata.targets.forEach(function(iter){
                        hdata.action(iter);
                    });
                }else if(hdata.type == 'move' || hdata.type == 'scale' || hdata.type == 'property'){
                    hdata.targets.forEach(function(iter){
                        hdata.inverse(iter.target,iter.inverseProperties);
                    });
                }
            }
        }

    }

    this.canUndo = function(hdata){
        if(hdata.type=='')return false;
        if(hdata.targets==null)return false;
        return true;
    }

    this.canRedo = function(){
        return true;
    }

    this.excuteUndo = function(){
        
    }

    this.excuteRedo = function(){
        
    }
}


var historyManager = new HistoryManager(addItem2,removeItem2);