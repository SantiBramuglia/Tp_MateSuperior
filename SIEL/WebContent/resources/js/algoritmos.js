function jacobi(vectorInicial, matrizDespejada, error, normaSeleccionada) {
    var iteracion = 0;
    var vectorResultadoAnterior = vectorInicial;

    normaSeleccionada = norma1;
    error = 0.0009;

    do{
        iteracion++;
        //TODO cargar el resultado de cada iteracion en un array
        console.debug('iteracion ' + iteracion);
        vectorResultadoActual = reemplazoDeJacobi(vectorResultadoAnterior, matrizDespejada);
        norma = calcularNorma(normaSeleccionada, vectorResultadoAnterior, vectorResultadoActual);
        //ver como recalcular la norma
        console.debug('error ' + error);
        console.debug('norma ' + norma);
        vectorResultadoAnterior = vectorResultadoActual;
        if(iteracion>1000){
            console.error('OVERFLOW');
            return null;
        }
    }
    while(!finalizarIteraciones(error, norma));
    return vectorResultadoActual;
}

function gauss(vectorInicial, matrizDespejada, iteraciones) {
    var iteracion = 0;
    for (var i = 0; i < iteraciones; i++) {
        iteracion++;
        //TODO cargar el resultado de cada iteracion en un array
        console.debug('iteracion ' + iteracion);
        vectorInicial = reemplazoDeGauss(vectorInicial, matrizDespejada);
    }
    return vectorInicial;
}

function reemplazoDeJacobi(vectorInicial, matrizDespejada) {
    var vectorResultado = [];
    vectorResultado = math.resize(vectorResultado, [1, vectorInicial.length], 0);

    console.debug('***************');
    console.debug('vectorInicial');
    console.debug(vectorInicial);
    console.debug('***************');

    for (var i = 0; i < matrizDespejada.length; i++) {
        var fila = matrizDespejada[i];
        var acumulado = 0;
        for (var j = 0; j < vectorInicial.length; j++) {
            acumulado += fila[j] * vectorInicial[j];
        }
        acumulado += fila[j];
        vectorResultado[i] = acumulado;
    }
    return vectorResultado;
}

function reemplazoDeGauss(vectorInicial, matrizDespejada) {
    var vectorResultado = [];
    vectorResultado = math.resize(vectorResultado, [1, vectorInicial.length], 0);

    console.debug('***************');
    console.debug('vectorInicial');
    console.debug(vectorInicial);
    console.debug('***************');

    for (var i = 0; i < matrizDespejada.length; i++) {
        var fila = matrizDespejada[i];
        var acumulado = 0;
        for (var j = 0; j < vectorInicial.length; j++) {
            acumulado += fila[j] * vectorInicial[j];
        }
        acumulado += fila[j];
        vectorInicial[i] = acumulado;
        vectorResultado[i] = vectorInicial[i];
    }
    return vectorResultado;
}

function finalizarIteraciones(error, norma){
    return norma < error;
}

function obtenerMatrizDespejada(matriz) {
    var matrizDespejada = [];
    for (var i = 0; i < matriz.length; i++) {
        var fila = matriz[i];
        var valorDiagonal = fila[i];
        var filaDespejada = new Array(fila.length).fill(0, 0);

        for (var j = 0; j < fila.length; j++) {
            var valor = fila[j];
            filaDespejada[j] = (-1) * (valor / valorDiagonal);
        }

        // en la diagonal deben quedar ceros
        filaDespejada[i] = 0;
        // el termino independiente mantiene el signo
        filaDespejada[fila.length - 1] = (-1) * filaDespejada[fila.length - 1];
        matrizDespejada.push(filaDespejada);
    }
    return matrizDespejada;
}

function obtenerMatrizDiferencia(vectorInicial, vectorResultado){
    return math.matrix([math.subtract(vectorResultado, vectorInicial)]);
}
