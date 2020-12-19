package com.traveltr.ws.user;

import java.util.Collection;

//import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.traveltr.ws.shared.Views;

import lombok.Data;


/**
 * @Data Lombok annotationı sayesinde kodumuz daha temiz hala geldi
 * getter setter ve tostring methodlarını manuel olarak yazmamıza gerek kalmadı.
 * 
 * 
 * @Entity, user objesi için karşılık gelen db tablosu oluşturulmasına yarar, jpa-hibernate
 * 
 * @NotNull, bean validation spesifikasyonları
 * */

@Data
@Entity
public class User implements UserDetails{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue 
	private long id;
	
	@NotNull(message="{myapp.constraint.username.NotNull.message}") 
	@Size(min= 4, max=255)
	//@Column(unique = true) kendi constraint imizi eklemek için sildik
	@UniqueUsername
	@JsonView(Views.Base.class)
	private String username;
	
	@NotNull
	@Size(min= 4, max=255)
	@JsonView(Views.Base.class)
	private String displayName;
	
	@NotNull 
	@Size(min= 8, max=255)
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message= "{myapp.constraint.password.Pattern.message}")  //kücük harf-buyuk harf- digit
	// @JsonIgnore //JSON oluştururken bu field ı görmezden gelir,, bu case için uygun değil
	private String password;

	@JsonView(Views.Base.class)
	private String image;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList("Role_user");
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
}