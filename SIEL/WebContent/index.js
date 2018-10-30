$(document).ready(function(){
	
//Oculto botón verificar
	
	$("#verificar").hide();
	
//Función para crear tabla A
	
	function crear_tabla(filas, columnas, idTabla, readOnly){
		
		var tabla = "";
		
		for(var i=0; i<filas; i++){
			
			tabla += "<tr id='fila_'"+i+"''>";
			
			for(var j=0; j<columnas; j++){
				
				tabla+="<td id='col_'"+j+"'>";
				tabla+="<input type='number' id='"+(i)+(j)+"'";
				if(readOnly){
					tabla+=" readonly";
				}
				tabla+= "/>";
				tabla+="</td>";
			}
			
			tabla+="</tr>";
		}
		
		$("#"+idTabla).html(tabla);
	};
	
//Función para ver que la matriz tenga todos los datos cargados
	
	function con_datos(){
		
		$("#tabla_A input").each(function(){
			if($(this).val() == ''){
				alert("Por favor, cargue todos los valores de la matriz");
				//$(this).focus();
				return false;
			}else{
				return true;
			}
				
		});
	}
	
//Me fijo que la matriz sea diagonalmente dominante
	
	function diagonalmente_dominante(){
		
		var filas=$("#filas").val();
		var columnas=$("#columnas").val();
		
		for(var i=0;i<filas;i++){
			
			var acum=0;
			var diagonal=0;
			
			for(var j=0;j<columnas;j++){
				
				
				if(i==j){
					
					diagonal = parseInt($("#"+(i)+(j)).val());
				}else{
					
					acum += parseInt($("#"+(i)+(j)).val());
				}
			}
			
			
			if(acum>diagonal){
				
				alert("La matriz ingresada no es diagonalmente dominante");
				return false;
			}
		}
	}
	
//Click de Generar Tabla
	
	$("#generar").click(function(){
		var filas=$("#filas").val();
		var columnas=$("#columnas").val();
		//alert("Se va a generar una matriz de:\n"+filas+" filas \n"+columnas+" columnas");
		
		if(filas=='' || columnas==''){
			alert("Por favor, ingrese tanto filas como columnas");
		}else{
			crear_tabla(filas,columnas,"tabla_A",false);
			//crear_tabla(columnas,1,"tabla_X",true);
			//crear_tabla(filas,1,"tabla_B",false);
			$("#verificar").show();
		}
	});
	
//Click de Verificar
	
//Me fijo que la matriz esté completamente cargada y sea diagonalmente dominante
	
	$("#verificar").click(function(){
		
		con_datos();
		diagonalmente_dominante();
		
	})
			
	
})






