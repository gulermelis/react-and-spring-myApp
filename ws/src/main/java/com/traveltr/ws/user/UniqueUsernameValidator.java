package com.traveltr.ws.user;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public boolean isValid(String username, ConstraintValidatorContext context) {
		// userRepository.findAll() kabuledilebilir bir çözüm olmaz.Milyonlarca kullanıcı olabilir
		//bunun yerine db den query ederek user ın varlıgını kontrol edebiliriz.
		
		User user = userRepository.findByUsername(username);
		if(user != null) {
			return false;
		}		
		return true;
	}

}
