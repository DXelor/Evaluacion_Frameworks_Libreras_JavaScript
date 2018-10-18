        // switch (i){
            //     case 1:
            //         console.log('error');
            //         break;
            //     case 2:
            //         var item1 = $('.col-'+i+'.elemento');
            //         console.log(item1);
            //         break;
            //     case 3:
            //         console.log(elementos);
            //         break;
            //     case 4:
            //         console.log(elementos);
            //         break;
            //     case 5:
            //         console.log(elementos);
            //         break;
            //     case 6:
            //         console.log(elementos);
            //         break;
            //     case 7:
            //         console.log(elementos);
            //         break;
            //     case 8:
            //         console.log(elementos);
            //         break;
            //     default:
            //         console.log('error');
            // }


            // switch (imagen){
                //     case 'image/1.png':
                //         console.log('imagen 1')       
                //     case 'image/2.png':
                //         console.log('imagen 2')
                //     case 'image/3.png':
                //         console.log('imagen 3')
                //     case 'image/4.png':
                //         console.log('imagen 4')
                // }



                function inicio(){
                    for(let i=0;i<=columnas.length;i++){
                        var dulces = $('.col-'+i);
                        for(let j=0;j<columnas.length;j++){
                            var numero = Math.floor(Math.random()* 4) + 1;
                            var imagen = 'image/'+numero+'.png';
                            dulces.prepend("<img src="+imagen+" class='elemento'/>").css('justify-content', 'flex-start');
                        }
                    }
                    combo();
                    consola();
                    
                    //_applyRectangleConstraint(1,1,1,1);
                }
                function consola () {
                    console.log(srcItem)
                }




                var botonInicio = $('.btn-reinicio');
    var tablero = $('.panel-tablero');
    var grid = [];
    //columnas
    var columnas = [];
    columnas[0] = $('.col-1');
    columnas[1] = $('.col-2');
    columnas[2] = $('.col-3');
    columnas[3] = $('.col-4');
    columnas[4] = $('.col-5');
    columnas[5] = $('.col-6');
    columnas[6] = $('.col-7');

    //objetos
    var srcItem;

    function items(fila,columna,obj,src){
        return {
            fila: rows,
            columna: cols,
            src:src,
            locked:false,
            isInCombo:false,
            o:obj
        }
    }
    //array de objetos
    var tiposDeDulces=[];
    tiposDeDulces[0]="../image/1.png";
    tiposDeDulces[1]="../image/2.png";
    tiposDeDulces[2]="../image/3.png";
    tiposDeDulces[3]="../image/4.png";

    function itemAleatorio(){
        var pickInt = Math.floor((Math.random()*4));
        //console.log("Picked " + pickInt);
        return tiposDeDulces[pickInt];
    }
    //rejillas
    for (var fila = 0; fila < rows; fila++){
        grid[fila]=[];
        for (var columna =0; columna< cols; columna++) {
            grid[fila][columna]=new items(fila,columna,null,itemAleatorio());
        }
    }




    function inicio (){
        /**
       VERTICAL COMBO!
       **/
       for (var columna=0; columna< columnas.length; columna++){
           var celdaPrevia = null;
           var figureLen = 0;
           var figureStart = null;
           var figureStop = null;
           for (var fila = 0; fila < 7; fila++){
               //items del combo
               if (grid[fila][columna].locked || grid[fila][columna].isInCombo){
                   figureStart = null;
                   figureStop = null;
                   celdaPrevia = null;
                   figureLen = 1;
                   continue;
               }
               // primera celda del combo!
               if (celdaPrevia==null){
                   celdaPrevia = grid[fila][columna].src;
                   figureStart = fila;
                   figureLen = 1;
                   figureStop = null;
                   continue;
               }else{
                   // segunda o mas celdas del combo combo.
                   var curCell = grid[fila][columna].src;
                   // si la celda seleccionada no en igual a la celda previa
                   if (!(celdaPrevia==curCell)){
                       celdaPrevia = grid[fila][columna].src;
                       figureStart = fila;
                       figureStop=null;
                       figureLen = 1;
                       continue;
                   }else{
                       // si la celda seleccionada no en igual a la celda previa la longitud del combo incrementa
                       // duo de combo, current combo será destruido al fin de este procedimiento.
                       figureLen+=1;
                       if (figureLen==3){
                           validFigures+=1;
                           figureStop = fila;
                           console.log("Combo from " + figureStart + " to " + figureStop + "!");
                           for (var ci=figureStart;ci<=figureStop;ci++){
                               grid[ci][columna].isInCombo=true;
                               grid[ci][columna].src=null;
                               //grid[ci][c].o.attr("src","");
                           }
                           celdaPrevia=null;
                           figureStart = null;
                           figureStop = null;
                           figureLen = 1;
                           continue;
                       }
                   }
               }
           }
       }
   }




   var celda=7;
    var columnas =$('.panel-tablero div').length;
    var rejilla = [];

    var botonInicio = $('.btn-reinicio');

    // objeto del juego 
    function dulce(fila,columna,obj,src){

        return {
            fila: celda,
            columna: columnas,
            src:src,
            locked:false,
            isInCombo:false,
            o:obj
        }
    }

    var tipoDeDulces=[];
    tipoDeDulces[0]="image/1.png";
    tipoDeDulces[1]="image/2.png";
    tipoDeDulces[2]="image/3.png";
    tipoDeDulces[3]="image/4.png";

    function dulceAleatorio(){
        var pickInt = Math.floor((Math.random()*4+1));
        //console.log("Picked " + pickInt);
        return tipoDeDulces[pickInt];
    }

    // function dulceAleatorio(){
    //             var numero = Math.floor(Math.random()* 4) + 1;
    //             var imagen = 'image/'+numero+'.png';
    //             dulces.prepend("<img src="+imagen+" class='elemento'/>").css('justify-content', 'flex-start');
    // }
    for (var fila = 0; fila < columnas; fila++){
        rejilla[fila]=[];
        for (var columna =0; columna < columnas; columna++) {
            rejilla[fila][columna]=new dulce(fila,columna,null,dulceAleatorio());
        }
    }
    var width = $('.col-1').width();
    var height = $('.col-1').height();
    var cellHeight = height / (celda);
    var marginHeight = cellHeight/celda;
    console.log(cellHeight);

    for (var fila = 0; fila < celda; fila++){
        for (var columna =0; columna< columnas; columna++) {
            //console.log("add to: " + r*cellHeight + ", " + c*cellWidth);
            var cell = $("<img class='joya' id='joya_"+fila+"_"+columna+"' fila='"+fila+"' columna='"+columna+"' ondrop='_onDrop(event)' ondragover='_onDragOverEnabled(event)' src='"+rejilla[fila][columna].src+"' style='padding-right:20px;width:"+(width-20)+"px;height:"+cellHeight+"px;position:absolute;top:"+fila*cellHeight+"px'/>");
            cell.attr("ondragstart","_ondragstart(event)");
            $("col-1").append(cell);
            
            rejilla[fila][columna].o = cell;
        }
    }





    function llenarTablero () {// Método para llenar el tablero de juego con Dulces aleatorios
        for(let i=0;i<=columnas;i++){
            var recorrerColumnas = $('.col-'+i);
            for(let j=0;j<columnas;j++){
                var numero = Math.floor(Math.random()* 4) + 1;
                var imagen = 'image/'+numero+'.png';
                recorrerColumnas.prepend("<img src="+imagen+" class='elemento'/>").css('justify-content', 'flex-start');
            }
        }
    }