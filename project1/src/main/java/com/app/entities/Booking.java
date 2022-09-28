package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Booking")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Booking extends BaseEntity {
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "property_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Property property;
	
	@ManyToOne(fetch = FetchType.EAGER) //one customer having multiple property booking
	@JoinColumn(name = "user_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private User customer;
	
	@Column
	private LocalDate date;

	public Booking(Property property, User customer) {
		super();
		this.property = property;
		this.customer=customer;
		this.date =LocalDate.now();
	}

}
