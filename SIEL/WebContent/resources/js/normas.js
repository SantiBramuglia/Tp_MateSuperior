const norma1 = 'Norma 1';
const norma2 = 'Norma 2';
const normaInfinito = 'Norma infinito';

function calcularNorma(nombreNorma, vectorInicial, vectorResultado){
	var matriz = obtenerMatrizDiferencia(vectorInicial, vectorResultado);

	if(nombreNorma == norma1){
		return _norma1(matriz);
	}
	else if(nombreNorma == norma2){
		return _norma2(matriz);
	}
	else if(nombreNorma == normaInfinito){
		return _normaInfinito(matriz);
	}
}

function _norma1(matriz){

	filas = matriz.size()[0];
	var max=0;

	for(var j = 0; j<filas; j++){

		var acum = 0;

	    for (var i = 0; i < filas; i++) {

	        var valorActual = 0;

	        for (var j1 = 0; j1 < filas; j1++) {

	            valorActual = math.abs(matriz.get([i, j]));

	            if (j1 == j) {

	            	acum += valorActual;

	            }
	        }
	    }

	    if (acum > max){
	    	max = acum;
	    }


	}
	return max;
}

function _normaInfinito(matriz){

	filas = matriz.size()[0];
	var max=0;

	for(var j = 0; j<filas; j++){

		var acum = 0;

	    for (var i = 0; i < filas; i++) {

	        var valorActual = 0;

	        for (var j1 = 0; j1 < filas; j1++) {

	            valorActual = math.abs(matriz.get([j, i]));

	            if (j1 == j) {

	            	acum += valorActual;

	            }
	        }
	    }

	    if (acum > max){
	    	max = acum;
	    }


	}
	return max;
}

function _norma2(matriz){

	var max = 0;

    //Obtener traspuesta A* de la matriz ingresada
	var matrizTraspuesta = math.transpose(matriz);

    //Multiplico A* por A
	var matrizMult = math.multiply(matrizTraspuesta, matriz);

    //Calcular valores propios (eigenvalues) de la matriz resultado 
    var valoresPropios = numeric.eig(matrizMult).lambda.x;

    //Aplicar raiz cuadrada a los valores propios
    var raizCuadradaVP = math.sqrt(valoresPropios);

    //Obtener el numero máximo de todos los valores obtenidos
    max = math.max(raizCuadradaVP);

    return max;
}