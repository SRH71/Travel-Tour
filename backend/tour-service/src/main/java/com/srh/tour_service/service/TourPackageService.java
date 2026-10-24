
/*
package com.srh.tour_service.service;

import com.srh.tour_service.entity.TourPackage;

import java.util.List;

public interface TourPackageService {

    List<TourPackage> getAllTours();

    List<TourPackage> getActiveTours();

    TourPackage getTourById(Long id);

    TourPackage createTour(TourPackage tourPackage);

    TourPackage updateTour(Long id, TourPackage tourPackage);

    void deleteTour(Long id);
}
*/

package com.srh.tour_service.service;

import com.srh.tour_service.entity.TourPackage;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TourPackageService {

    List<TourPackage> getAllTours();

    List<TourPackage> getActiveTours();

    TourPackage getTourById(Long id);

    TourPackage createTour(
            TourPackage tourPackage,
            MultipartFile image
    );

    TourPackage updateTour(
            Long id,
            TourPackage tourPackage,
            MultipartFile image
    );

    void deleteTour(Long id);
}