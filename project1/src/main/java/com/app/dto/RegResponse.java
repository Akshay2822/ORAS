package com.app.dto;
import java.time.LocalDateTime;

import com.app.entities.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RegResponse {
	private String message;
	private LocalDateTime timeStamp;
	private User user;

	public RegResponse(String message, User user) {
		super();
		this.message = message;
		this.user = user;
		this.timeStamp=LocalDateTime.now();
	}
}
