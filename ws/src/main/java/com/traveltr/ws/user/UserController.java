package com.traveltr.ws.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.annotation.JsonView;
import com.traveltr.ws.error.ApiError;
import com.traveltr.ws.shared.GenericResponse;
import com.traveltr.ws.shared.Views;

/** Contoller sınıfı, kullanıcıyla ilgili olacak bütün http requestlerin ulaştığı ilk sınıf */

@RestController
@RequestMapping("/api/1.0")
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
	
	@PostMapping("/users")
	public GenericResponse createUser(@Valid @RequestBody User user) {	
		/*
		 * 	ApiError error= new ApiError(400, "Validation Error", "/api/1.0/users");			
		Map<String, String>	validationErrors = new HashMap<>();	
		
		String username = user.getUsername();
		String displayName = user.getDisplayName();
		
		if(username == null || username.isEmpty()) {
			
			validationErrors.put("username","Username cannot be null");	
		
		}
			
		if(displayName == null || displayName.isEmpty()) {
			
			validationErrors.put("displayName","Cannot be null");	
			
		}
		
		if( validationErrors.size() > 0) {
			error.setValidationErrors(validationErrors);			
			return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
			
		}*/
		
		userService.save(user);
		return new GenericResponse("user created");
			
	}
	
	//@Valid ve @NotNull //exception  error cevabı dönecektir
	//Bu cevabı daha önceden oluşturduğumuz ApiError obejesine dönüştüreceğiz
	
	/*
	 * bu yeni metodun çalışabilmesi için springe, 
	 * @ExceptionHandler bu metodun bir exceptionhandler oldugunu bildiriyoruz
	 * ve methodargumentnotvalidexception atıldığında bu methodu çalıştır
	 * 
	 * 
	 * */
	
	
	/*
	 * @ExceptionHandler(MethodArgumentNotValidException.class)
	 * 
	 * @ResponseStatus(HttpStatus.BAD_REQUEST) //vermeseydik 200 ok dönerdi public
	 * ApiError handleValidationException(MethodArgumentNotValidException exception)
	 * {
	 * 
	 * ApiError error= new ApiError(400, "Validation Error", "/api/1.0/users");
	 * Map<String, String> validationErrors = new HashMap<>();
	 * 
	 * for(FieldError fieldError: exception.getBindingResult().getFieldErrors()) {
	 * //bindingresult dataların tutuldugu obje //getFieldError: tüm fail eden
	 * fieldlarla ilgili hata mesajlarını toplayabiliriz, bu bir liste
	 * 
	 * validationErrors.put(fieldError.getField(),fieldError.getDefaultMessage());
	 * //validationErrors mapimize bu field ın adını ve bu field ile ilgili hata
	 * mesaj. atıyoruz
	 * 
	 * } error.setValidationErrors(validationErrors); return error; }
	 */
	
	
	//bu son metod ile validaiton işini springe bıraktık, sadece repsonse un şekillenmesine müdahale ediyoruz.
	
	
	
	
	/*      GET  METHOD  -- KULLANICI LİSTELEME  */
	
	@GetMapping("/users")
	@JsonView(Views.Base.class)
	List<User> getUsers(){
		return userService.getUsers();
	}
	
	
	@GetMapping("/users/{username}")
	@JsonView(Views.Base.class)
	User getUser(@PathVariable String username) {
		User user = userService.getByUsername(username);
		return user;
	}
	
}

























