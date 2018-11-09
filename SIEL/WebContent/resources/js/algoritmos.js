function jacobi(vectorInicial, matrizDespejada, iteraciones){
    var iteracion = 0;
    for(var i = 0; i < iteraciones; i++){
        iteracion++;
        //TODO cargar el resultado de cada iteracion en un array
        console.debug('iteracion '+iteracion);
        vectorInicial = reemplazoDeJacobi(vectorInicial, matrizDespejada);
    }
    return vectorInicial;
}

function gauss(vectorInicial, matrizDespejada, iteraciones){
    var iteracion = 0;
    for(var i = 0; i < iteraciones; i++){
        iteracion++;
        //TODO cargar el resultado de cada iteracion en un array
        console.debug('iteracion '+iteracion);
        vectorInicial = reemplazoDeGauss(vectorInicial, matrizDespejada);
    }
    return vectorInicial;
}

function reemplazoDeJacobi(vectorInicial, matrizDespejada){
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
            acumulado += fila[j]*vectorInicial[j];
        }
        acumulado += fila[j];
        vectorResultado[i] = acumulado;
    }
    return vectorResultado;
}

function reemplazoDeGauss(vectorInicial, matrizDespejada){
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
            acumulado += fila[j]*vectorInicial[j];
        }
        acumulado += fila[j];
        vectorInicial[i] = acumulado;
        vectorResultado[i] = vectorInicial[i];
    }
    return vectorResultado;
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