
package com.srh.tour_service.controller;

import com.srh.tour_service.entity.TourPackage;
import com.srh.tour_service.service.TourPackageService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tours")
public class TourPackageController {

    private final TourPackageService tourPackageService;

    public TourPackageController(
            TourPackageService tourPackageService) {

        this.tourPackageService = tourPackageService;
    }

    @GetMapping
    public ResponseEntity<List<TourPackage>> getAllTours() {

        return ResponseEntity.ok(
                tourPackageService.getAllTours()
        );
    }

    @GetMapping("/active")
    public ResponseEntity<List<TourPackage>> getActiveTours() {

        return ResponseEntity.ok(
                tourPackageService.getActiveTours()
        );
    }
    /*
    @GetMapping("/images/{imageName}")
    public ResponseEntity<Resource> getImage(
            @PathVariable String imageName) {

        try {

            Path imagePath = Paths
                    .get("uploads", "tours")
                    .resolve(imageName)
                    .normalize();

            Resource resource =
                    new FileSystemResource(imagePath);

            if (!resource.exists() || !resource.isReadable()) {

                return ResponseEntity.notFound().build();
            }

            String contentType =
                    Files.probeContentType(imagePath);

            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.CONTENT_TYPE,
                            contentType
                    )
                    .body(resource);

        } catch (Exception e) {

            return ResponseEntity
                    .internalServerError()
                    .build();
        }
    }
     */


     @GetMapping("/images/{imageName}")
        public ResponseEntity<Resource> getImage(
                @PathVariable String imageName) {

        try {

                Path uploadDirectory =
                        Paths.get("uploads", "tours")
                                .toAbsolutePath()
                                .normalize();

                Path imagePath =
                        uploadDirectory
                                .resolve(imageName)
                                .normalize();

                /*
                * Prevent path traversal.
                */
                if (!imagePath.startsWith(uploadDirectory)) {

                return ResponseEntity.badRequest().build();
                }

                Resource resource =
                        new FileSystemResource(imagePath);

                if (!resource.exists() || !resource.isReadable()) {

                return ResponseEntity.notFound().build();
                }

                String contentType =
                        Files.probeContentType(imagePath);

                if (contentType == null) {

                contentType =
                        "application/octet-stream";
                }

                return ResponseEntity.ok()
                        .header(
                                HttpHeaders.CONTENT_TYPE,
                                contentType
                        )
                        .body(resource);

        } catch (Exception e) {

                e.printStackTrace();

                return ResponseEntity
                        .internalServerError()
                        .build();
        }
        }



    @GetMapping("/{id}")
    public ResponseEntity<TourPackage> getTourById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                tourPackageService.getTourById(id)
        );
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<TourPackage> createTour(

            @RequestParam String name,

            @RequestParam(required = false)
            String description,

            @RequestParam(required = false)
            String destination,

            @RequestParam(required = false)
            Integer durationDays,

            @RequestParam(required = false)
            Integer maxGroupSize,

            @RequestParam BigDecimal pricePerPerson,

            @RequestParam(required = false)
            BigDecimal discountPrice,

            @RequestParam(required = false)
            String itinerary,

            @RequestParam(required = false)
            String inclusions,

            @RequestParam(required = false)
            String exclusions,

            @RequestParam(required = false)
            LocalDate availableFrom,

            @RequestParam(required = false)
            LocalDate availableUntil,

            @RequestParam(defaultValue = "true")
            boolean active,

            @RequestParam(required = false)
            MultipartFile image) {

        TourPackage tourPackage = new TourPackage();

        tourPackage.setName(name);
        tourPackage.setDescription(description);
        tourPackage.setDestination(destination);
        tourPackage.setDurationDays(durationDays);
        tourPackage.setMaxGroupSize(maxGroupSize);
        tourPackage.setPricePerPerson(pricePerPerson);
        tourPackage.setDiscountPrice(discountPrice);
        tourPackage.setItinerary(itinerary);
        tourPackage.setInclusions(inclusions);
        tourPackage.setExclusions(exclusions);
        tourPackage.setAvailableFrom(availableFrom);
        tourPackage.setAvailableUntil(availableUntil);
        tourPackage.setActive(active);

        TourPackage createdTour =
                tourPackageService.createTour(
                        tourPackage,
                        image
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdTour);
    }

    @PutMapping(
            value = "/{id}",
            consumes = "multipart/form-data"
    )
    public ResponseEntity<TourPackage> updateTour(

            @PathVariable Long id,

            @RequestParam String name,

            @RequestParam(required = false)
            String description,

            @RequestParam(required = false)
            String destination,

            @RequestParam(required = false)
            Integer durationDays,

            @RequestParam(required = false)
            Integer maxGroupSize,

            @RequestParam BigDecimal pricePerPerson,

            @RequestParam(required = false)
            BigDecimal discountPrice,

            @RequestParam(required = false)
            String itinerary,

            @RequestParam(required = false)
            String inclusions,

            @RequestParam(required = false)
            String exclusions,

            @RequestParam(required = false)
            LocalDate availableFrom,

            @RequestParam(required = false)
            LocalDate availableUntil,

            @RequestParam(defaultValue = "true")
            boolean active,

            @RequestParam(required = false)
            MultipartFile image) {

        TourPackage tourPackage = new TourPackage();

        tourPackage.setName(name);
        tourPackage.setDescription(description);
        tourPackage.setDestination(destination);
        tourPackage.setDurationDays(durationDays);
        tourPackage.setMaxGroupSize(maxGroupSize);
        tourPackage.setPricePerPerson(pricePerPerson);
        tourPackage.setDiscountPrice(discountPrice);
        tourPackage.setItinerary(itinerary);
        tourPackage.setInclusions(inclusions);
        tourPackage.setExclusions(exclusions);
        tourPackage.setAvailableFrom(availableFrom);
        tourPackage.setAvailableUntil(availableUntil);
        tourPackage.setActive(active);

        TourPackage updatedTour =
                tourPackageService.updateTour(
                        id,
                        tourPackage,
                        image
                );

        return ResponseEntity.ok(updatedTour);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTour(
            @PathVariable Long id) {

        tourPackageService.deleteTour(id);

        return ResponseEntity.noContent().build();
    }
}