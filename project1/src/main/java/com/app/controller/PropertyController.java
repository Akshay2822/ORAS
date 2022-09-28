package com.app.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.IBookingRepository;
import com.app.dao.IHostingRepository;
import com.app.dao.IPropertyRepository;
import com.app.entities.Booking;
import com.app.entities.Hosting;
import com.app.entities.Property;
import com.app.entities.User;
import com.app.service.IPropertyService;
import com.app.service.IUserService;
import com.app.service.ImageHandlingService;

@RestController
@RequestMapping("/property")
@CrossOrigin(origins = "http://localhost:3000")
public class PropertyController {

	@Autowired
	private IPropertyService propertyService;

	@Autowired
	private IPropertyRepository propertyRepo;

	@Autowired
	private IUserService userService;

	@Autowired
	private IHostingRepository hostingRepo;

	@Autowired
	private IBookingRepository bookingRepo;

	@Autowired
	private ImageHandlingService imageService;

	static double balance = 1000;

	public PropertyController() {
		System.out.println("Inside PropertyController Constructor" + getClass());
	}

	@GetMapping("/balance")
	public static double getBalance() {
		return balance;
	}

	@PostMapping
	public Property addNewProperty(@RequestBody Property property) {
		System.out.println("Inside Post Mapping");
		Property prop = propertyService.registerProperty(property);
		Hosting hosting = new Hosting(prop, prop.getCustomer());
		hostingRepo.save(hosting);
		balance += 50;
		return prop;
	}

	@PutMapping("/update")
	public Property updatePropertyDetails(@RequestBody Property property) {
		System.out.println("Inside Put of property Mapping");
		System.out.println("property id " + property.getId());
		propertyRepo.findById(property.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Address ID!!!!!! : Can't Update details"));
		return propertyRepo.save(property);
	}

	@GetMapping("/all")
	public List<Property> getAllProperty() {
		System.out.println("Inside Get All property Mapping");
		return propertyService.findAllProperty();
	}

	@GetMapping("/available")
	public List<Property> getAllAvailableProperty() {
		System.out.println("Inside Get All Available property Mapping");
		return propertyService.findAllAvailableProperty();
	}

	@GetMapping("/myproperty/{uid}")
	public List<Property> getAllPropertiesOfSpecificUser(@PathVariable long uid) {
		System.out.println("Inside Get All properties of a user Mapping");
		return propertyService.findAllSpecificUserProperty(uid);
	}

	@GetMapping("/get/{pid}")
	public Property getPropertyById(@PathVariable long pid) {
		System.out.println("in get Property ");
		return propertyService.findPropertyById(pid);
	}

	@PutMapping("/book/{pid}")
	public String bookProperty(@RequestBody User user, @PathVariable long pid) {
		Property property = propertyService.findPropertyById(pid);
		String str = property.getStatus();
		if (str.equals("AVAILABLE")) {
			if (user.getId() != property.getCustomer().getId()) {
				property.setStatus("UNAVAILABLE");
				Property prop = propertyRepo.save(property);
				Booking booking = new Booking(prop, userService.getUserById(user.getId()));
				bookingRepo.save(booking);
				balance += 50;
				System.out.println("Account Balance " + balance);
				return "Success";
			}
			return "Self";
		}
		return "Failed";
	}

	@DeleteMapping("/{pid}")
	public String deleteProperty(@PathVariable long pid) {
		System.out.println("in del property dtls " + pid);
		return propertyService.deletePropertyById(pid);
	}

	@PostMapping("/image/{propertyId}")
	public Property uploadImage(@PathVariable long propertyId, @RequestParam MultipartFile imageFile)
			throws IOException {
		System.out.println("in upload image " + propertyId + " orig file name " + imageFile.getOriginalFilename()
				+ " size " + imageFile.getSize());
		return imageService.uploadContents(propertyId, imageFile);
	}

	@GetMapping(value = "/image/{propertyId}", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE,
			MediaType.IMAGE_PNG_VALUE })
	public ResponseEntity<?> downloadImage(@PathVariable long propertyId) throws IOException {
		System.out.println("in download image ");
		return ResponseEntity.ok(imageService.restoreContents(propertyId));
	}

	@GetMapping("/owner/{pid}")
	public User getOwnerOfProperty(@PathVariable long pid) {
		Property p = propertyService.findPropertyById(pid);
		return p.getCustomer();
	}

	@GetMapping("/city/{city}")
	public List<Property> getPropertiesByCity(@PathVariable String city) {
		return propertyService.findPropertyByCity(city);
	}

	@GetMapping("/mybooking/{uid}")
	public List<Property> myBookings(@PathVariable long uid) {
		return bookingRepo.myBookedProperties(uid);
	}

}
