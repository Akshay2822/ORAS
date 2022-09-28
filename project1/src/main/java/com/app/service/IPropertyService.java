package com.app.service;

import java.util.List;

import com.app.entities.Property;

public interface IPropertyService {

	Property registerProperty(Property property);

	List<Property> findAllProperty();
	
	List<Property> findAllAvailableProperty();
	
	List<Property> findAllSpecificUserProperty(long customerId);

	Property findPropertyById(Long propertyid);
	
	String deletePropertyById(long propertyid);
	
	List<Property> findPropertyByCity(String city);

}
