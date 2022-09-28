package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.IWishlistRepository;
import com.app.entities.Property;
import com.app.entities.WishList;

@Service
@Transactional
public class WishlistServiceImpl implements IWishlistService {

	@Autowired
	private IWishlistRepository wishlistRepo;

	@Override
	public WishList addIntoWishlist(WishList property) {

		return wishlistRepo.save(property);
	}

//	@Override
//	public String deleteFromWishlist(long wishlistid) 
//	{
//		String mesg = "Deleting Property from Wishlist failed !!!!!";
//		// if you want to confirm the id :
//		if (wishlistRepo.existsById(wishlistid)) {
//			wishlistRepo.deleteById(wishlistid);
//			mesg = "Deleted Property From Wishlist wishlistid " + wishlistid;
//		}
//		return mesg;
//	}

	@Override
	public List<Property> findAllSpecificUserWishlist(int customerId) {
		return wishlistRepo.findAllWishlistByUserId(customerId);
	}

//	@Override
//	public String removeFromWishlist( long propertyId , int userId) {
//		
//		try {
//			wishlistRepo.deleteFromWishlist(propertyId, userId);
//		   return "Deleted Property From Wishlist successfully";
//		}catch(Exception e)
//		{
//			System.out.println(e.getMessage());
//			return "Deleting Property from Wishlist failed !!!!!";
//		}
//		
//	}

	@Override
	public WishList getById(long id) {

		return wishlistRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Wishlist ID!!!!!! : Wishlist not found"));
	}

	@Override
	public WishList getByPIdAndUId(long pid, int uid) {

		return wishlistRepo.findByPIdAndUId(pid, uid).orElseThrow(
				() -> new ResourceNotFoundException("Invalid property ID or User Id!!!!!! : Wishlist not found"));

	}

}
