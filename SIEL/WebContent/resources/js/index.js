$(document).ready(function () {

	var filas,
		matrizA, matrizB, vectorInicial,
		dataA, dataB, dataVectorInicial
	idTablaA = "tabla_A",
		idTablaX = "tabla_X",
		idTablaB = "tabla_B",
		idVectorInicial = "vector_inicial",
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

		mostrarEstado3();
	})

	$("#calcularNorma").click(function () {

		if ($("#comboNorma").val() == ("Norma 1")) {

			$("#norma").show();
			$("#norma1").show();
			$("#norma2").hide();
			$("#normaInfinito").hide();
			$("#norma").val(norma1(matrizA));

		} else if ($("#comboNorma").val() == ("Norma infinito")) {

			$("#norma").show();
			$("#normaInfinito").show();
			$("#norma1").hide();
			$("#norma2").hide();
			$("#norma").val(normaInfinito(matrizA));

		} else if ($("#comboNorma").val() == ("Norma 2")) {

			$("#norma").show();
			$("#norma2").show();
			$("#normaInfinito").hide();
			$("#norma1").hide();
			$("#norma").val(norma2(matrizA));
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
		var cota = $("#cotaError").val();
		var decimales = $("#cantidadDecimales").val();
		if (!sonValidosDatosIngresados(matrizA, matrizB, vectorInicial, cota, decimales)) {
			return;
		}
		//TODO
		//invocar a la función de ejecución del algoritmo según el que esté seleccionado
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
	$("#cuadro_vector_inicial").hide();

	$('.seleccion-metodo').hide();
	$('.ejecutar-algoritmo').hide();
	//    $('.ejecutar-norma').hide();
	$('#generar').hide();

	$('#filas_columnas').focus();
	$('.subtitulo').text('Ingrese la cardinalidad de la matriz');
}

function mostrarEstado2() {
	$("#tabla_A").hide();
	$('.generar-matriz-form').hide();
	$("#tabla_X").hide();
	$("#tabla_B").hide();
	$("#cuadro_vector_inicial").hide();

	$("#verificar").fadeIn();
	$("#tabla_A").fadeIn();
	$("#tabla_A").focus(); // FIXME: No toma el Focus a la matriz

	$('.subtitulo').text('Complete los valores de los coheficientes');
}

function mostrarEstado3() {
	$("#verificar").hide();
	$('.ejecutar-norma').show();
	$("#tabla_X").show();
	$("#tabla_B").show();
	$("#cuadro_vector_inicial").show();

	$('.seleccion-metodo, .ejecutar-algoritmo').fadeIn();
	//Esta validacion esta repetida, debería quitarla de uno de los dos lados?
	$('.subtitulo').text('Complete el vector inicial, el vector de resultados y seleccione el metodo a utilizar');

}