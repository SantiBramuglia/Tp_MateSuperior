function sonValidosDatosIngresados(matrizA, matrizB, vectorInicial, cota, decimales){
    if(!esValidaMatrizA(matrizA)){
        return false;
    }
    if(!esValidaMatrizB(matrizB)){
        return false;
    }
    if(!esValidoVectorInicial(vectorInicial)){
        return false;
    }
    if(!esEntero(cota)){
        alert("Por favor, ingrese un valor entero positivo en la cota de errores");
        return false;
    }
    if (esNulo(cota)) {
        alert("Por favor, especifique la cota de errores");
        return false;
    }
    if(!esEntero(decimales)){
        alert("Por favor, ingrese un valor entero positivo en la cantidad de decimales");
        return false;
    }
    if (esNulo(decimales)) {
        alert("Por favor, especifique los decimales");
        return false;
    }
    return true;
}

function esValidaMatrizA(matriz) {
    if (!esCuadrada(matriz)) {
        alert("La Matriz A ingresada debe ser una matriz cuadrada");
        return false;
    }
    if (tieneValoresVacios(matriz)) {
        alert("Por favor, cargue todos los valores de la Matriz A");
        return false;
    }
    if (tieneValoresInvalidos(matriz)) {
        alert("Por favor, corrija todos los valores invalidos de la Matriz A");
        return false;
    }
    if (!esDiagonalmenteDominante(matriz)) {
        alert("La Matriz A ingresada no es diagonalmente dominante");
        return false;
    }
    return true;
}

function esValidaMatrizB(matriz){
    if (tieneValoresVacios(matriz)) {
        alert("Por favor, cargue todos los valores de la Matriz B");
        return false;
    }
    if (tieneValoresInvalidos(matriz)) {
        alert("Por favor, corrija todos los valores invalidos de la Matriz B");
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

function esLetra(key){
    return /^[A-Za-z]$/.test(key);
}

function esNumero(currentValue) {
    return !isNaN(currentValue);
};

function esEntero(valor){
    return esNumero(valor) && (valor % 1 == 0);
}

function esNulo(numero){
    return numero == '' || numero == null || numero == undefined
}

function tieneValoresInvalidos(matriz) {
    var todosSonNumeros = matriz.getData().every(function (array) {
        return array.every(esNumero);
    });
    return !todosSonNumeros;
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