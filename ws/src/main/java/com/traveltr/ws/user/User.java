package com.traveltr.ws.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;


/**
 * @Data Lombok annotationı sayesinde kodumuz daha temiz hala geldi
 * getter setter ve tostring methodlarını manuel olarak yazmamıza gerek kalmadı.
 * 
 * 
 * @Entity, user objesi için karşılık gelen db tablosu oluşturulmasına yarar, jpa-hibernate
 * */

@Data
@Entity
public class User {
	
	@Id
	@GeneratedValue 
	private long id;
	
	private String username;
	
	private String displayName;
	
	private String password;

	
	
}