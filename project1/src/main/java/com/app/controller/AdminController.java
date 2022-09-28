package com.app.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.IBookingRepository;
import com.app.dao.IHostingRepository;
import com.app.entities.Booking;
import com.app.entities.Hosting;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

	@Autowired
	private IBookingRepository bookingRepo;
	
	@Autowired
	private IHostingRepository hostingRepo;

	@GetMapping("/booking/{fromDate}/{toDate}")
	public List<Booking> getBookingReport(@PathVariable @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate fromDate , @PathVariable @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate toDate ) {
					
		return bookingRepo.bookingReport(fromDate, toDate);
	}
	
	@GetMapping("/hosting/{fromDate}/{toDate}")
	public List<Hosting> getHostingReport(@PathVariable @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate fromDate , @PathVariable @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate toDate ) {
					
		return hostingRepo.hostingReport(fromDate, toDate);
	}
}
