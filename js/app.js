$(document).ready(function(){
    //**********Cambiar color del titulo*************
    $(function(){
        var titulo = $("h1");
        var interval = setInterval(setColor, 500);
        function setColor(){
            titulo.animate({
                color: "green"
            },1000, function(){
                titulo[0].style.color = "#DCFF0E";
            })
        }
    })
    //************************************************
    //***********************CREAR ELEMENTOS****************************

    var intervalo=0;  //variable de tiempo para funcion de desplazamiento
    var nDulces=0;  //variable de tiempo para nuevos dulces
    var lencol=["","","","","","",""];
    var lenres=["","","","","","",""];
    var contador=0;


    var i=0;
    var tiempo=0;

    var puntos=0; // variable de puntos
    var movimientos=0;  //contador de movimientos
    var minutos=0; //variable de minutos
    var segundos=0; //variable de segundos

    var dulcesH=0;//busqueda dulces horizontal
    var dulcesV=0;//busqueda dulces vertical
    var bDulce=0; //buscar nuevo dulce
    var matriz=0;
    var eliminar=0;

    $(".btn-reinicio").click(function(){
        i=0;    //reinicia variable i
        puntos=0;    //reinicia los puntos
        movimientos=0;  //reinicia los movimientos
        $(".panel-score").css("width","25%");
        $(".panel-tablero").show();
        $(".time").show();
        $("#score-text").html("0")
        $("#movimientos-text").html("0")
        $(this).html("REINICIAR") //cabia el texto del boton INICIAR
        clearInterval(intervalo);
        clearInterval(eliminar);
        clearInterval(tiempo);
        clearInterval(nDulces);
        minutos=2;
        segundos=0;
        _borrartotal()
        intervalo=setInterval(function(){_dulces()},300)
        tiempo=setInterval(function(){_tiempo()},1000)
    })

    //**********************funcion de cronometro******************
    function _tiempo(){
        if(segundos!=0){
            segundos=segundos-1;
        }
        if(segundos==0){
            if(minutos==0){
                clearInterval(eliminar);
                clearInterval(nDulces);
                clearInterval(intervalo);
                clearInterval(tiempo);
                $( ".panel-tablero" ).hide("drop","slow",callback);
                $( ".time" ).hide();
            }
            segundos=59;
            minutos=minutos-1;
        }
        $("#timer").html("0"+minutos+":"+segundos)
    }
    function callback(){
        $( ".panel-score" ).animate({width:'100%'},4000);
    }

    //***********************Funcion para llenar la tabla con dulces*********************************
    function _dulces(){
        i=i+1
        var numero=0;
        var imagen=0;

        $(".elemento").draggable({ disabled: true });
        if(i<8){
            for(var c=1;c<8;c++){
                if($(".col-"+c).children("img:nth-child("+i+")").html()==null){
                    numero=Math.floor(Math.random() * 4) + 1 ;
                    imagen="image/"+numero+".png";
                    $(".col-"+c).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
                }
            }
        }
        if(i==8){
            clearInterval(intervalo);   //dejan de aparecer mas dulces
            eliminar=setInterval(function(){_combo()},150)  //activar funcion eliminarhorver
        }
    }

    //****************************elimina mas de 3 dulces**********************************
    function _combo(){
        matriz=0;
        dulcesH=_horizontal()  //funcion busqueda dulces _horizontal
        dulcesV=_vertical()    //funcion buscar dulces _vertical

        for(var c=1;c<8;c++){
            matriz=matriz+$(".col-"+c).children().length;
        }

        if(dulcesH==1 || dulcesV==1){
            $(".elemento").draggable({ disabled: true });
            $("div[class^='col']").css("justify-content","flex-end")
            $(".activo").hide("pulsate",1000,function(){//animacion
            var puntostmp=$(".activo").length;
            $(".activo").remove("img")
            puntos=puntos+puntostmp;
            $("#score-text").html(puntos)  //Cambiar puntuacion
            })
        }

        if(dulcesH==0 && dulcesV==0 && matriz!=49){  //si hay un espacio se vuelve a llenar
            clearInterval(eliminar);
            bDulce=0;
            nDulces=setInterval(function(){
                _nuevosDulces()  //Funcion completar nuevos dulces
            },500)
        }
        if(dulcesH==0 && dulcesV==0 && matriz==49)
        {
            $(".elemento").draggable({
            disabled: false,
            containment: ".panel-tablero",
            revert: true,
            revertDuration: 0,
            snap: ".elemento",
            snapMode: "inner",
            snapTolerance: 40,
            start: function(event, ui){
                movimientos=movimientos+1;
                $("#movimientos-text").html(movimientos)
            }
            });
        }

        $(".elemento").droppable({
            drop: function (event, ui) {
            var dropped = ui.draggable;
            var droppedOn = this;
            espera=0;
            do{
                espera=dropped.swap($(droppedOn));
            }while(espera==0)
            dulcesH=_horizontal()  //funcion busqueda dulces _horizontal
            dulcesV=_vertical()    //funcion buscar dulces _vertical
            if(dulcesH==0 && dulcesV==0)
            {
                dropped.swap($(droppedOn));
            }
            if(dulcesH==1 || dulcesV==1)
            {
                clearInterval(nDulces);
                clearInterval(eliminar);   //desactivar funcion desplazamiento()
                eliminar=setInterval(function(){_combo()},150)  //activar funcion eliminarhorver
            }
            },
        });
    }

    //*****************Funcion de borrado********************
    function _borrartotal(){
        for(var c=1;c<8;c++){
            $(".col-"+c).children("img").detach();
        }
    }

    //------------------------------------------------------------------------------
    //----------funcion de busqueda horizontal de dulces----------------------------
    function _horizontal(){
        var findH=0;
        for(var e=1;e<8;e++){//elementos||filas
            for(var c=1;c<6;c++){//columnas
                var res1=$(".col-"+c).children("img:nth-last-child("+e+")").attr("src")
                var res2=$(".col-"+(c+1)).children("img:nth-last-child("+e+")").attr("src")
                var res3=$(".col-"+(c+2)).children("img:nth-last-child("+e+")").attr("src")
                if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
                    $(".col-"+c).children("img:nth-last-child("+(e)+")").attr("class","elemento activo")
                    $(".col-"+(c+1)).children("img:nth-last-child("+(e)+")").attr("class","elemento activo")
                    $(".col-"+(c+2)).children("img:nth-last-child("+(e)+")").attr("class","elemento activo")
                    findH=1;
                }
            }
        }
        return findH;
    }
    function _vertical(){
        var findV=0;
        for(var f=1;f<6;f++){//filas||elementos
            for(var c=1;c<8;c++){//columnas
                var res1=$(".col-"+c).children("img:nth-child("+f+")").attr("src")
                var res2=$(".col-"+c).children("img:nth-child("+(f+1)+")").attr("src")
                var res3=$(".col-"+c).children("img:nth-child("+(f+2)+")").attr("src")
                if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
                    $(".col-"+c).children("img:nth-child("+(f)+")").attr("class","elemento activo")
                    $(".col-"+c).children("img:nth-child("+(f+1)+")").attr("class","elemento activo")
                    $(".col-"+c).children("img:nth-child("+(f+2)+")").attr("class","elemento activo")
                    findV=1;
                }
            }
        }
        return findV;
    }

    //***********************Funcion intercambio de dulces**********************
    jQuery.fn.swap = function(b){
        b = jQuery(b)[0];
        var a = this[0];
        var t = a.parentNode.insertBefore(document.createTextNode(''), a);
        b.parentNode.insertBefore(a, b);
        t.parentNode.insertBefore(b, t);
        t.parentNode.removeChild(t);
        return this;
    };

    //*********************** */Funcion de nuevos dulces****************
    function _nuevosDulces(){
        $(".elemento").draggable({ disabled: true });
        $("div[class^='col']").css("justify-content","flex-start")
        for(var c=1;c<8;c++){
            lencol[c-1]=$(".col-"+c).children().length;
        }
        if(bDulce==0){
            for(var j=0;j<7;j++){
                lenres[j]=(7-lencol[j]);
            }
            maximo=Math.max.apply(null,lenres);
            contador=maximo;
        }
        if(maximo!=0){
            if(bDulce==1){
                for(var c=1;c<8;c++){
                    if(contador>(maximo-lenres[c-1])){
                        $(".col-"+c).children("img:nth-child("+(lenres[c-1])+")").remove("img")
                    }
                }
            }
            if(bDulce==0){
                bDulce=1;
                for(var c=1;c<8;c++){
                    for(var j=0;j<(lenres[c-1]-1);j++){
                        $(".col-"+c).prepend("<img src='' class='elemento' style='visibility:hidden'/>")
                    }
                }
            }
            for(var c=1;c<8;c++){
                if(contador>(maximo-lenres[c-1])){
                    numero=Math.floor(Math.random() * 4) + 1 ;
                    imagen="image/"+numero+".png";
                    $(".col-"+c).prepend("<img src="+imagen+" class='elemento'/>")
                }
            }
        }
        if(contador==1){
            clearInterval(nDulces);
            eliminar=setInterval(function(){_combo()},150)
        }
        contador=contador-1;
    }
});