package com.app.service;

import java.util.List;

import com.app.entities.Property;
import com.app.entities.WishList;

public interface IWishlistService {

	WishList addIntoWishlist(WishList property);

	List<Property> findAllSpecificUserWishlist(int customerId);

	WishList getById(long id);

	WishList getByPIdAndUId(long pid, int uid);

}
