package com.srh.tour_service.repository;

import com.srh.tour_service.entity.TourPackage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TourPackageRepository extends JpaRepository<TourPackage, Long> {

    List<TourPackage> findByActiveTrue();

    List<TourPackage> findByDestination(String destination);
}