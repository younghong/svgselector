

var ItemManager = function(container , w, h ){

    const svgID='ROOTSVG';
    const selectorID = 'selector-g';

    let rootContainer=document.getElementById(container);
    let svgContainer;
    let Selector;
    
    const svgns = "http://www.w3.org/2000/svg";

    //remover
    createBackgroundSVG = (id , width , height , color) => {
        
        svgContainer = document.createElementNS(svgns, 'svg');
        svgContainer.setAttributeNS(null, 'id', id);
        svgContainer.setAttributeNS(null, 'width', width);
        svgContainer.setAttributeNS(null, 'height', height);
        //svgContainer.setAttributeNS(null, 'style', 'background-color:'+color);
        
        rootContainer.appendChild(svgContainer);
    }
    
    //remover
    createSelector = () => {      
        
        Selector = document.createElementNS(svgns, 'g');
        Selector.setAttributeNS(null, 'id', selectorID);
        Selector.setAttributeNS(null, 'stroke', 'yellow');
        Selector.setAttributeNS(null, 'stroke-width', 1);
        Selector.setAttributeNS(null, 'visibility', "hidden");
        
        const LINE_FILL="#ff0000";
    
        let selectorLine = [
            {id:'selector-left','stroke-dasharray':'4',stroke:LINE_FILL , 'stroke-width':3},
            {id:'selector-right','stroke-dasharray':'4',stroke:LINE_FILL, 'stroke-width':3},
            {id:'selector-top','stroke-dasharray':'4',stroke:LINE_FILL, 'stroke-width':3},
            {id:'selector-bottom','stroke-dasharray':'4',stroke:LINE_FILL, 'stroke-width':3}
        ];
    
        selectorLine.forEach( (selector) => {
            var line = document.createElementNS(svgns, 'line');
    
            for( const key in selector ){
                if (Object.hasOwnProperty.call(selector, key)) {
                    line.setAttributeNS(null, key, selector[key]);
                }
            }
            Selector.appendChild(line);
        });
    
    
        const RS=10;
        const RF="#ff0000";
    
        let selectorPoint = [
            {id:'selector-e' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'e-resize'},
            {id:'selector-nw' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'nw-resize'},
            {id:'selector-ne' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'ne-resize'},
            {id:'selector-n' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'n-resize'},
            {id:'selector-sw' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'sw-resize'},
            {id:'selector-se' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'se-resize'},
            {id:'selector-s' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'s-resize'},
            {id:'selector-w' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'w-resize'},
        ];
    
        selectorPoint.forEach( (selector) => {
    
            var rect = document.createElementNS(svgns, 'rect');
    
            for (const key in selector) {
                if (Object.hasOwnProperty.call(selector, key)) {
                    rect.setAttributeNS(null, key, selector[key]);
                }
            }
    
            rect.addEventListener("mousedown", mouseDownHandler);
            Selector.appendChild(rect);
        } );
    
    
        
        svgContainer.appendChild(Selector);
    }
    

    //remover
    ItemManager.prototype.addRect = (x,y,w,h) => {
        let rect = getRect(0,0,w,h);
        let child = getOverlapGraphic([rect],'rect',x,y);
    
        // svg area
        svgContainer.insertBefore(child,Selector);
    
        addItemEvent(child);
        addItem(child);
    }
    
    //remover
    ItemManager.prototype.addText = (x,y,w,h,color,size) => {

        let text = getText(0,color,size);
        let rect = getRect(0,0,w,h);
    
        textRect = text.getBBox();
    
        let child = getOverlapGraphic([rect,text],'text',x,y);
    
        // svg area
        svgContainer.insertBefore(child,Selector);
    
        addItemEvent(child);
        addItem(child);
    }
    
    //remover
    getOverlapGraphic = (targets , type ,x,y) => {
    
        var g = document.createElementNS(svgns, 'g');
        g.setAttributeNS(null, 'fill', 'white');
        g.setAttributeNS(null, 'stroke', 'green');
        g.setAttributeNS(null, 'stroke-width', '1');
        //g.setAttributeNS(null, 'transform', 'translate(10,50) rotate(0) scale(1,1)');
        g.setAttributeNS(null, 'transform', 'translate('+x+','+y+')');
        g.setAttributeNS(null, 'class', type);
    
        targets.forEach( (target) => { g.appendChild( target ); } )
    
        return g;
    }
    
    //rmover
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
    
    //rmover
    getText = (x,color,size) => {
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
    
        //text.innerHTML = "test";
        text.append("Hello World");
        return text;
    }
    
    
    
    //remover
    addItemEvent = (target) => {
        target.addEventListener("click",clickHandler);
        target.addEventListener("mousemove", targetMoveHandler);
        target.addEventListener("mousedown", targetDownHandler);
        target.addEventListener("mouseup", targetMouseUpHandler);
        target.addEventListener("dblclick",targetDoubleClickHandler);
    }
    
    //remover
    removeItemEvent = (target) => {
        target.removeEventListener("click",clickHandler);
        target.removeEventListener("mousemove", targetMoveHandler);
        target.removeEventListener("mousedown", targetDownHandler);
        target.removeEventListener("mouseup", targetMouseUpHandler);
    }
    
    
    //remover
    setTargetPosition = (target,x,y) => {
        let translate = 'translate('+x+','+y+')';
        target.setAttributeNS(null, 'transform', translate);
    }
    
    //remover
    setTargetPositionX = (target,x) => {
        let translate = 'translate('+x+','+ getTargetPosition(target)[1] +')';
        target.setAttributeNS(null, 'transform', translate);
    }
    
    //remover
    setTargetPositionY = (target,y) => {
        let translate = 'translate('+getTargetPosition(target)[0]+','+y+')';
        target.setAttributeNS(null, 'transform', translate);
    }
    
    //remover
    getTargetPosition = (target) => {
        let trasform =  target.getAttribute("transform");
        let values = trasform.split(' ');
    
        let translate = values[0];
        //let rotate = values[1];
        //let scale = values[2];
    
        let translatevalue = translate.substring(10 , translate.length-1);
        console.log(translatevalue);
        let position = translatevalue.split(',');
        x = parseInt(position[0]);
        y = parseInt(position[1]);
    
    
        //let rotatevalue = rotate.substring(7 , rotate.length-1);
        //console.log(rotatevalue);
    
        //let scaleevalue = scale.substring(6, scale.length-1);
        //console.log(scaleevalue);
    
        return [x,y];
    }
    
    //remover
    setTargetSize = (target,width,height) => {
        target.setAttributeNS(null, 'width', width);
        target.setAttributeNS(null, 'height', height);
    }
    
    //remover
    setTargetWidth = (target,width) => {
        target.setAttributeNS(null, 'width', width);
    }
    
    //remover
    setTargetHeight = (target,height) => {
        target.setAttributeNS(null, 'height', height);
    }
    
    //remover
    getTargetSize = (child) =>{
        width = parseInt(child.getAttribute("width"));
        height = parseInt(child.getAttribute("height"));
        return [width , height];
    }
    
    //remover
    getTargetItem = (target) => {
        var child = target.children[0];
        return child;
    }
    //remover
    updateSelector = (target) => {
    
        let position = getTargetPosition(target);
        x = position[0];
        y = position[1];
        
        let size = getTargetSize(getTargetItem(target));   
        width = size[0];
        height = size[1];
    
        let test = 'translate('+x+' '+y+')';
        Selector.setAttribute("transform",test);
        
        e = document.getElementById('selector-e');
        ne = document.getElementById('selector-ne');
        nw = document.getElementById('selector-nw');
        n = document.getElementById('selector-n');
        se = document.getElementById('selector-se');
        sw = document.getElementById('selector-sw');
    
        s = document.getElementById('selector-s');
        w = document.getElementById('selector-w');
    
        //selector size;
        const RS=10;
    
        //e
        e.setAttribute("x",width-(RS/2));
        e.setAttribute("y",(height/2-RS/2));
        
        //ne
        ne.setAttribute("x",width-(RS/2));
        ne.setAttribute("y",-(RS/2));
    
        //nw
        nw.setAttribute("x",-(RS/2));
        nw.setAttribute("y",-(RS/2));
    
        //n
        n.setAttribute("x",(width/2-RS/2));
        n.setAttribute("y",-(RS/2));
    
        //se
        se.setAttribute("x",width-(RS/2));
        se.setAttribute("y",height-(RS/2));
    
        //sw
        sw.setAttribute("x",-(RS/2));
        sw.setAttribute("y",height-(RS/2));
    
        //s
        s.setAttribute("x",(width/2-RS/2));
        s.setAttribute("y",height-(RS/2));
    
        //w
        w.setAttribute("x",-(RS/2));
        w.setAttribute("y", (height/2-RS/2) );
    
        lineLeft = document.getElementById('selector-left');
        lineRight = document.getElementById('selector-right');
        lineTop = document.getElementById('selector-top');
        lineBottom = document.getElementById('selector-bottom');
    
        lineLeft.setAttribute('x1',0);
        lineLeft.setAttribute('y1',0);
        lineLeft.setAttribute('x2',0);
        lineLeft.setAttribute('y2',height);
    
        lineRight.setAttribute('x1',width);
        lineRight.setAttribute('y1',0);
        lineRight.setAttribute('x2',width);
        lineRight.setAttribute('y2',height);
    
        lineTop.setAttribute('x1',0);
        lineTop.setAttribute('y1',0);
        lineTop.setAttribute('x2',width);
        lineTop.setAttribute('y2',0);
    
        lineBottom.setAttribute('x1',0);
        lineBottom.setAttribute('y1',height);
        lineBottom.setAttribute('x2',width);
        lineBottom.setAttribute('y2',height);
    }
    
    
    
  
    
    //remover
    let currentTarget;
    let currentTargetType;
    
    let startX;
    let startY;
    let isMoveDown=false;
    
    let mx;
    let my;
    
    //remover
    targetDownHandler = (event) => {
    
        currentTarget=event.currentTarget;
        currentTargetType = currentTarget.getAttribute('class');
    
        event.preventDefault();
    
        isMoveDown=true;
        movename.innerText="move:true";
        startX = event.pageX;
        startY = event.pageY;
    
        let position = getTargetPosition(currentTarget);
        mx = position[0];
        my = position[1];
    
        updateSelector(currentTarget);
    }
    
    //remover
    targetMoveHandler = (event) => {
        if( isMoveDown ){
            let x = event.pageX-startX;
            let y = event.pageY-startY;
            setTargetPosition(currentTarget,mx+x,my+y);
            updateSelector(currentTarget);
        }
    }
    
    //remover
    targetMouseUpHandler = (event) => {
        isMoveDown=false;
        movename.innerText="move:false";
    }

    targetDoubleClickHandler = (event) => {
        
        let texte = currentTarget.children[1];

        let size = getTargetSize(getTargetItem(currentTarget));   
        scaleW = size[0];
        scaleH = size[1];

        let textedito = document.getElementById('text-editor');
        textedito.style.width=scaleW+'px';
        textedito.style.height=scaleH+'px';
        
        textedito.style.fontFamily = texte.getAttribute('font-family');
        textedito.style.fontSize = texte.getAttribute('font-size');
        textedito.style.fontWeight = texte.getAttribute('font-weight');
        textedito.style.fontStyle = texte.getAttribute('font-style');
        //textedito.style.font = ;
        //texte.getAttribute('font-decoration');

        textedito.innerText = texte.innerHTML;

        let position = getTargetPosition(currentTarget);
        scaleX = position[0];
        scaleY = position[1];

       
        
    
        textedito.style.left=(scaleX+rootContainer.offsetLeft)+'px';
        textedito.style.top=(scaleY+rootContainer.offsetTop)+'px';

        
    }
    
    //remover
    let isDown=false;
    let scaleW;
    let scaleH;
    
    let scaleX;
    let scaleY;
    
    let mouseDownX;
    let mouseDownY;
    
    let currentTransTarget;
    //remover
    mouseDownHandler = (event) => {
    
        currentTransTarget = event.currentTarget;
    
        isDown=true;
        scalename.innerText="scale:true";
    
        let position = getTargetPosition(currentTarget);
        scaleX = position[0];
        scaleY = position[1];
        
        let size = getTargetSize(getTargetItem(currentTarget));   
        scaleW = size[0];
        scaleH = size[1];
    
        mouseDownX = event.pageX;
        mouseDownY = event.pageY;
    }
    
    //remover
    mouseMoveHandler = (event) => {
        if( isDown ){
    
            // 최초 mouse down 위치 값 mouseDownX
            // 현재 mouse move 위치 값 pageX
            // 현재 위치에서 최초 위치값의 차를 
            if( currentTransTarget.id == "selector-n" ){
                let h = -(event.pageY-mouseDownY);
                //setAttr("y",scaleY-h);
                setTargetPositionY(currentTarget,scaleY-h);
                //setAttr("height", scaleH+h);
                setTargetHeight( getTargetItem(currentTarget) , scaleH+h );
            }else if( currentTransTarget.id == "selector-e" ){
                let w = event.pageX-mouseDownX;
                //setAttr("width", scaleW+w);
                setTargetWidth( getTargetItem(currentTarget) , scaleW+w );
            }else if( currentTransTarget.id == "selector-ne" ){
                let h = -(event.pageY-mouseDownY);
                //setAttr("y", scaleY-h);
                setTargetPositionY(currentTarget,scaleY-h);
                //setAttr("height", scaleH+h);
                setTargetHeight( getTargetItem(currentTarget) , scaleH+h );
                let w = event.pageX-mouseDownX;
                //setAttr("width", scaleW+w);
                setTargetWidth( getTargetItem(currentTarget) , scaleW+w );
            }else if( currentTransTarget.id == "selector-nw" ){
                let h = -(event.pageY-mouseDownY);
                //setAttr("y", scaleY-h);
                setTargetPositionY(currentTarget,scaleY-h);
                //setAttr("height", scaleH+h);
                setTargetHeight( getTargetItem(currentTarget) , scaleH+h );
                let w = -(event.pageX-mouseDownX);
                //setAttr("x", scaleX-w);
                setTargetPositionX(currentTarget,scaleX-w);
                //setAttr("width", scaleW+w);
                setTargetWidth( getTargetItem(currentTarget) , scaleW+w );
            }else if( currentTransTarget.id == "selector-se" ){
               let w = event.pageX-mouseDownX;
               let h = event.pageY-mouseDownY;
               //setAttr("width", scaleW+w);
               setTargetWidth( getTargetItem(currentTarget) , scaleW+w );
               //setAttr("height", scaleH+h);
               setTargetHeight( getTargetItem(currentTarget) , scaleH+h );
            }else if( currentTransTarget.id == "selector-sw" ){
                let h = event.pageY-mouseDownY;
                //setAttr("height", scaleH+h);
                setTargetHeight( getTargetItem(currentTarget) , scaleH+h );
                let w = -(event.pageX-mouseDownX);
                //setAttr("x", scaleX-w);
                setTargetPositionX(currentTarget,scaleX-w);
                //setAttr("width", scaleW+w);
                setTargetWidth( getTargetItem(currentTarget) , scaleW+w );
            }  else if( currentTransTarget.id == "selector-s" ){
                let h = event.pageY-mouseDownY;
                //setAttr("height", scaleH+h);
                setTargetHeight( getTargetItem(currentTarget) , scaleH+h );
            }else if( currentTransTarget.id == "selector-w" ){
               let w = -(event.pageX-mouseDownX);
               //setAttr("x", scaleX-w);
               setTargetPositionX(currentTarget,scaleX-w);
               //setAttr("width", scaleW+w);
               setTargetWidth( getTargetItem(currentTarget) , scaleW+w );
           }
           updateSelector(currentTarget);
        }
    }
    
    //remover
    mouseUpHandler = (event) => {
        isDown=false;
        scalename.innerText="scale:false";
    
        isMoveDown=false;
        movename.innerText="move:false";
    }
    
    let setAttr = (key , value) => {
        currentTarget.setAttribute(key, value);
    }
    
    
    //remover
    clickHandler = (event) => {
        Selector.setAttribute("visibility","visible");
        currentTarget=event.currentTarget;
        updateSelector(event.currentTarget);
    }
    
    
    //remover
    canvasMouseDownHandler = (event) => {
        if( isMoveDown == true || isDown == true ){
        }else{
            Selector.setAttribute("visibility","hidden");    
        }
    }
    
    movestate = () => {
        let movename = document.getElementById('movename');
        movename.innerText="move:false";    
    }
    
    scalestate = () => {
        let scalename = document.getElementById('scalename');
        scalename.innerText="scale:false";    
    }
    
    movestate();
    scalestate();

    //remover
    createBackgroundSVG(svgID,w,h,'green');
    createSelector();

    //remover
    svgContainer.addEventListener("mouseup", mouseUpHandler);
    svgContainer.addEventListener("mousemove", mouseMoveHandler);
    svgContainer.addEventListener("mousedown", canvasMouseDownHandler);
    
    
    texttest = () => {

        let tii = document.getElementById('ti');
        tii.addEventListener("keyup", (e) => {
            if( currentTargetType == "text" ){
                var text = currentTarget.getElementsByTagName('text')[0];
                text.innerHTML= tii.value;
            }
        } );
    
    }

    //remover
    setProperty = ( itor,attr,value) => {
    
        let item = itor.item;
        let type = item.getAttribute('class');
        
    
        if( type == "text" ){
            var text = item.getElementsByTagName('text')[0];
    
            if( attr == "text-align" ){
    
                var bbox = text.getBBox();
                var width = bbox.width;
                var height = bbox.height;
                
                let size = getTargetSize(getTargetItem(item));
                let w = size[0];
                let h = size[1];
    
                if( value == "left" ){
                    text.setAttributeNS(null, 'text-anchor', 'start');
                    text.setAttribute('x',0);
                }else if( value == "center" ){
                    text.setAttributeNS(null, 'text-anchor', 'start');
                    text.setAttribute('x',(w/2-width/2));
                    console.log((w/2-width/2));
                }else if( value == "right" ){
                    text.setAttributeNS(null, 'text-anchor', 'end');
                    text.setAttribute('x',w);
                    console.log(w-width);
                }
                
                itor[attr]=value;
    
            }else if( attr == "vertical-align" ){
    
                var bbox = text.getBBox();
                var width = bbox.width;
                var height = bbox.height;
                
                let size = getTargetSize(getTargetItem(item));
                let w = size[0];
                let h = size[1];
    
    
                let fontsize = parseInt(text.getAttribute('font-size'));
    
                if( value == "top" ){
                    text.setAttribute('y',fontsize);
                }else if( value == "middle" ){
                    text.setAttribute('y',h/2+fontsize/2);
                }else if( value == "bottom" ){
                    text.setAttribute('y',h-(fontsize/2));
                }
    
                itor[attr]=value;
    
            }else{
                text.setAttributeNS(null, attr, value);
            }
    
            
        }
    }
    
    getItemProperties = (item) => {
    
        let type = item.getAttribute('class');
        
    
        if( type == "text" ){
            let text = currentTarget.getElementsByTagName('text')[0];
            let properties={};
            //'id','authority','tooltip','text','keytype','max-length','place-holder','text-align','vertical-align'
            let attrs = ['font-family','fill','font-size','font-weight','font-style','text-decoration'];
    
            attrs.forEach( (attr) => {
                properties[attr] = text.getAttribute(attr) == null ? '' : text.getAttribute(attr);
            } );
    
            console.log(JSON.stringify(properties));
            //JSON.parse()
        }else{
    
        }
    }
    
    
    getChldrenItems = () => {
    
    }
    
    getJsonData = () => {
    
    
        items
    
    }
    
    
    
    //remover
    let items=[];
    
    //remover
    addItem = (item) => {
        items.push( {item:item } );
    }
    
    //remover
    removeItem = (item) => {
    
        item = currentTarget;
    
        let idx = items.findIndex( (itor) => {
            return item == itor.item;
        });
    
        let remove = items.splice(idx,1);
    
        removeItemEvent(currentTarget);
    
        // svg area
        svgContainer.removeChild(currentTarget);    
        Selector.setAttribute("visibility","hidden");
        
    }
    
    
    testSetProperty = (attr,value) => {
    
    
        let idx = items.findIndex( (itor) => {
            return currentTarget == itor.item;
        });
    
        let item = items[idx];
    
    
        setProperty(item,attr,value);
    }

}

var itemManager = new ItemManager('drawsvg',500,1000);


this.addEventListener('keyup', (event) => {
    const keyName = event.key;
    console.log(keyName);
});


setItemIdInfo = () =>{
    
    let idList = getItemIdInfo();
    columns=['텍스트','값'];
    rows=['서명','텍스트','레이블','라디오','체크'];

    createInfoTable('container',idList,columns);
}


getItemIdInfo = () =>{

    items=[{id:'a'},{id:'b'},{id:'d'},{id:'e'}];

    let idList = items.map( (itor) => {
        return itor.id;
    } );

    console.log(idList);

    return idList;
}


copyItemIdInfo = () =>{
    
    let idList = getItemIdInfo();

    let csv = idList.map( (itor) => {
        return itor + ',' +itor + '\r\n';
    });

    let data = csv.join('');

    let container = document.getElementById('container');

    var copyText = document.createElement('textarea');

    container.appendChild(copyText);

    copyText.value = data;
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    console.log(copyText.value);
    container.removeChild(copyText);
}



createInfoTable = (container ,rows,columns) => {
   
    let table = document.createElement('table');

    let colgroup = document.createElement('colgroup');
    let thead = document.createElement('thead');
    let thead_tr = document.createElement('tr');

    columns.forEach( (itor) => {
        let col = document.createElement('col');
        col.setAttribute('style','width:50%');
        colgroup.appendChild(col);

        let th = document.createElement('th');
        th.innerText=itor;
        thead_tr.appendChild(th);
    });
    thead.appendChild(thead_tr);




    let tbody = document.createElement('tbody');
    
    rows.forEach( (itor) => {

        let tr = document.createElement('tr');
        let id = document.createElement('td');
        id.innerText=itor;
        let value = document.createElement('td');
        value.innerText=itor;

        tr.appendChild(id);
        tr.appendChild(value);

        tbody.appendChild(tr);
    } );
    table.appendChild(colgroup);
    table.appendChild(thead);
    table.appendChild(tbody);


    let parent = document.getElementById(container);
    parent.appendChild(table);

}

