$(document).ready(function () {

	var filas,
		matrizA, matrizX, matrizB,
		dataA, dataB, dataC,
		idTablaA = "tabla_A",
		idTablaX = "tabla_X",
		idTablaB = "tabla_B";

	$("#verificar").hide();

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
	});

	$("#verificar").click(function () {

		if (!esValidaMatrizA) {
			$("#tabla_X").hide();
			$("#tabla_B").hide();
			return;
		}

		var isVisible = $("#tabla_B").is(":visible");

		if ((typeof matrizB == "undefined") || !(isVisible)) {

			dataX = generarData(matrizA.countRows(), 1);

			for (var i = 0; i < matrizA.countRows(); i++) {
				dataX[i][0] = "X" + [i + 1];
			}
			matrizX = crearMatriz(idTablaX, dataX, true, false);

			dataB = generarData(matrizA.countRows(), 1);
			matrizB = crearMatriz(idTablaB, dataB, false, true);
		}

		$("#verificar").hide();
		$("#tabla_X").show();
		$("#tabla_B").show();
	})
})