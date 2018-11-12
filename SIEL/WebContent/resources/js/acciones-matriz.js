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