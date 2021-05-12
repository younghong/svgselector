
//[공통]
//x,y,width,height
//backgroundColor,borderType,borderColor,borderWeight

//[Sign] color,data



getRect = (x,y,w,h) => {
    
    //let color = '#'+Math.round(0xffffff * Math.random()).toString(16);
    let color = '#ffe0e0';

    var rect = document.createElementNS(svgns, 'rect');
    rect.setAttributeNS(null, 'x', x);
    rect.setAttributeNS(null, 'y', y);
    rect.setAttributeNS(null, 'width', w);
    rect.setAttributeNS(null, 'height', h);
    rect.setAttributeNS(null, 'fill', color);

    rect.setAttributeNS(null, 'stroke-width', 1);
    rect.setAttributeNS(null, 'stroke', '#ff0000');
    rect.setAttributeNS(null, 'stroke-dasharray', '4');
    
    return rect;
}



function Item() {

    this.name="Item";
    this.element;
    this.properties=['id','x','y','width','height','backgroundColor','borderType','borderColor','borderWeight'];

    this.init = function(){

    }

    this.createElement = function(){
        let rect = getRect(0,0,w,h);
        let child = getOverlapGraphic([rect],'rect',x,y);
    }

    this.setElement = function(element){
        this.element=element;
    }
    this.getElement = function(){
        return this.element;
    }

    this.setProperty = function(name,value){
        this[name] = value;
    }

    this.getProperty = function(name){
        return this[name];
    }

    this.getProperties = function(){
        var reuslt={};

        var app=this;
        this.properties.forEach( function(name){
            reuslt[name] = app[name];
        } );
        return reuslt;
    }

    this.print = function() {
        console.log(this.getProperties());
    }
} 

function Sign() {
    Item.call(this);
    this.name = "Sign";
    this.data = '';
    this.properties=['id','x','y','width','height','data','color'];
}
Sign.prototype = Object.create(Item.prototype);
Sign.prototype.constructor = Sign;




function Text() {
    Item.call(this);
    this.name = "Text";
    this.properties=[
        'id','x','y','width','height','backgroundColor','borderType','borderColor','borderWeight','text',
        'textAlign','verticalAlign','fontColor','fontSize','fontFamily','fontWeight','fontStyle','textDecoration'
    ];
}
Text.prototype = Object.create(Item.prototype);
Text.prototype.constructor = Text;







var sign = new Sign();
sign.setProperty('x',10);
sign.setProperty('y',11);
sign.setProperty('width',12);
sign.setProperty('height',13);
sign.setProperty('data','hell world');

sign.print();


console.log(sign instanceof Sign); // true
console.log(sign instanceof Item); // true



var text = new Text();
text.setProperty('name','fucker');
console.log(text.getProperty('name'));