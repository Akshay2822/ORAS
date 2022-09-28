package com.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomePageController {

	public HomePageController() {
		
		// TODO Auto-generated constructor stub
	}

	@RequestMapping("/")
	public String showHomePage()
	{
		System.out.println("In Home Page");
		return "toHomePage"; //changes in react
	}
}
