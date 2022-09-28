package com.app.controller;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dao.IRoleRepository;
import com.app.dao.IUserRepository;
import com.app.dto.AuthRequest;
import com.app.dto.AuthResponse;
import com.app.dto.RegRequest;
import com.app.dto.RegResponse;
import com.app.entities.RoleEntity;
import com.app.entities.RoleEnum;
import com.app.entities.User;
import com.app.jwtutils.JwtUtils;
import com.app.service.IUserService;
import com.app.service.ImageHandlingService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class UserController {

	public UserController() {

		System.out.println("Inside UserController Constructor" + getClass());
	}

	@Autowired
	private IUserService userService;

	@Autowired
	private IUserRepository userRepo;
	
	@Autowired
	private ImageHandlingService imageService;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private IRoleRepository roleRepo;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private JwtUtils utils;

	@PostMapping("/signup")
	public RegResponse addNewUser(@RequestBody @Valid RegRequest user) {
		System.out.println("Inside Post Mapping of signup");
		User u = mapper.map(user, User.class);
		u.setUserRoles(roleRepo.findByRoleNameIn(user.getRoles()));
		String pswd = this.encoder.encode(user.getPassword());
		u.setPassword(pswd);
		return new RegResponse("User registered successfully !!", userService.registerUser(u));
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody @Valid AuthRequest user) {
		System.out.println("Inside Post Mapping login");

		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user.getEmail(),
				user.getPassword());
		log.info("auth token before {}", authToken);
		try {
			Authentication authenticatedDetails = manager.authenticate(authToken);
			User u = userService.verifyUser(user.getEmail());
			Set<RoleEntity> set = u.getUserRoles();
			RoleEntity roleEntity = set.stream().findFirst().get();
			RoleEnum roleName = roleEntity.getRoleName();
			String role = roleName.name();
			System.out.println(role);
			return ResponseEntity
					.ok(new AuthResponse("Login successful!", utils.generateJwtToken(authenticatedDetails), u.getId(),role));

		} catch (Exception e) {

			System.out.println("err " + e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}
	}

	@PostMapping("/forgotpassword")
	public String resetPassword(@RequestBody User user) {
		System.out.println("Inside Post Mapping of Reset Password");
		String msg = "Invalid email or User not found";
		User verifiedUser = userService.verifyUser(user.getEmail());
		if (userRepo.existsById(verifiedUser.getId())) {
			verifiedUser.setPassword(encoder.encode(user.getPassword()));
			userService.updateUserDetails(verifiedUser);
			msg = "password reset sucessful";
		}
		return msg;
	}

	@PutMapping
	public User updateUser(@RequestBody @Valid User user) {
		System.out.println("Inside Put Mapping");
		return userService.updateUserDetails(user);
	}

	@DeleteMapping("/{uid}")
	public String deleteUserDetails(@PathVariable long uid) {
		System.out.println("in del User dtls " + uid);
		return userService.deleteUserDetails(uid);
	}

	@GetMapping("/allUsers")
	public List<User> fetchAllUserDetails() {
		System.out.println("in fetch all users ");
		return userService.getAllUsers();

	}
	
	@GetMapping("/{uid}")
	public User fetchUserDetails(@PathVariable long uid) {
		return userService.getUserById(uid);
	}
	
	@PostMapping("/image/{userId}")
	public User uploadImage(@PathVariable long userId, @RequestParam MultipartFile imageFile)
			throws IOException {
		System.out.println("in upload image " + userId + " orig file name " + imageFile.getOriginalFilename()
				+ " size " + imageFile.getSize());
		return imageService.uploadProfile(userId, imageFile);
	}
	
	@GetMapping(value = "/image/{userId}", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE,
			MediaType.IMAGE_PNG_VALUE })
	public ResponseEntity<?> downloadImage(@PathVariable long userId) throws IOException {
		System.out.println("in download image ");
		return ResponseEntity.ok(imageService.restoreProfile(userId));
	}
	

}
