package com.traveltr.ws.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{

	/*
	 *springdataa özel bir metod isimlendirmesi yardımıyla bizim yerimize queryler üretebiliyor
	 *biz burada sadece metodun imzasını oluşturyoruz
	 *beklentimiz db den tekil bir user objesini almak bunu da
	 * username ine göre bulmak istiyoruz */

	User findByUsername(String username);
	
	 
	
}
