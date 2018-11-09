function norma1(matriz){
	
	filas = matriz.countRows();
	var max=0;
	
	for(var j = 0; j<filas; j++){
		
		var acum = 0;
		
	    for (var i = 0; i < filas; i++) {
	    	
	        var valorActual = 0;
	        
	        for (var j1 = 0; j1 < filas; j1++) {
	        	
	            valorActual = math.abs(parseInt(matriz.getDataAtCell(i, j)));
	            
	            if (j1 == j) {
	            	
	            	acum += valorActual;
	             
	            }
	        }
	    }
	    
	    if (acum > max){
	    	max = acum;
	    }
	    
	    
	}
	return max;
}

function normaInfinito(matriz){
	
	filas = matriz.countRows();
	var max=0;
	
	for(var j = 0; j<filas; j++){
		
		var acum = 0;
		
	    for (var i = 0; i < filas; i++) {
	    	
	        var valorActual = 0;
	        
	        for (var j1 = 0; j1 < filas; j1++) {
	        	
	            valorActual = math.abs(parseInt(matriz.getDataAtCell(j, i)));
	            
	            if (j1 == j) {
	            	
	            	acum += valorActual;
	             
	            }
	        }
	    }
	    
	    if (acum > max){
	    	max = acum;
	    }
	    
	    
	}
	return max;
}