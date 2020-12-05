package com.traveltr.ws.user;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.traveltr.ws.error.ApiError;
import com.traveltr.ws.shared.GenericResponse;

/** Contoller sınıfı, kullanıcıyla ilgili olacak bütün http requestlerin ulaştığı ilk sınıf */

@RestController
public class UserController {
		
	//@Autowired //obje elde etmiş olacağız
	// UserRepository userRepository;  //service katmanı eklenince bunu burda kullanmamaıza gerek kalmadı

	@Autowired 
	UserService userService;
	/*
	 * Buraya bir http requestle erişilecek 
	 * ve biz de restful webservis yapmaya calısıyoruz
	 * Rest'de bir entity oluşturulacağı zaman post metodu kullanılması tavsiye edilir.
	 * Biz de springe bu hazırladığımız metodu post requestlerinin çalışacağını söylemek içi
	 * buna bir annotation ekliyoruz. @PostMapping
	 * Bunun içerisine parametre olarak dinlediğimiz url path ini vermremiz gerekiyor.
	 * Rest in bizi  yönlendirmesiyle isimlendirmeyi şöyle yapmamız tavsiye ediliyor:
	 * Kullandığınız nesne neyse key olarak onu belirleyen bunu da çoğul yazın: 
	 * path : /api/version/keyname.
	 * 
	 * @RequestBody String body => gelen requestin içindeki body i almak için kull.
	 * 
	 * @CrossOrigin, farklı bir portta çalışan clientimiz üzerinden istek almayı sağlıyor.
	 * 
	 * **/
	
	//controllera gelen request userRepository aracılığı ile db ye aktarılıyor.
	//userRepository.save(user);
			
	//ama tavsiye edilen katmanlı mimari, yani controller ile repository arasına
	//bir katman ekleyerek burdaki işleri birbirinden izole etmemizdir.
	//Bu ara katamana SERVİCE deniliyor.
	
	
	//@CrossOrigin proxy ayarı yapınca gerek kalmadı
	//@ResponseStatus(HttpStatus.CREATED) //201 OK, success yanıt döner
	
	@PostMapping("/api/1.0/users")
	public ResponseEntity<?> createUser( @RequestBody User user) {	
		
		String username = user.getUsername();
		if(username == null || username.isEmpty()) {
			
			ApiError error= new ApiError(400, "Validation Error", "/api/1.0/users");
			
			Map<String, String>	validationError = new HashMap<>();	
			validationError.put("username","Username cannot be null");	
			error.setValidationErrors(validationError);
			
			return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
		}
		
		userService.save(user);
		return ResponseEntity.ok(new GenericResponse("user created"));
		
		
	}
	
}















