$(document).ready(function () {

	var filas,
		matrizA, matrizB, vectorInicial,
		dataA, dataB, dataX, dataVectorInicial,
		idTablaA = "tabla_A",
		idTablaX = "tabla_X",
		idTablaB = "tabla_B",
		idVectorInicial = "vector_inicial",
		tablaNormas = "tabla_normas",
		tablaResultados = "tabla_resultados",
		idEncabezadoVectorInicial = "header_vector_inicial",
		idCuadroVectorInicial = "cuadro_vector_inicial";

	mostrarEstado1();

	$('#restart').click(function () {
		window.location.reload();
	});

	$('#filas_columnas').keyup(function (e) {
		const generarVisible = e.target.value.trim() != '';
		if (e.key == 'Enter' && generarVisible) {
			$("#generar").click();
		}
		else {
			$("#generar").toggle(generarVisible);
		}
	});

	$('#filas_columnas').keydown(function (e) {
		const generarVisible = e.target.value.trim() != ''
		if (esLetra(e.key) || e.key == ' ') {
			e.preventDefault();
			e.stopPropagation();
		}
	});

	$("#generar").click(function () {
		filas = $("#filas_columnas").val();

		if (filas == '') {
			alert("Por favor, ingrese las filas y columnas");
			return;
		}

		dataA = generarData(filas, filas);
		dataX = generarData(filas, 1);

		for (var i = 0; i < filas; i++) {
			dataX[i][0] = "X" + [i + 1];
		}

		matrizA = crearMatriz(idTablaA, dataA, false, true, math.transpose(dataX)[0]);

		mostrarEstado2();
	});

	$("#verificar").click(function () {

		if (!esValidaMatrizA(matrizA)) {
			$("#middot").hide();
			$("#cuadro_tabla_X").hide();
			$("#tabla_X").hide();
			$("#equals").hide();
			$("#cuadro_tabla_B").hide();
			$("#tabla_B").hide();
			$("#cuadro_vector_inicial").hide();
			return;
		}

		var isVisible = $("#tabla_B").is(":visible");

		if ((typeof matrizB == "undefined") || !(isVisible)) {

			crearMatriz(idTablaX, dataX, true, false, ['Xn']);

			dataB = generarData(matrizA.countRows(), 1);
			matrizB = crearMatriz(idTablaB, dataB, false, true, ['TI']);

			dataVectorInicial = generarData(1, matrizA.countRows());
			vectorInicial = crearMatriz(idVectorInicial, dataVectorInicial, false, true, math.transpose(dataX)[0]);
		}

		mostrarEstado3();
	})

	$("#ejecutarNormas").click(function () {
		if (!esValidaMatrizA(matrizA)) {
			return;
		}
		dataNormas = generarData(3, 2);
		dataNormas[0][0] = norma1;
		dataNormas[0][1] = calcularNorma(norma1, matrizA.getData());
		dataNormas[1][0] = norma2;
		dataNormas[1][1] = calcularNorma(norma2, matrizA.getData());
		dataNormas[2][0] = normaInfinito;
		dataNormas[2][1] = calcularNorma(normaInfinito, matrizA.getData());
		HTNormas = crearMatriz(tablaNormas, dataNormas, true, false['Norma', 'Resultado']);
	})

	$("#ejecutar").click(function () {
		var metodoSeleccionado = $("#comboMetodo").val();
		var cota = $("#cotaError").val();
		var decimales = $("#cantidadDecimales").val();
		var resultados = [];
		if (sonValidosDatosIngresados(matrizA, matrizB, vectorInicial, cota, decimales)) {
			var matrizDespejada = obtenerMatrizDespejada(matrizA.getData(), matrizB.getData());
			resultados = resolverSistemaDeEcuaciones(metodoSeleccionado, dataVectorInicial[0], matrizDespejada, math.pow(10, - cota));
		}
		else {
			$('.subtitulo').text('Por favor, verifique que los datos ingresados sean válidos');
			console.error("ERROR");
		}
		var matrizParseada = parsearMatrizDeResultados(resultados, dataX, decimales);
		var arrayConstantes = math.transpose(dataX)[0];
		var filaTitulos = math.concat(['Iteracion'], arrayConstantes, ['Norma Infinito', '', 'Error']);
		crearMatriz(tablaResultados, matrizParseada, true, false, filaTitulos);
	})

	$("#ejecutar-tests").click(function () {
		ejecutarTests();
	})
});