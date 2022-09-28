package com.app.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Hosting;

public interface IHostingRepository extends JpaRepository<Hosting, Long> {

	@Query("select h from Hosting h where h.date between :fromDate and :toDate")
	List<Hosting> hostingReport(@Param(value = "fromDate") LocalDate fromDate,
			@Param(value = "toDate") LocalDate toDate);

}
