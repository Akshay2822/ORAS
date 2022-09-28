package com.app.dto;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import com.app.entities.RoleEnum;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude="roles")
public class RegRequest {
	@JsonProperty(access = Access.AUTO) 
	private Long id;
	@NotBlank(message = "first name must be supplied")
	private String firstName;
	@NotBlank(message = "last name must be supplied")
	private String lastName;
	@NotBlank(message = "email must be supplied")
	@Email(message = "Invalid email format")
	private String email;
	@NotBlank(message = "password must be supplied")
	private String password;
	@NotBlank(message = "mobile no. must be supplied")
	private String mobileNo;
	@NotBlank(message = "security question must be supplied")
	private String securityQuestion;
	@NotBlank(message = "security answer must be supplied")
	private String securityAnswer;
	// many-to-many , User *--->* Role
	@NotEmpty(message = "at least 1 role should be choosen")
	private Set<RoleEnum> roles = new HashSet<>();
}
