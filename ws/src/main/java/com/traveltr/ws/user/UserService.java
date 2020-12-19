package com.traveltr.ws.user;

import java.util.List;

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
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder =passwordEncoder;
	}

	public void save(User user) {
		//String encryptedPassword = this.passwordEncoder.encode(user.getPassword());
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		
	}

	public List<User> getUsers() {
	return userRepository.findAll();
		 
	}

	public User getByUsername(String username) {
		return userRepository.findByUsername(username);
		 
	}
	
}




