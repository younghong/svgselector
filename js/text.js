

test = () => {

    
var Item = {

    x:'',
    y:'',
    width:'',
    height:'',
    data:'',
    properties:['x','y','width','height','data'],
    getProperties: function(){
        var reuslt={};

        properties.forEach( function(name){
            reuslt[name] = app[name];
        } );
        return reuslt;
    },
    getProperty: function(name){
        return this[name];
    },
    setProperty: function(name,value){
        this[name] = value;
    }

};

function Text(){

}
Text.prototype = Item;


var text = new Text();
text.setProperty('x',10);
console.log(text.getProperty('x'));





var Sign = function(){

    this.x='111';
    this.y='222';
    this.width='333';
    this.height='444';
    this.data='aaa';

    var MY=this;

    var properties=['x','y','width','height','data'];

    Sign.prototype.getProperties = function(){

        var app=this;
        var reuslt={};

        properties.forEach( function(name){
            reuslt[name] = app[name];
        } );
        return reuslt;
    }

    Sign.prototype.getProperty = function(name){
        return this[name];
    }

    Sign.prototype.setProperty = function(name,value){
        this[name] = value;
    }




    Sign.prototype.print = function(){
        console.log(this.getProperties());
        //console.log( data );
    }
}


var a = new Sign();
a.setProperty('x',10);
a.setProperty('y',11);
a.setProperty('width',12);
a.setProperty('height',13);
a.setProperty('data','hello world');
a.print();


}



