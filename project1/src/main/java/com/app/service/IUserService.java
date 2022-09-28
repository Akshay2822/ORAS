package com.app.service;

import java.util.List;

import com.app.entities.User;

public interface IUserService {

	User registerUser(User user);

	User authenticateUser(String email, String password);

	User updateUserDetails(User detachedUser);

	String deleteUserDetails(long userId);

	List<User> getAllUsers();

	User verifyUser(String email);

	User getUserById(long userId);

}
