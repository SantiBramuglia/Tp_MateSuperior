$(document).ready(function () {

	$("#verificar").hide();
	const hot = "";

	function crear_grilla(filas, columnas, idTabla, readOnly) {

		var container = document.getElementById(idTabla);
		container.innerHTML = "";

		this.hot = new Handsontable(container, {
			data: generar_matriz(filas, columnas),
			validator: 'numeric',
			rowHeaders: false,
			colHeaders: false,
			filters: false,
			dropdownMenu: false,
			readOnly: readOnly
		});
	};

	function generar_matriz(filas, columnas) {

		var arr = [];
		for (var i = 0; i < filas; i++) {
			arr.push([]);
			arr[i].push(new Array(columnas));
			for (var j = 0; j < columnas; j++) {
				arr[i][j] = "";
			}
		}
		return arr;
	}

	//Función para ver que la matriz tenga todos los datos cargados

	function con_datos() {

		var matriz = this.hot.getData();
		var hayVacios = matriz.some(function (array) {
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

		var matriz = this.hot.getData();
		var todosSonEnteros = matriz.every(function (array) {
			return array.every(esEntero);
		});
		if (!todosSonEnteros) {
			alert("Por favor, corrija todos los valores invalidos");
		};
		return todosSonEnteros;
	}

	function diagonalmente_dominante() {

		var filas = $("#filas").val();
		var columnas = $("#columnas").val();

		for (var i = 0; i < filas; i++) {

			var acum = 0;
			var diagonal = 0;

			for (var j = 0; j < columnas; j++) {

				if (i == j) {
					diagonal = parseInt(this.hot.getDataAtCell(i, j));
				} else {
					acum += parseInt(this.hot.getDataAtCell(i, j));
				}
			}

			if (acum > diagonal) {
				alert("La matriz ingresada no es diagonalmente dominante");
				return false;
			}
		}
	}

	//Click de Generar Tabla

	$("#generar").click(function () {
		var filas = $("#filas").val();
		var columnas = $("#columnas").val();
		//alert("Se va a generar una matriz de:\n"+filas+" filas \n"+columnas+" columnas");

		if (filas == '' || columnas == '') {
			alert("Por favor, ingrese tanto filas como columnas");
		} else {
			crear_grilla(filas, filas, "tabla_A", false);
			//crear_tabla(filas,columnas,"tabla_A",false);
			//crear_tabla(columnas,1,"tabla_X",true);
			//crear_tabla(filas,1,"tabla_B",false);
			$("#verificar").show();
		}
	});

	//Click de Verificar

	//Me fijo que la matriz esté completamente cargada y sea diagonalmente dominante

	$("#verificar").click(function () {

		con_datos();
		con_datos_validos();
		diagonalmente_dominante();
	})
})






