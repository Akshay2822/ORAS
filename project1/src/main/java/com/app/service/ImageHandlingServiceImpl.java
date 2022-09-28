package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.IPropertyRepository;
import com.app.dao.IUserRepository;
import com.app.entities.Property;
import com.app.entities.User;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional // required only for storing / retrieving the image path form property table
@Slf4j
public class ImageHandlingServiceImpl implements ImageHandlingService {
	// dep : property repo
	@Autowired
	private IPropertyRepository propertyRepo;
	
	@Autowired
	private IUserRepository userRepo;

	// SpEL
	@Value("${file.upload.folder}")
	private String folder;

	@PostConstruct
	public void anyInit() {
		log.info("in init {} ", folder);
		// create "images" folder : if one does not exist!
		File dir = new File(folder);
		if (!dir.exists())
			log.info("dir created {} ", dir.mkdirs());
		else
			log.info("dir alrdy exists.... ");
	}

	@Override
	public Property uploadContents(long propertyId, MultipartFile imageFile) throws IOException {
		// validate property id
		Property property = propertyRepo.findById(propertyId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Property Id"));
		// property id valid , property : PERSISTENT
		// create the image path =folder + orig file name
		String imagePath = folder.concat(File.separator).concat(imageFile.getOriginalFilename());
		// copy the contents from multipart file --> destination path
		// java.nio.file.Files : public boolean copy(InputStream in , Path
		// dest,CopyOptions options)
		log.info("bytes copied {} ",
				Files.copy(imageFile.getInputStream(), Paths.get(imagePath), StandardCopyOption.REPLACE_EXISTING));
		// store image path in db
		property.setImagePath(imagePath);// modifying the state of persistent entity
		System.out.println(property);
		return propertyRepo.save(property);
	}
	// NOTE : in case of storing image in DB : entity property byte[] --> blob
	// cloumn type in db
	// Simply emp.setImage(imageFile.getBytes());

	@Override
	public byte[] restoreContents(long propertyId) throws IOException {
		Property property = propertyRepo.findById(propertyId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Property Id"));
		if (property.getImagePath() == null) {
			throw new ResourceNotFoundException("Image not found ");
		}
		return Files.readAllBytes(Paths.get(property.getImagePath()));

	}

	@Override
	public User uploadProfile(long userId, MultipartFile imageFile) throws IOException {
		// validate User id
		User user = userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid User Id"));
		// user id valid , user : PERSISTENT
		// create the image path =folder + orig file name
		String imagePath = folder.concat(File.separator).concat(imageFile.getOriginalFilename());
		// copy the contents from multipart file --> destination path
		// java.nio.file.Files : public boolean copy(InputStream in , Path
		// dest,CopyOptions options)
		log.info("bytes copied {} ",
				Files.copy(imageFile.getInputStream(), Paths.get(imagePath), StandardCopyOption.REPLACE_EXISTING));
		// store image path in db
		user.setImagePath(imagePath);// modifying the state of persistent entity
		System.out.println(user);
		return userRepo.save(user);
	}

	@Override
	public byte[] restoreProfile(long userId) throws IOException {
		User user = userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid User Id"));
		if (user.getImagePath() == null) {
			throw new ResourceNotFoundException("Image not found ");
		}
		return Files.readAllBytes(Paths.get(user.getImagePath()));
	}

}
