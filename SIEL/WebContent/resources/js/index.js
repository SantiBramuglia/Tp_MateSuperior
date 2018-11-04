$(document).ready(function () {

	var filas,
		matrizA, matrizX, matrizB,
		dataA, dataB, dataC,
		idTablaA = "tabla_A",
		idTablaX = "tabla_X",
		idTablaB = "tabla_B";

	$("#verificar").hide();

	//Click de Generar Tabla

	$("#generar").click(function () {
		filas = $("#filas_columnas").val();

		if (filas == '') {
			alert("Por favor, ingrese las filas y columnas");
			return;
		}

		dataA = generarData(filas, filas);
		matrizA = crearMatriz(idTablaA, dataA, false, true);
		$("#verificar").show();
	});

	$("#verificar").click(function () {

		if(!esCuadrada(matrizA)){
			alert("La matriz ingresada debe ser una matriz cuadrada");
			return;
		}
		if(tieneValoresVacios(matrizA)){
			alert("Por favor, cargue todos los valores de la matriz");
			return;
		}
		if(tieneValoresInvalidos(matrizA)){
			alert("Por favor, corrija todos los valores invalidos");
			return;
		}
		if(!esDiagonalmenteDominante(matrizA)){
			alert("La matriz ingresada no es diagonalmente dominante");
			return;
		}

		dataX = generarData(matrizA.countRows(), 1);
		//Si conozco que valores voy a cargar en la matriz, antes de crear la tabla, los seteo de esta forma
		for (var i = 0; i < matrizA.countRows(); i++) {
			dataX[i][0] = "X" + [i + 1];
		}
		matrizX = crearMatriz(idTablaX, dataX, true, false);

		//en caso de tener que modificar los datos de una tabla ya renderizada, sobreescribo su data, y vuelvo a renderizar la matriz
		//dataX[0][0] = "Prueba";
		//matrizX.render();

		dataB = generarData(matrizA.countRows(), 1);
		matrizB = crearMatriz(idTablaB, dataB, false, true);
	})

	function crearMatriz(idTabla, data, readOnly, esNumerica) {

		var container = document.getElementById(idTabla);
		container.innerHTML = "";

		var validador = 'ninguno';
		if(esNumerica){
			validador = 'numeric';
		}

		var matriz = new Handsontable(container, {
			data: data,
			validator: validador,
			rowHeaders: false,
			colHeaders: false,
			filters: false,
			dropdownMenu: false,
			readOnly: readOnly
		});

		return matriz;
	};

	function generarData(filas, columnas) {
		var arr = [];
		for (var i = 0; i < filas; i++) {
			arr.push([]);
			arr[i].push(new Array(filas));
			for (var j = 0; j < columnas; j++) {
				arr[i][j] = "";
			}
		}
		return arr;
	}

	function tieneValoresVacios(matriz) {
		return matriz.getData().some(function (array) {
			return array.includes("") || array.includes(null);
		});
	};

	function esEntero(currentValue) {
		return !isNaN(currentValue);
	};

	function tieneValoresInvalidos(matriz) {
		var todosSonEnteros = matriz.getData().every(function (array) {
			return array.every(esEntero);
		});
		return !todosSonEnteros;
	}

	function esCuadrada(matriz){
		return matriz.countRows() == matriz.countCols();
	}

	function esDiagonalmenteDominante(matriz) {
		filas = matriz.countRows();

		for (var i = 0; i < filas; i++) {
			var acum = 0;
			var diagonal = 0;
			for (var j = 0; j < filas; j++) {
				if (i == j) {
					diagonal = parseInt(matriz.getDataAtCell(i, j));
				} else {
					acum += parseInt(matriz.getDataAtCell(i, j));
				}
			}
			if (acum > diagonal) {
				return false;
			}
		}
		return true;
	}
})






