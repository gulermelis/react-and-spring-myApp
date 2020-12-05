package com.traveltr.ws;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
//bu annotation sayesinde spring security butun endpointleri secure etmek özelliği ortadan kalkacak, 
//biz sadece pasword lerim ecode olmasını istiyoruz.
//Bunu yazamdan önce request attığımızda 401 dönüyordu. clientta hata alıyorduk
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
	}

}
