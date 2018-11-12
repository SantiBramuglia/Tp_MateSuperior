const Jacobi = "Jacobi";
const Gauss = "Gauss-Seidel";

function resolverSistemaDeEcuaciones(metodoSeleccionado, vectorInicial, matrizDespejada, error) {
    var iteracion = 0;
    var vectorResultadoAnterior = vectorInicial.slice();
    var resultados = [];
    //var cotaError = math.pow(10,- error);
    
    do {
        iteracion++;
        if (iteracion > 500) {
            console.error('ERROR: Demasiadas iteraciones');
            break;
        }
        if (metodoSeleccionado == Jacobi) {
            vectorResultadoActual = reemplazoDeJacobi(vectorResultadoAnterior, matrizDespejada);
        } else if (metodoSeleccionado == Gauss) {
            vectorResultadoActual = reemplazoDeGauss(vectorResultadoAnterior, matrizDespejada);
        }
        norma = calcularNormaInfinito(vectorResultadoAnterior, vectorResultadoActual);

        var filaNueva = [iteracion, vectorResultadoAnterior, vectorResultadoActual, norma, error];
        resultados.push(filaNueva);

        vectorResultadoAnterior = vectorResultadoActual;
    }
    while (norma >= error);
    console.log(resultados);
    return resultados;
}

function jacobi(vectorInicial, matrizDespejada, error) {
    return resolverSistemaDeEcuaciones(Jacobi, vectorInicial, matrizDespejada, error);
}

function gauss(vectorInicial, matrizDespejada, error) {
    return resolverSistemaDeEcuaciones(Gauss, vectorInicial, matrizDespejada, error);
}

function reemplazoDeJacobi(vectorInicial, matrizDespejada) {
    var vectorResultado = [];
    vectorResultado = math.resize(vectorResultado, [1, vectorInicial.length], 0);
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
    var vectorAux = vectorInicial.slice();
    vectorResultado = math.resize(vectorResultado, [1, vectorInicial.length], 0);
    for (var i = 0; i < matrizDespejada.length; i++) {
        var fila = matrizDespejada[i];
        var acumulado = 0;
        for (var j = 0; j < vectorAux.length; j++) {
            acumulado += fila[j] * vectorAux[j];
        }
        acumulado += fila[j];
        vectorAux[i] = acumulado;
        vectorResultado[i] = vectorAux[i];
    }
    return vectorResultado;
}

function obtenerMatrizDespejada(matrizA, matrizB) {
    var matriz = unificarMatriz(matrizA, matrizB);
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

function obtenerMatrizDiferencia(vectorInicial, vectorResultado) {
    return math.matrix([math.subtract(vectorResultado, vectorInicial)]);
}
