function ejecutarTests(){
    var resultadoMatrizDespejada = testObtenerMatrizDespejada();
    var resultadoJacobi = testJacobi();
    var resultadoGauss = testGauss();

    console.info('--Inicio de ejecución de tests--');
    console.log('testObtenerMatrizDespejada: ');
    imprmirSegunEstado(resultadoMatrizDespejada);
    console.log('---');
    console.log('testJacobi: ');
    imprmirSegunEstado(resultadoJacobi);
    console.log('---');
    console.log('testGauss: ');
    imprmirSegunEstado(resultadoGauss);
    console.info('--Fin de ejecución de tests--');
}

function imprmirSegunEstado(valor){
    if(valor){
        console.log('OK');
    }
    else{
        console.error('ERROR');
    }
}

function testObtenerMatrizDespejada(){
    var matrizA = _obtenerMatrizAMock();
    var matrizC = _obtenerMatrizCMock();
    var matrizUnificada = unificarMatriz(matrizA, matrizC);
    var matrizDespejada = obtenerMatrizDespejada(matrizUnificada);

    return matrizDespejada.equals(_obtenerMatrizDespejadaMock());
}

function testJacobi(){
    var iteraciones = 10;
    var vectorInicial = _obtenerVectorInicialMock();
    var matrizDespejada = _obtenerMatrizDespejadaMock();
    var vectorResultado = jacobi(vectorInicial, matrizDespejada, iteraciones);

    return vectorResultado.equals(_obtenerResultadoJacobiMock());
}

function testGauss(){
    var iteraciones = 5;
    var vectorInicial = _obtenerVectorInicialMock();
    var matrizDespejada = _obtenerMatrizDespejadaMock();
    var vectorResultado = gauss(vectorInicial, matrizDespejada, iteraciones);

    return vectorResultado.equals(_obtenerResultadoGaussMock());
}

/********* Valores hardcodeados para la ejecucion de tests **********/

function _obtenerMatrizDespejadaMock(){
    var data = [[0,     0.1,    -0.2,   0,      3/5],
        [1/11,  0,      1/11,   -3/11,  25/11],
        [-1/5,  1/10,   0,      1/10,   -11/10],
        [0,     -3/8,   1/8,    0,      15/8]];     
    return data;
}

function _obtenerMatrizAMock(){
    var data = [
        [10,    -1,     2,      0],
        [-1,    11,     -1,     3],
        [2,     -1,     10,     -1],
        [0,     3,      -1,     8]
    ];     
    return data;
}

function _obtenerMatrizCMock(){
    var data = [
        [6],
        [25],
        [-11],
        [15]
    ];     
    return data;
}

function _obtenerVectorInicialMock(){
    var data = [0, 0, 0, 0];
    return data;
}

function _obtenerResultadoGaussMock(){
    var data = [1.0000912802859947, 2.000021342246459, -1.0000311471834449, 0.9999881032596473];
    return data;
}

function _obtenerResultadoJacobiMock(){
    var data = [1.0001185986914152, 1.9997679470100358, -0.9998281428744763, 0.9997859784600499];
    return data;
}

/********* Definicion de equals para comparar arrays **********/

// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});