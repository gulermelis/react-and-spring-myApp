package com.traveltr.ws.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.traveltr.ws.user.User;
import com.traveltr.ws.user.UserRepository;

@Service
public class UserAuthService implements UserDetailsService {

	@Autowired
	UserRepository userRepository;
	
	@Override
	public User loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User inDB = userRepository.findByUsername(username);
		if(inDB== null) {
			throw new UsernameNotFoundException("User not found");
		}
		
		return inDB;
	}

}
