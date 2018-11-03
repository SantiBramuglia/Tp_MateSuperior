$(document).ready(function () {

	var filas,
		matrizA,
		matrizX,
		matrizB,
		idTablaA = "tabla_A",
		idTablaX = "tabla_X",
		idTablaB = "tabla_B";
	
	$("#verificar").hide();

	function crear_grilla(filas, columnas, idTabla, readOnly, numeros) {

		var container = document.getElementById(idTabla);
		container.innerHTML = "";

		var matriz = new Handsontable(container, {
			data: generar_matriz(filas, columnas),
		//	validator: 'numeric',
			rowHeaders: false,
			colHeaders: false,
			filters: false,
			dropdownMenu: false,
			readOnly: readOnly
		});
		
		if(numeros){
			validator:'numeric'
		}
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

	//Click de Generar Tabla

	$("#generar").click(function () {
		filas = matrizA.countRows();

		if (filas == '') {
			alert("Por favor, ingrese las filas y columnas");
		} else {
			matrizA = crear_grilla(filas, filas, idTablaA, false, true);
			$("#verificar").show();
		}
	});

	//Me fijo que la matriz esté completamente cargada y sea diagonalmente dominante

	$("#verificar").click(function () {

		if(con_datos() && con_datos_validos()){

			if(diagonalmente_dominante()){

				matrizX = crear_grilla(filas, 1, idTablaX, true, false);
				matrizB = crear_grilla(filas, 1, idTablaB, false, true);
				
			}
		}
		
		
	})
})






