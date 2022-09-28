package com.app.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.app.entities.Property;
import com.app.entities.User;

public interface ImageHandlingService {

	Property uploadContents(long propertyId, MultipartFile imageFile) throws IOException;
	
	byte[] restoreContents (long propertyId) throws IOException;
	
	User uploadProfile(long userId, MultipartFile imageFile) throws IOException;
	
	byte[] restoreProfile (long userId) throws IOException;


}
