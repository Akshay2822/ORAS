package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Property;

public interface IPropertyRepository extends JpaRepository<Property, Long> {

	@Query("Select p from Property p where p.status ='AVAILABLE'")
	List<Property> findAllByAvailability();

	@Query("select p from Property p join p.customer c where c.id = :id ")
	List<Property> findAllByUserId(@Param(value = "id") long customerId);
	
	@Query("select p from Property p where p.city=:city and p.status='AVAILABLE'")
	List<Property> findByCity(@Param(value="city") String city);

}
