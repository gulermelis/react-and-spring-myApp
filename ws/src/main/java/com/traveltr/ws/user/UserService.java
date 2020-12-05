package com.traveltr.ws.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	//@Autowired // dependency injection
	UserRepository userRepository;
	
	PasswordEncoder passwordEncoder;
	
	//@Autowired //bir tane constructor varsa autowired kullanma zorunluluğu yok.
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = new BCryptPasswordEncoder();
	}

	public void save(User user) {
		//String encryptedPassword = this.passwordEncoder.encode(user.getPassword());
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		
	}
	
	
	
}
