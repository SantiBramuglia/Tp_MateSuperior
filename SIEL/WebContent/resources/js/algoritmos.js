function jacobi(){
    var matrizDespejada = obtenerMatrizDespejadaMock();
    var vectorInicial = obtenerVectorInicialMock();
    var iteraciones = 10;

    console.log('***************');
    console.log('matrizDespejada');
    console.log(matrizDespejada);
    console.log('vectorInicial');
    console.log(vectorInicial);
    console.log('iteraciones');
    console.log(iteraciones);
    console.log('***************');



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
    var data = [
        [3/5,     25/11,    -11/10,   15/8]
    ];     
    return data;
}