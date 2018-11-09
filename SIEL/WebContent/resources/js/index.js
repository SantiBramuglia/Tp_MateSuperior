$(document).ready(function () {

	var filas,
		matrizA, matrizB, vectorInicial,
		dataA, dataB, dataVectorInicial
	idTablaA = "tabla_A",
		idTablaX = "tabla_X",
		idTablaB = "tabla_B",
		idVectorInicial = "vector_inicial",
		idCuadroVectorInicial = "cuadro_vector_inicial";

	$("#norma1").hide();
	$("#normaInfinito").hide();
	$("#norma").hide();

	$("#verificar").hide();
	$("#cuadro_vector_inicial").hide();

	$("#generar").click(function () {
		filas = $("#filas_columnas").val();

		if (filas == '') {
			alert("Por favor, ingrese las filas y columnas");
			return;
		}

		dataA = generarData(filas, filas);
		matrizA = crearMatriz(idTablaA, dataA, false, true);
		$("#verificar").show();
		$("#tabla_X").hide();
		$("#tabla_B").hide();
		$("#cuadro_vector_inicial").hide();
	});

	$("#verificar").click(function () {

		if (!esValidaMatrizA(matrizA)) {
			$("#tabla_X").hide();
			$("#tabla_B").hide();
			$("#cuadro_vector_inicial").hide();
			return;
		}

		var isVisible = $("#tabla_B").is(":visible");

		if ((typeof matrizB == "undefined") || !(isVisible)) {

			var dataX = generarData(matrizA.countRows(), 1);

			for (var i = 0; i < matrizA.countRows(); i++) {
				dataX[i][0] = "X" + [i + 1];
			}
			crearMatriz(idTablaX, dataX, true, false);

			dataB = generarData(matrizA.countRows(), 1);
			matrizB = crearMatriz(idTablaB, dataB, false, true);

			dataVectorInicial = generarData(1, matrizA.countRows());
			vectorInicial = crearMatriz(idVectorInicial, dataVectorInicial, false, true);
		}

		//		$("#verificar").hide();
		$("#tabla_X").show();
		$("#tabla_B").show();
		$("#cuadro_vector_inicial").show();
	})

	$("#calcularNorma").click(function () {

		if ($("#comboNorma").val() == ("Norma 1")) {

			$("#norma").show();
			$("#norma1").show();
			$("#normaInfinito").hide();
			$("#norma").val(norma1(matrizA));

		} else if ($("#comboNorma").val() == ("Norma infinito")) {

			$("#norma").show();
			$("#normaInfinito").show();
			$("#norma1").hide();
			$("#norma").val(normaInfinito(matrizA));

		} else {

			$("#norma").val("");
			$("#norma").hide();
			$("#norma1").hide();
			$("#normaInfinito").hide();
			alert("Seleccione una norma");
		}
	})

	$("#ejecutar").click(function () {
		console.log('ejecutar');
		console.error('Aun no implementado');
		//TODO
		//validar que las 3 matrices, el vector inicial,
		//la cantidad de decimales, y la cota de error tengan datos
		//invocar a la función de ejecución del algoritmo según el que esté seleccionado
	})

	$("#ejecutar-tests").click(function () {
		ejecutarTests();
	})

	
	$("#ejecutar-norma2-mock").click(function () {
		console.log('ejecutar-norma2-mock');
		console.error('Aun no implementado');
		norma2();
		//TODO
		//invocar directamente al algoritmo de jacobi con valores harcodeados
	})


})