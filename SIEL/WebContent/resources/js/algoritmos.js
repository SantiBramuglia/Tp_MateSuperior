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

function obtenerMatrizDespejadaMock(){
    var data = [
        [0,     0.1,    -0.2,   0,      3/5],
        [1/11,  0,      1/11,   -3/11,  25/11],
        [-1/5,  1/10,   0,      1/10,   -11/10],
        [0,     -3/8,   1/8,    0,      15/8]
    ];     
    return data;
}

function obtenerVectorInicialMock(){
    var data = [0, 0, 0, 0];
    return data;
}