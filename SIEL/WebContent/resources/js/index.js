$(document).ready(function () {

	var filas,
		matrizA, matrizB, vectorInicial,
		dataA, dataB, dataVectorInicial
		idTablaA = "tabla_A",
		idTablaX = "tabla_X",
		idTablaB = "tabla_B",
		idVectorInicial = "vector_inicial",
		tablaNormas = "tabla_normas",
		tablaResultados = "tabla_resultados",
		idEncabezadoVectorInicial = "header_vector_inicial"
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
		matrizA = crearMatriz(idTablaA, dataA, false, true);

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

			var dataX = generarData(matrizA.countRows(), 1);

			for (var i = 0; i < matrizA.countRows(); i++) {
				dataX[i][0] = "X" + [i + 1];
			}
			crearMatriz(idTablaX, dataX, true, false);

			dataB = generarData(matrizA.countRows(), 1);
			matrizB = crearMatriz(idTablaB, dataB, false, true);

			dataVectorInicial = generarData(1, matrizA.countRows());
			vectorInicial = crearMatriz(idVectorInicial, dataVectorInicial, false, true);
			crearMatriz(idEncabezadoVectorInicial, math.transpose(dataX), true, false);
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
		HTNormas = crearMatriz(tablaNormas, dataNormas, true, false);
	})

	$("#calcularNorma").click(function () {
		var normaSeleccionada = $("#comboNorma").val();
		if (normaSeleccionada == norma1) {

			$("#norma").show();
			$("#norma1").show();
			$("#norma2").hide();
			$("#normaInfinito").hide();
			$("#norma").val(calcularNorma(normaSeleccionada, matrizA.getData()));

		} else if (normaSeleccionada == normaInfinito) {

			$("#norma").show();
			$("#normaInfinito").show();
			$("#norma1").hide();
			$("#norma2").hide();
			$("#norma").val(calcularNorma(normaSeleccionada, matrizA.getData()));

		} else if (normaSeleccionada == norma2) {

			$("#norma").show();
			$("#norma2").show();
			$("#normaInfinito").hide();
			$("#norma1").hide();
			$("#norma").val(calcularNorma(normaSeleccionada, matrizA.getData()));
		}

		else {

			$("#norma").val("");
			$("#norma").hide();
			$("#norma1").hide();
			$("#norma2").hide();
			$("#normaInfinito").hide();
			alert("Seleccione una norma");
		}
	})

	$("#ejecutar").click(function () {
		var metodoSeleccionado = $("#comboMetodo").val();
		var cota = $("#cotaError").val();
		var decimales = $("#cantidadDecimales").val();
		var resultados = [];
		if (sonValidosDatosIngresados(matrizA, matrizB, vectorInicial, cota, decimales)) {
			var matrizDespejada = obtenerMatrizDespejada(matrizA.getData(), matrizB.getData());
			resultados = resolverSistemaDeEcuaciones(metodoSeleccionado, dataVectorInicial[0], matrizDespejada, math.pow(10,- cota));
		}
		else {
			$('.subtitulo').text('Por favor, verifique que los datos ingresados sean válidos');
			console.error("ERROR");
		}
		crearMatriz(tablaResultados, resultados, true, false);
	})

	$("#ejecutar-tests").click(function () {
		ejecutarTests();
	})
});

function mostrarEstado1() {
	$("#norma1").hide();
	$("#norma2").hide();
	$("#normaInfinito").hide();
	$("#norma").hide();

	$("#verificar").hide();
	$("#ejecutarNormas").hide();

	$("#cuadro_vector_inicial").hide();

	$('.seleccion-metodo').hide();
	$('.ejecutar-algoritmo').hide();
	//    $('.ejecutar-norma').hide();
	$('#generar').hide();
	$("#tabla_A").hide();
	$("#cuadro_tabla_A").hide();
	$("#tabla_B").hide();
	$("#equals").hide();
	$("#cuadro_tabla_B").hide();
	$("#tabla_X").hide();
	$("#middot").hide();
	$("#cuadro_tabla_X").hide();

	$('#filas_columnas').focus();
	$('.subtitulo').text('Ingrese la cardinalidad de la matriz');
}

function mostrarEstado2() {
	$("#cuadro_tabla_A").show();
	$("#tabla_A").show();
	$('.generar-matriz-form').hide();
	$("#middot").hide();
	$("#cuadro_tabla_X").hide();
	$("#tabla_X").hide();
	$("#equals").hide();
	$("#cuadro_tabla_B").hide();
	$("#tabla_B").hide();
	$("#cuadro_vector_inicial").hide();

	$("#verificar").fadeIn();
	$("#ejecutarNormas").fadeIn();
	$("#tabla_A").fadeIn();
	$("#tabla_A").focus(); // FIXME: No toma el Focus a la matriz

	$('.subtitulo').text('Complete los valores de los coeficientes');
}

function mostrarEstado3() {
	$("#verificar").hide();
	$('.ejecutar-norma').show();
	$("#middot").show();
	$("#cuadro_tabla_X").show();
	$("#tabla_X").show();
	$("#equals").show();
	$("#cuadro_tabla_B").show();
	$("#tabla_B").show();
	$("#cuadro_vector_inicial").show();

	$('.seleccion-metodo, .ejecutar-algoritmo').fadeIn();
	//Esta validacion esta repetida, debería quitarla de uno de los dos lados?
	$('.subtitulo').text('Complete el vector inicial, el vector de resultados y seleccione el metodo a utilizar');

}