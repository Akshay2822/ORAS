package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Property;
import com.app.entities.WishList;

public interface IWishlistRepository extends JpaRepository<WishList, Long> {

	@Query("select w.property from WishList w where w.uid =:id ")
	List<Property> findAllWishlistByUserId(@Param(value = "id") int userId);
	
	Optional<WishList> findById(long id);
	
	@Query("select w from WishList w join w.property p where p.id=:pid and w.uid=:uid")
	Optional<WishList> findByPIdAndUId(@Param(value = "pid")long propertyId , @Param(value = "uid")int uid);
	

}
