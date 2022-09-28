package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
@Table(name = "Property")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Property extends BaseEntity {
	@Column(name = "Rent")
	private int rentAmount;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private User customer;

	@Column(length = 200, name = "AddressLine1")
	private String addressLine1;
	@Column(length = 50, name = "Area")
	private String area;
	@Column(length = 50, name = "City")
	private String city;
	@Column(length = 50, name = "State")
	private String state;
	@Column(length = 10, name = "PinCode")
	private String pinCode;

	@Column(name = "Parking",length=5 )
	public String parking;
	@Column(name = "BedRoom")
	public int noOfBedrooms;
	@Column(name = "Elevator",length=5)
	public String elevator;
	@Column(name = "Description")
	public String description;
	
	@Column(length = 10, name = "Furnish")
	@Enumerated(EnumType.STRING)
	private FurnishEnum furnish;

	@Column(length = 15, name = "Status")
	private String status;
	private String imagePath;

}
