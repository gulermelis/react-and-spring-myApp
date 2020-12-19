package com.traveltr.ws.user;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ FIELD }) //target: nerde kullanacağımızı belirtiyoruz (field,method,parameter,constructor....)
@Retention(RUNTIME) // runtime da çözümlenmesiyle ilgili
@Constraint(validatedBy = {UniqueUsernameValidator.class }) // bu annotation ı kullanıldığı yerlerde uygulanacak olan validationın logic inin ilgili class ı soruluyor
public @interface UniqueUsername {

	String message() default "{myapp.constraint.username.UniqueUsername.message}";

	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };
		
}
