function gauss(iteraciones){
    var vectorInicial = obtenerVectorInicialMock();
    var iteracion = 0;
    for(var i = 0; i < iteraciones; i++){
        iteracion++;
        console.log('iteracion '+iteracion);
        vectorInicial = reemplazoDeGauss(vectorInicial);
    }
    console.log('Vector Resultado');
    console.log(vectorInicial);
    console.log('***************');
}

function jacobi(iteraciones){
    var vectorInicial = obtenerVectorInicialMock();
    var iteracion = 0;
    for(var i = 0; i < iteraciones; i++){
        iteracion++;
        console.log('iteracion '+iteracion);
        vectorInicial = reemplazoDeJacobi(vectorInicial);
    }
    console.log('Vector Resultado');
    console.log(vectorInicial);
    console.log('***************');
}

function reemplazoDeJacobi(vectorInicial){
    var matrizDespejada = obtenerMatrizDespejadaMock();
    var vectorResultado = [];
    vectorResultado = math.resize(vectorResultado, [1, vectorInicial.length], 0);

    console.log('***************');
    console.log('vectorInicial');
    console.log(vectorInicial);
    console.log('***************');

    for (var i = 0; i < matrizDespejada.length; i++) {
        var fila = matrizDespejada[i];
        var acumulado = 0;
        for (var j = 0; j < vectorInicial.length; j++) {
            acumulado += fila[j]*vectorInicial[j];
        }
        acumulado += fila[j];
        vectorResultado[i] = acumulado;
    }
    return vectorResultado;
}

function reemplazoDeGauss(vectorInicial){
    var matrizDespejada = obtenerMatrizDespejadaMock();
    var vectorResultado = [];
    vectorResultado = math.resize(vectorResultado, [1, vectorInicial.length], 0);

    console.log('***************');
    console.log('vectorInicial');
    console.log(vectorInicial);
    console.log('***************');

    for (var i = 0; i < matrizDespejada.length; i++) {
        var fila = matrizDespejada[i];
        var acumulado = 0;
        for (var j = 0; j < vectorInicial.length; j++) {
            acumulado += fila[j]*vectorInicial[j];
        }
        acumulado += fila[j];
        vectorInicial[i] = acumulado;
        vectorResultado[i] = vectorInicial[i];
    }
    return vectorResultado;
}

function obtenerMatrizDespejadaMock(){
    var data = [
        [0,     0.1,    -0.2,   0,      3/5],
        [1/11,  0,      1/11,   -3/11,  25/11],
        [-1/5,  1/10,   0,      1/10,   -11/10],
        [0,     -3/8,   1/8,    0,      15/8]
    ];     
    return data;
}

function obtenerMatrizDespejada(matriz){
    var matrizDespejada = [];
    for (var i = 0; i < matriz.length; i++) {
        var fila = matriz[i];
        var valorDiagonal = fila[i];
        var filaDespejada = new Array(fila.length).fill(0,0);

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

function obtenerVectorInicialMock(){
    var data = [0, 0, 0, 0];
    return data;
}