package com.traveltr.ws.shared;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor  //argüman alan bir constructor üretmesi için
public class GenericResponse {

	private String message;
	
}
