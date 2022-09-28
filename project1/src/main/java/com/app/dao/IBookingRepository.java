package com.app.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Booking;
import com.app.entities.Property;

public interface IBookingRepository extends JpaRepository<Booking, Long> 
{	
	@Query("select b from Booking b where b.date between :fromDate and :toDate")
	List<Booking> bookingReport(@Param(value="fromDate")LocalDate fromDate ,@Param(value="toDate") LocalDate toDate);

	@Query("select b.property from Booking b join b.customer c where c.id=:uid")
	List<Property> myBookedProperties(@Param(value="uid") long uid);
}
