package com.traveltr.ws.shared;

public interface Views {
	class Base{
	
	}
	
	//password için sensitive field olarak işaretleme yapıalbilir
	//ve headerda password ü de görmek istersen authcontroller sınıfında 
	//metodun üstünde sensitive olanı expose edebiliriz.
	
	class Sensitive extends Base{
		
	}
}
