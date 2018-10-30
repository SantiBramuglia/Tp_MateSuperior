$(document).ready(function(){
	
//Mensaje de filas y columnas ingresados y evento click
	
	$("#generar").click(function(){
		var filas=$("#filas").val();
		var columnas=$("#columnas").val();
		alert("Se va a generar una matriz de:\n"+filas+" filas \n"+columnas+" columnas");
		crear_tabla(filas,columnas);
	});
	
//Función para crear tabla
	
	function crear_tabla(filas, columnas){
		
		var table = "";
		
		for(var i=0; i<filas; i++){
			
			table += "<tr id='fila_'"+i+"''>";
			
			for(var j=0; j<columnas; j++){
				
				table+="<td id='col_'"+j+"'>";
				table+="<input type='text' />";
				table+="</td>";
			}
			
			table+="</tr>";
		}
		
		$("#tabla_A_body").html(table);
	};
	
})






