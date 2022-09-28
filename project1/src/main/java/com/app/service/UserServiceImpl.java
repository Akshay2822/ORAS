package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.IUserRepository;
import com.app.entities.User;

@Service
@Transactional
public class UserServiceImpl implements IUserService {

	@Autowired
	private IUserRepository userRepo;

	@Override
	public User registerUser(User user) {

		return userRepo.save(user);
	}

	@Override
	public User authenticateUser(String email, String password) {

		Optional<User> optional = userRepo.findByEmailAndPassword(email, password);

		return optional.orElseThrow(() -> new ResourceNotFoundException("invalid email or password"));
	}

	@Override
	public User updateUserDetails(User detachedUser) {
		System.out.println(detachedUser);
		userRepo.findById(detachedUser.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid User ID!!!!!! : Can't Update details"));
		return userRepo.save(detachedUser);
	}

	@Override
	public String deleteUserDetails(long userId) {
		String mesg = "Failed";
		// if you want to confirm the id :
		if (userRepo.existsById(userId)) {
			userRepo.deleteById(userId);
			mesg = "Success";
		}
		return mesg;

	}

	@Override
	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

	@Override
	public User verifyUser(String email) {
		Optional<User> optional = userRepo.findByEmail(email);

		return optional.orElseThrow(() -> new ResourceNotFoundException("invalid email or user not found"));
	}

	@Override
	public User getUserById(long userId) {
		Optional<User> optional = userRepo.findById(userId);
		return optional.orElseThrow(() -> new ResourceNotFoundException("invalid id or user not found"));
	}

}
