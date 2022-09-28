package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.IPropertyRepository;
import com.app.entities.Property;

@Service
@Transactional
public class PropertyServiceImpl implements IPropertyService {

	@Autowired
	private IPropertyRepository propertyRepo;

	@Override
	public Property registerProperty(Property property) {

		return propertyRepo.save(property);
	}

	@Override
	public List<Property> findAllProperty() {

		return propertyRepo.findAll();
	}

	@Override
	public Property findPropertyById(Long propertyid) {
		return propertyRepo.findById(propertyid)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Property ID!!!!!! : Property not found"));

	}

	@Override
	public List<Property> findAllAvailableProperty() {
		return propertyRepo.findAllByAvailability();
	}

	@Override
	public List<Property> findAllSpecificUserProperty(long customerId) {
		return propertyRepo.findAllByUserId(customerId);
	}

	@Override
	public String deletePropertyById(long propertyid) {
		String mesg = "Failed";
		// if you want to confirm the id :
		if (propertyRepo.existsById(propertyid)) {
			propertyRepo.deleteById(propertyid);
			mesg = "Success";
		}
		return mesg;
	}

	@Override
	public List<Property> findPropertyByCity(String city) {
		return propertyRepo.findByCity(city);
	}

}
