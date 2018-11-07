function tieneValoresVacios(matriz) {
    return matriz.getData().some(function (array) {
        return array.includes("") || array.includes(null);
    });
};

function esEntero(currentValue) {
    return !isNaN(currentValue);
};

function tieneValoresInvalidos(matriz) {
    var todosSonEnteros = matriz.getData().every(function (array) {
        return array.every(esEntero);
    });
    return !todosSonEnteros;
}

function esCuadrada(matriz){
    return matriz.countRows() == matriz.countCols();
}

function esDiagonalmenteDominante(matriz) {
    filas = matriz.countRows();

    for (var i = 0; i < filas; i++) {
        var acum = 0;
        var diagonal = 0;
        var valorActual = 0;
        for (var j = 0; j < filas; j++) {
            valorActual = math.abs(parseInt(matriz.getDataAtCell(i, j)));
            if (i == j) {
                diagonal = valorActual;
            } else {
                acum += valorActual;
            }
        }
        if (acum > diagonal) {
            return false;
        }
    }
    return true;
}