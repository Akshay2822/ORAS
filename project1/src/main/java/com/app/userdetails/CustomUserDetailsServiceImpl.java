package com.app.userdetails;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.dao.IUserRepository;
import com.app.entities.User;

@Service
@Transactional
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	// dep : UserRepo
	@Autowired
	private IUserRepository userRepo;

	// As per Spring sec : this method should throw UsernameNotFoundException :
	// if an UserDetailsService implementation cannot locate a User by its
	// username.(currently email)
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User authenticatedUser = userRepo.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Invalid Email !!!!"));
		// convert auth user (entity) --> UserDetails (spring sec object)
		return new CustomUserDetails(authenticatedUser);
	}

}
