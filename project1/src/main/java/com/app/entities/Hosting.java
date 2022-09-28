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
@Table(name = "Hosting")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Hosting extends BaseEntity {

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "property_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Property property;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private User owner;
	
	@Column
	private LocalDate date;

	public Hosting(Property property, User owner) {
		super();
		this.property = property;
		this.owner = owner;
		this.date = LocalDate.now();
	}
}
