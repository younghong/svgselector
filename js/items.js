/*=================================
date:20210513
desc:item class 정의
autor:kyh
=================================*/

function Item() {

    this.class="Item";
    this.type="item";
    this.name="Item";
    this.element;
    this.x=0;
    this.y=0;
    this.width=100;
    this.height=50;
    this.properties=['id','x','y','width','height','backgroundColor','borderType','borderColor','borderWeight'];

    this.svgControl;

    this.init = function(){
        this.svgControl = new SvgControl();
        this.createElement(); 
        //this.makeFunction();
        this.id = this.generatorId();
        
    }

    this.makeFunction = function(){

        var app=this;
        console.log(this.properties);
        this.properties.forEach( function(name){
            app['set'+name]=function(value){
                app[name]=value;
            }
        } );
    }

    this.createElement = function(){
        let rect = this.svgControl.getRect(0,0,this.width,this.height);
        let child = this.svgControl.getOverlapGraphic([rect],this.x,this.y);
        this.element=child;
    }

    this.setElement = function(element){
        this.element=element;
    }
    this.getElement = function(){
        return this.element;
    }

    this.update=function(){
        var app=this;
        this.properties.forEach( function(name){
            app.setProperty( name , app[name]  );
        } );
    }

    this.setProperty = function(name,value){
        this[name] = value;
        //console.log('property:' + name);
        //this['set'+name](value);
        this.svgControl.setProperty(this,name,value);
    }

    this.setProperties = function(propertis){

        for( var name in propertis ){
            //console.log( name + ":" + propertis[name]);
            this.setProperty(name,propertis[name]);
        }
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

    this.generatorId = function() {
        var id = 'u'+parseInt((Math.random() * 9999));
        return id;
    }
    
} 

function Sign() {
    Item.call(this);
    this.class="Sign";
    this.type="sign";
    this.name = "Sign";
    this.data = '';
    
    this.x=100;
    this.y=100;
    this.width=200;
    this.height=50;
    this.name = "Text";

    this.backgroundColor='#ffeff5';

    this.fontColor='#757575';
    this.fontSize=15;

    this.textAlign='center';
    this.verticalAlign='middle';
    this.text='서명';

    this.borderType='solid';
    this.borderColor='#ff3684';
    this.borderWeight=1;

    this.fontFamily='';
    this.fontWeight='normal';
    this.fontStyle='normal';
    this.textDecoration='normal';


    this.properties=[
        'class','type','id','name','x','y','width','height','backgroundColor','borderType','borderColor','borderWeight','text',
        'textAlign','verticalAlign','fontColor','fontSize','fontFamily','fontWeight','fontStyle','textDecoration','data'
    ];

    this.createElement = function(){
        let text = this.svgControl.getText(0,this.fontColor,this.fontSize);
        let rect = this.svgControl.getRect(0,0,this.width,this.height);
        let child = this.svgControl.getOverlapGraphic([rect,text],this.x,this.y);
        this.element=child;
    }
}
Sign.prototype = Object.create(Item.prototype);
Sign.prototype.constructor = Sign;


function Text() {
    Item.call(this);
    this.class="Text";
    this.name = "Text";
    this.type="text";

    this.x=50;
    this.y=200;
    this.width=200;
    this.height=50;
 
    this.backgroundColor='#ffeff5';

    this.fontColor='#757575';
    this.fontSize=15;

    this.textAlign='center';
    this.verticalAlign='middle';
    this.text='텍스트';

    this.borderType='solid';
    this.borderColor='#ff3684';
    this.borderWeight=1;

    this.fontFamily='';
    this.fontWeight='normal';
    this.fontStyle='normal';
    this.textDecoration='normal';


    this.properties=[
        'class','type','id','name','x','y','width','height','backgroundColor','borderType','borderColor','borderWeight','text',
        'textAlign','verticalAlign','fontColor','fontSize','fontFamily','fontWeight','fontStyle','textDecoration'
    ];

    this.createElement = function(){
        let text = this.svgControl.getText(0,this.fontColor,this.fontSize);
        let rect = this.svgControl.getRect(0,0,this.width,this.height);
        let child = this.svgControl.getOverlapGraphic([rect,text],this.x,this.y);
        this.element=child;
    }
}
Text.prototype = Object.create(Item.prototype);
Text.prototype.constructor = Text;






function SvgControl(){

    const svgns = "http://www.w3.org/2000/svg";
    
    this.getOverlapGraphic = (targets,x,y) => {
        
        var g = document.createElementNS(svgns, 'g');
        g.setAttributeNS(null, 'fill', 'white');
        g.setAttributeNS(null, 'stroke', 'green');
        g.setAttributeNS(null, 'stroke-width', '1');
        //g.setAttributeNS(null, 'transform', 'translate(10,50) rotate(0) scale(1,1)');
        g.setAttributeNS(null, 'transform', 'translate('+x+','+y+')');

        targets.forEach( (target) => { g.appendChild( target ); } )

        return g;
    }


    this.getRect = (x,y,w,h) => {
        
        //var color = '#'+Math.round(0xffffff * Math.random()).toString(16);
        //var color = '#ffe0e0';
        var color = '#ffeff5';
        var borderColor = '#ff3684';

        var rect = document.createElementNS(svgns, 'rect');
        rect.setAttributeNS(null, 'x', x);
        rect.setAttributeNS(null, 'y', y);
        rect.setAttributeNS(null, 'width', w);
        rect.setAttributeNS(null, 'height', h);
        rect.setAttributeNS(null, 'fill', color);

        rect.setAttributeNS(null, 'stroke-width', 1);
        rect.setAttributeNS(null, 'stroke', borderColor);
        rect.setAttributeNS(null, 'stroke-dasharray', '4');
        
        return rect;
    }

    this.getText = (x,color,size) => {
        var text = document.createElementNS(svgns, 'text');
        text.setAttributeNS(null, 'x', x);
        text.setAttributeNS(null, 'y', size);
        text.setAttributeNS(null, 'fill', color);
        text.setAttributeNS(null, 'font-size', size);
        text.setAttributeNS(null, 'stroke', '#0000ff');
        text.setAttributeNS(null, 'stroke-width', 0);

        text.setAttributeNS(null, 'font-family', 'sans-serif');
        text.setAttributeNS(null, 'text-anchor', 'start');
        text.setAttributeNS(null, 'style', 'cursor: text');


        //text.setAttributeNS(null, 'font-weight', 'bold');
        //text.setAttributeNS(null, 'font-style', 'italic');
        //text.setAttributeNS(null, 'text-decoration', 'underline');

        text.innerHTML = "test";
        //text.append("Hello World");
        return text;
    }

    // graphic item의 child의 속성을 변경해야함.
    this.getTargetItem = (target) => {
        var child = target.children[0];
        return child;
    }
    
    this.getTargetSize = (child) =>{
        width = parseInt(child.getAttribute("width"));
        height = parseInt(child.getAttribute("height"));
        return [width , height];
    }


    this.setProperty = ( iter,attr,value) => { 

        var type = iter.type;
        var item = iter.element;

        if( type == "text" || type == "sign" ){
            var text = item.getElementsByTagName('text')[0];
            var rect = item.getElementsByTagName('rect')[0];

            if( attr == "textAlign" ){

                var bbox = text.getBBox();
                var width = bbox.width;
                var height = bbox.height;
                
                var size = this.getTargetSize(this.getTargetItem(item));
                var w = size[0];
                var h = size[1];

                if( value == "left" ){
                    text.setAttributeNS(null, 'text-anchor', 'start');
                    text.setAttribute('x',0);
                }else if( value == "center" ){
                    text.setAttributeNS(null, 'text-anchor', 'start');
                    text.setAttribute('x',(w/2-width/2));
                    //console.log((w/2-width/2));
                }else if( value == "right" ){
                    text.setAttributeNS(null, 'text-anchor', 'end');
                    text.setAttribute('x',w);
                    //console.log(w-width);
                }
                
                //itor[attr]=value;

            }else if( attr == "verticalAlign" ){

                var bbox = text.getBBox();
                var width = bbox.width;
                var height = bbox.height;
                
                var size = this.getTargetSize(this.getTargetItem(item));
                var w = size[0];
                var h = size[1];


                var fontsize = parseInt(text.getAttribute('font-size'));

                if( value == "top" ){
                    text.setAttribute('y',fontsize);
                }else if( value == "middle" ){
                    text.setAttribute('y',h/2+fontsize/2);
                }else if( value == "bottom" ){
                    text.setAttribute('y',h-(fontsize/2));
                }

                //itor[attr]=value;

            }else if(attr == "fontColor"){
                text.setAttribute('fill', value);
            }else if(attr == "backgroundColor"){
                rect.setAttribute('fill', value);
            }else if(attr == "text"){
                text.innerHTML = value;
            }else if(attr == "borderType"){
                
            }else if(attr == "borderColor"){
                rect.setAttribute('stroke', value);
            }else if(attr == "borderWeight"){
                rect.setAttribute('stroke-width', value);
            }else if(attr == "fontFamily"){

            }else if(attr == "fontWeight"){
                text.setAttribute('font-weight', value);
            }else if(attr == "fontStyle"){
                text.setAttribute('font-style', value);
            }else if(attr == "textDecoration"){
                text.setAttribute('text-decoration', value);
            }else if(attr == "fontSize"){
                text.setAttribute('font-size', value);
            }else if(attr == "fontColor"){

            }else if(attr == "fontColor"){

            }else if(attr == "fontColor"){

            }else{
                text.setAttribute(attr, value);
            }

            
        }else{

            if( attr == "x" ){
                this.setTargetPositionX(item,value);
            }else if( attr == "y" ){
                this.setTargetPositionY(item,value);        
            }else if( attr == "width" ){
                this.setTargetWidth(this.getTargetItem(item),value);
            }else if( attr == "height" ){
                this.setTargetHeight(this.getTargetItem(item),value);
            }else if( attr == "text-align" ){
            }else if( attr == "text-align" ){
            }

            item.setAttribute(attr, value);
        }
    }

}



