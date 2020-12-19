package com.traveltr.ws.auth;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.annotation.JsonView;
import com.traveltr.ws.shared.CurrentUser;
import com.traveltr.ws.shared.Views;
import com.traveltr.ws.user.User;
import com.traveltr.ws.user.UserRepository;

@RestController
public class AuthController {
	
	@Autowired
	UserRepository userRepository;
		
	@PostMapping("/api/1.0/auth")
	@JsonView(Views.Base.class)
	ResponseEntity<?> handleAuthentication(@CurrentUser User user /*Authentication authentication*/) {
			
		//User user = (User) authentication.getPrincipal();
		return ResponseEntity.ok(user); 
	}
	
	//var olan login olmuş user bilgilerine erişip onu kullanabiliyoruz

}







































