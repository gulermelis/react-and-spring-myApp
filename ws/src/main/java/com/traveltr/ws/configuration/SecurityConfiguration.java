package com.traveltr.ws.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

//authencticaiton implemantasyonunu spring securitye bırakalım..
//configüration paketini oluşturarak başladık

//SPRİNG SECURİTY nin default davranışlarında biri
//csrf i enable etmek, geleneksel post da clientda gizli bir input bulunar tokenlar da göndeirlir
//buna gerke yok


@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{

	@Autowired
	UserAuthService userAuthService;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http.csrf().disable(); //bundan önce 403 dönmekteydi
		http.httpBasic().authenticationEntryPoint(new AuthEntryPoint()); 
		//authentication mekanizmamız basic, hangi endpointlerin authnetication ile olacağını belirtelim

		//AUTHENTİCATİON KONTROLÜ YAP
		//bu pathe gelen requestlerin authentication bir şekilde gelmesini springe söylememiz gerek
		
		http.headers().frameOptions().disable(); //h2-console da "refused to connect" önlemek i.in
		
		http
			.authorizeRequests().antMatchers(HttpMethod.POST, "/api/1.0/auth").authenticated()
			//.antMatchers(HttpMethod.GET, "/secured").authenticated()
			.and()
			.authorizeRequests().anyRequest().permitAll(); //buraya gelen requestlerde auth kontrlü yap

		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}

	//eger bir user bulmaya calısıyosan userAuthService i kullan bu servis arka planda load methodu cagırcak
	///
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userAuthService).passwordEncoder(passwordEncoder());
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}