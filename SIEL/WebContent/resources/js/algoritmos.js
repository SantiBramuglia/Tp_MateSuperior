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

function obtenerVectorInicialMock(){
    var data = [0, 0, 0, 0];
    return data;
}

//Calculo Norma 2
function norma2(){

	//Defino matriz A que será evaluada
	const matriz = [[1, 0, -7], [0, 2, 2], [-1, -1, 0]];
	
	console.log('***************');
    console.log('matriz');
    console.log(matriz);
    console.log('***************');
	
    //Obtener traspuesta A* de la matriz ingresada
	var matrizTraspuesta = math.transpose(matriz);
	
	console.log('***************');
    console.log('matrizTraspuesta');
    console.log(matrizTraspuesta);
    console.log('***************');
	
    //Multiplico A* por A
	var matrizMult = math.multiply(matrizTraspuesta, matriz);
	
	console.log('***************');
    console.log('matrizMult');
    console.log(matrizMult);
    console.log('***************');
    
    //Calcular valores propios (eigenvalues) de la matriz resultado 
    var valoresPropios = numeric.eig(matrizMult).lambda.x;
	
	console.log('***************');
    console.log('valoresPropios');
    console.log(valoresPropios);
    console.log('***************');
    
    //Aplicar raiz cuadrada a los valores propios
    var raizCuadradaVP = math.sqrt(valoresPropios);
    
    console.log('***************');
    console.log('raizCuadradaVP');
    console.log(raizCuadradaVP);
    console.log('***************');
    
    //Obtener el numero máximo de todos los valores obtenidos
    var maximo = math.max(raizCuadradaVP);
    
    console.log('***************');
    console.log('maximo');
    console.log(maximo);
    console.log('***************');  
    
	
}