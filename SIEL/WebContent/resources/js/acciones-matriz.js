function crearMatriz(idTabla, data, readOnly, esNumerica) {

    var container = document.getElementById(idTabla);
    container.innerHTML = "";

    var config = {
        data: data,
        rowHeaders: false,
        colHeaders: false,
        filters: false,
        dropdownMenu: false,
        readOnly: readOnly
    };

    if (esNumerica) {
        config.validator = 'numeric';
    }
    if (idTabla == "tabla_A") {
        config.beforeChange = $("#verificar").show();
    }

    var matriz = new Handsontable(container, config);

    return matriz;
};

function generarData(filas, columnas) {
    var data = [];
    data = math.resize(data, [parseInt(filas), parseInt(columnas)], "");
    return data;
}

function unificarMatriz(matrizA, matrizC) {
    return math.concat(matrizA, matrizC);
}

function parsearMatrizDeResultados(matrizResultados, dataX, decimales){
    var matrizParseada = [];
    var arrayConstantes = math.transpose(dataX)[0];
    var filaTitulos = math.concat(['iteracion'], arrayConstantes, ['Norma Infinito', 'Error']);
    matrizParseada.push(filaTitulos);
    for (var i = 0; i < matrizResultados.length; i++) {
        var fila = matrizResultados[i];
        var filaParseada = math.concat([fila[0]], fila[2], [fila[3], fila[4]]);
        filaParseada = math.round(filaParseada, decimales);
        matrizParseada.push(filaParseada);
    }
    return matrizParseada;
}