function esValidaMatrizA(matriz) {
    if (!esCuadrada(matriz)) {
        alert("La matriz ingresada debe ser una matriz cuadrada");
        return false;
    }
    if (tieneValoresVacios(matriz)) {
        alert("Por favor, cargue todos los valores de la matriz");
        return false;
    }
    if (tieneValoresInvalidos(matriz)) {
        alert("Por favor, corrija todos los valores invalidos");
        return false;
    }
    if (!esDiagonalmenteDominante(matriz)) {
        alert("La matriz ingresada no es diagonalmente dominante");
        return false;
    }
    return true;
}

function esValidoVectorInicial(vector) {
    if (tieneValoresVacios(vector)) {
        alert("Por favor, cargue todos los valores del vector inicial");
        return false;
    }
    if (tieneValoresInvalidos(vector)) {
        alert("Por favor, corrija todos los valores invalidos");
        return false;
    }
    return true;
}

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