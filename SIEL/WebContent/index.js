$(document).ready(function(){
	
//Mensaje de filas y columnas ingresados
	
	$("#generar").click(function(){
		var filas=$("#filas").val();
		var columnas=$("#columnas").val();
		alert("Se va a generar una matriz de:\n"+filas+" filas \n"+columnas+" columnas");
		crear_tabla(filas,columnas);
	});
	
//Función para crear tabla
	
	function crear_tabla(filas, columnas){
		
		for(var i=1; i<=filas; i++){
			
			$("#tabla_A_body").append("<tr id='fila_"+i+"'>");
			
			for(var j=1; j<=columnas; j++){
				
				$("#fila_"+i).append("<td id='columna_"+j+"'>");
				$("#columna"+j).append("<input type='text' id='col_input "+i+j+"'>"); 
				$("#fila_"+i).append("</td>");
			}
			
			$("#tabla_A_body").append("</tr>");
		}
	};
	
})






