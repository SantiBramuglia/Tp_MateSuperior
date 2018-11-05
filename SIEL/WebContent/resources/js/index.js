$(document).ready(function () {

	var filas,
		matrizA, matrizX, matrizB,
		dataA, dataB, dataC,
		idTablaA = "tabla_A",
		idTablaX = "tabla_X",
		idTablaB = "tabla_B";

	$("#verificar").hide();

	function crear_grilla(idTabla, data, readOnly, numeros) {

		var container = document.getElementById(idTabla);
		container.innerHTML = "";
		
		var config = {
				data: data,
				rowHeaders: false,
				colHeaders: false,
				filters: false,
				dropdownMenu: false,
				readOnly: readOnly
			};
		
		if (numeros) {
			config.validator= 'numeric';
		}
		
		if (idTabla=="tabla_A"){
			config.beforeChange= mostrar_verificar;
		}

		var matriz = new Handsontable(container, config);

		return matriz;
	};

	function generar_matriz(filas, columnas) {

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

	//Función para ver que la matriz tenga todos los datos cargados

	function con_datos() {

		var hayVacios = matrizA.getData().some(function (array) {
			return array.includes("");
		});
		if (hayVacios) {
			alert("Por favor, cargue todos los valores de la matriz");
		};
		return !hayVacios;
	};

	function esEntero(currentValue) {
		return !isNaN(currentValue);
	};

	function con_datos_validos() {

		var todosSonEnteros = matrizA.getData().every(function (array) {
			return array.every(esEntero);
		});
		if (!todosSonEnteros) {
			alert("Por favor, corrija todos los valores invalidos");
		};
		return todosSonEnteros;
	}

	function diagonalmente_dominante() {

		filas = matrizA.countRows();

		for (var i = 0; i < filas; i++) {

			var acum = 0;
			var diagonal = 0;

			for (var j = 0; j < filas; j++) {

				if (i == j) {
					diagonal = parseInt(matrizA.getDataAtCell(i, j));
				} else {
					acum += parseInt(matrizA.getDataAtCell(i, j));
				}
			}

			if (acum > diagonal) {
				alert("La matriz ingresada no es diagonalmente dominante");
				return false;
			}
		}

		return true;
	}

//Función para ocultar el botón Verificar
	
	function ocultar_verificar(){
		$("#verificar").hide();
		return;
	}

//Función para mostrar el botón Verificar
	
	function mostrar_verificar(){
		$("#verificar").show();
		return;
	}
	
	//Click de Generar Tabla

	$("#generar").click(function () {
		
		filas = $("#filas_columnas").val();
		if (filas == '') {
			alert("Por favor, ingrese las filas y columnas");
		} else {
			dataA = generar_matriz(filas, filas);
			matrizA = crear_grilla(idTablaA, dataA, false, true);
			$("#verificar").show();
			$("#tabla_X").hide();
			$("#tabla_B").hide();
		}
	});

	//Me fijo que la matriz esté completamente cargada y sea diagonalmente dominante

	$("#verificar").click(function () {

		if (con_datos() && con_datos_validos()) {

			if (diagonalmente_dominante()) {
								
				dataX = generar_matriz(matrizA.countRows(), 1);
				//Si conozco que valores voy a cargar en la matriz, antes de crear la tabla, los seteo de esta forma
				for (var i = 0; i < matrizA.countRows(); i++) {
					dataX[i][0] = "X" + [i + 1];
				}
				matrizX = crear_grilla(idTablaX, dataX, true, false);

				//en caso de tener que modificar los datos de una tabla ya renderizada, sobreescribo su data, y vuelvo a renderizar la matriz
				//dataX[0][0] = "Prueba";
				//matrizX.render();

				dataB = generar_matriz(matrizA.countRows(), 1);
				matrizB = crear_grilla(idTablaB, dataB, false, true);
				
				ocultar_verificar();
				$("#tabla_X").show();
				$("#tabla_B").show();
			}
		}
	})
})






