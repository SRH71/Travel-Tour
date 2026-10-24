/*
package com.srh.booking_service.repository;


import com.srh.booking_service.entity.Booking;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// @Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
}
*/

package com.srh.booking_service.repository;

import com.srh.booking_service.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);
}