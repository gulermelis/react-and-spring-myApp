package com.traveltr.ws;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

import com.traveltr.ws.user.User;
import com.traveltr.ws.user.UserService;

@SpringBootApplication  //(exclude = SecurityAutoConfiguration.class) //security congifuration classı oluşrunca gerek kalmadı
//bu annotation sayesinde spring security butun endpointleri secure etmek özelliği ortadan kalkacak, 
//biz sadece pasword lerim ecode olmasını istiyoruz.
//Bunu yazamdan önce request attığımızda 401 dönüyordu. clientta hata alıyorduk
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
	}
	
	
	// Uygulama başlarken db de veri oluşturur.
	@Bean //Springin kullandığı bir obje olmuş oluyor
	CommandLineRunner createInitialUsers(UserService userService) {
		return (args) -> { 
				for(int i = 1 ; i<=5; i++) {
					User user = new User();
					user.setUsername("user"+i);
					user.setDisplayName("display"+i);
					user.setPassword("P4ssword");
					
					userService.save(user);
				}
		
		};
				
	}

}


/*
 * client da js de arrow functionlar var
 * bunun karsılığı olarak java tarafında lambda functionlar var
 * bir interface in bir tane metodu varsa onu yukardaki şekilde yazabiliriz.
 */

