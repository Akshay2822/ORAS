package com.app.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = { "password", "securityQuestion", "securityAnswer" }, callSuper = true)
public class User extends BaseEntity {
	@Column(length = 20, name = "FirstName")
	private String firstName;
	@Column(length = 20, name = "LastName")
	private String lastName;
	@Column(length = 20, name = "Email", unique = true)
	private String email;
	@Column(length = 100, name = "Password")
	private String password;
	@Column(length = 13, name = "MobileNo", unique = true)
	private String mobileNo;
	@Column(length = 50)
	private String securityQuestion;
	@Column(length = 50)
	private String securityAnswer;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<RoleEntity> userRoles = new HashSet<>();
	
	private String imagePath;

}
