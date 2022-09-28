package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.IWishlistRepository;
import com.app.entities.Property;
import com.app.entities.WishList;
import com.app.service.IWishlistService;

@RestController
@RequestMapping("/wishlist")
@CrossOrigin(origins = "http://localhost:3000")
public class WishlistController {

	@Autowired
	private IWishlistService wishlistService;

	@Autowired
	private IWishlistRepository wishlistRepo;

	@PostMapping("/{uid}")
	public String addPropertyIntoWishlist(@RequestBody Property property, @PathVariable int uid) {
		System.out.println("Inside Post Mapping of Wishlist");
		try {
			WishList w = wishlistService.getByPIdAndUId(property.getId(), uid);
		} catch (Exception e) {
			
				WishList wishlist = new WishList();
				wishlist.setProperty(property);
				wishlist.setUid(uid);
				wishlistService.addIntoWishlist(wishlist);
				return "Success";
		}
		return "Property Already Exist in Wishlist";
	}

	@PostMapping("/remove/{uid}")
	public String removePropertyFromWishlist( @PathVariable int uid, @RequestBody Property property) {
		System.out.println("in Delete property from Wishlist ");
		long pid = property.getId();
		try {
			WishList wishList = wishlistService.getByPIdAndUId(pid, uid);
			wishlistRepo.deleteById(wishList.getId());
			return "Success";
		} catch (Exception e) {
			return "Failed";
		}

	}

	@GetMapping("/mywishlist/{uid}")
	public List<Property> getAllWishlistOfSpecificUser(@PathVariable int uid) {
		System.out.println("Inside Get All Wishlist of a user Mapping");
		return wishlistService.findAllSpecificUserWishlist(uid);
	}
}
