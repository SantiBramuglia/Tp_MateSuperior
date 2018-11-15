function mostrarEstado1() {
    $("#norma1").hide();
    $("#norma2").hide();
    $("#normaInfinito").hide();
    $("#norma").hide();

    $("#verificar").hide();
    $("#ejecutarNormas").hide();

    $("#cuadro_vector_inicial").hide();

    $('.seleccion-metodo').hide();
    $('.ejecutar-algoritmo').hide();
    //$('.ejecutar-norma').hide();
    $('#generar').hide();
    $("#tabla_A").hide();
    $("#cuadro_tabla_A").hide();
    $("#tabla_B").hide();
    $("#equals").hide();
    $("#cuadro_tabla_B").hide();
    $("#tabla_X").hide();
    $("#middot").hide();
    $("#cuadro_tabla_X").hide();

    $('#filas_columnas').focus();
    $('.subtitulo').text('Ingrese la cardinalidad de la matriz');
}

function mostrarEstado2() {
    $("#cuadro_tabla_A").show();
    $("#tabla_A").show();
    $('.generar-matriz-form').hide();
    $("#middot").hide();
    $("#cuadro_tabla_X").hide();
    $("#tabla_X").hide();
    $("#equals").hide();
    $("#cuadro_tabla_B").hide();
    $("#tabla_B").hide();
    $("#cuadro_vector_inicial").hide();

    $("#verificar").fadeIn();
    $("#ejecutarNormas").fadeIn();
    $("#tabla_A").fadeIn();
    $("#tabla_A").focus(); // FIXME: No toma el Focus a la matriz

    $('.subtitulo').text('Complete los valores de los coeficientes');
}

function mostrarEstado3() {
    $("#verificar").hide();
    $('.ejecutar-norma').show();
    $("#middot").show();
    $("#cuadro_tabla_X").show();
    $("#tabla_X").show();
    $("#equals").show();
    $("#cuadro_tabla_B").show();
    $("#tabla_B").show();
    $("#cuadro_vector_inicial").show();

    var alturaTablaA = document.getElementById('tabla_A').clientHeight;
    console.error(document.getElementById('tabla_A').clientHeight);
    var alturaStyle = "height:"+alturaTablaA+"px";
    var paddingStyle = "padding-top:"+alturaTablaA/3+"px";
    document.getElementById('middot').setAttribute("style", alturaStyle);
    document.getElementById('middot').setAttribute("style", paddingStyle);
    document.getElementById('equals').setAttribute("style", alturaStyle);
    document.getElementById('equals').setAttribute("style", paddingStyle);
    $('.seleccion-metodo, .ejecutar-algoritmo').fadeIn();
    $('.subtitulo').text('Complete el vector inicial, el vector de resultados y seleccione el metodo a utilizar');
}