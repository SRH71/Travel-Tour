/*
package com.srh.tour_service.service;

import com.srh.tour_service.entity.TourPackage;
import com.srh.tour_service.repository.TourPackageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TourPackageServiceImpl implements TourPackageService {

    private final TourPackageRepository tourPackageRepository;

    public TourPackageServiceImpl(TourPackageRepository tourPackageRepository) {
        this.tourPackageRepository = tourPackageRepository;
    }

    @Override
    public List<TourPackage> getAllTours() {
        return tourPackageRepository.findAll();
    }

    @Override
    public List<TourPackage> getActiveTours() {
        return tourPackageRepository.findByActiveTrue();
    }

    @Override
    public TourPackage getTourById(Long id) {
        return tourPackageRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Tour package not found with id: " + id
                        ));
    }

    @Override
    public TourPackage createTour(TourPackage tourPackage) {
        return tourPackageRepository.save(tourPackage);
    }

    @Override
    public TourPackage updateTour(Long id, TourPackage tourPackage) {

        TourPackage existingTour = getTourById(id);

        existingTour.setName(tourPackage.getName());
        existingTour.setDescription(tourPackage.getDescription());
        existingTour.setDestination(tourPackage.getDestination());
        existingTour.setDurationDays(tourPackage.getDurationDays());
        existingTour.setMaxGroupSize(tourPackage.getMaxGroupSize());
        existingTour.setPricePerPerson(tourPackage.getPricePerPerson());
        existingTour.setDiscountPrice(tourPackage.getDiscountPrice());

        // Updated: imageUrl → imageName
        existingTour.setImageName(tourPackage.getImageName());

        existingTour.setItinerary(tourPackage.getItinerary());
        existingTour.setInclusions(tourPackage.getInclusions());
        existingTour.setExclusions(tourPackage.getExclusions());
        existingTour.setAvailableFrom(tourPackage.getAvailableFrom());
        existingTour.setAvailableUntil(tourPackage.getAvailableUntil());
        existingTour.setActive(tourPackage.isActive());

        return tourPackageRepository.save(existingTour);
    }

    @Override
    public void deleteTour(Long id) {

        TourPackage existingTour = getTourById(id);

        tourPackageRepository.delete(existingTour);
    }
}

*/

package com.srh.tour_service.service;

import com.srh.tour_service.entity.TourPackage;
import com.srh.tour_service.repository.TourPackageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class TourPackageServiceImpl implements TourPackageService {

    private final TourPackageRepository tourPackageRepository;

    private final Path uploadDirectory =
            Paths.get("uploads", "tours");

    public TourPackageServiceImpl(
            TourPackageRepository tourPackageRepository) {

        this.tourPackageRepository = tourPackageRepository;

        try {
            Files.createDirectories(uploadDirectory);
        } catch (IOException e) {
            throw new RuntimeException(
                    "Could not create image upload directory.",
                    e
            );
        }
    }

    @Override
    public List<TourPackage> getAllTours() {
        return tourPackageRepository.findAll();
    }

    @Override
    public List<TourPackage> getActiveTours() {
        return tourPackageRepository.findByActiveTrue();
    }

    @Override
    public TourPackage getTourById(Long id) {
        return tourPackageRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Tour package not found with id: " + id
                        ));
    }

    @Override
    public TourPackage createTour(
            TourPackage tourPackage,
            MultipartFile image) {

        if (image != null && !image.isEmpty()) {

            String imageName = saveImage(image);

            tourPackage.setImageName(imageName);
        }

        return tourPackageRepository.save(tourPackage);
    }

    @Override
    public TourPackage updateTour(
            Long id,
            TourPackage tourPackage,
            MultipartFile image) {

        TourPackage existingTour = getTourById(id);

        existingTour.setName(tourPackage.getName());
        existingTour.setDescription(tourPackage.getDescription());
        existingTour.setDestination(tourPackage.getDestination());
        existingTour.setDurationDays(tourPackage.getDurationDays());
        existingTour.setMaxGroupSize(tourPackage.getMaxGroupSize());
        existingTour.setPricePerPerson(tourPackage.getPricePerPerson());
        existingTour.setDiscountPrice(tourPackage.getDiscountPrice());
        existingTour.setItinerary(tourPackage.getItinerary());
        existingTour.setInclusions(tourPackage.getInclusions());
        existingTour.setExclusions(tourPackage.getExclusions());
        existingTour.setAvailableFrom(tourPackage.getAvailableFrom());
        existingTour.setAvailableUntil(tourPackage.getAvailableUntil());
        existingTour.setActive(tourPackage.isActive());

        /*
         * Only replace the existing image when
         * a new image was uploaded.
         */
        if (image != null && !image.isEmpty()) {

            String oldImageName = existingTour.getImageName();

            String newImageName = saveImage(image);

            existingTour.setImageName(newImageName);

            deleteOldImage(oldImageName);
        }

        return tourPackageRepository.save(existingTour);
    }

    @Override
    public void deleteTour(Long id) {

        TourPackage existingTour = getTourById(id);

        deleteOldImage(existingTour.getImageName());

        tourPackageRepository.delete(existingTour);
    }

    private String saveImage(MultipartFile image) {

        if (image.isEmpty()) {
            throw new RuntimeException("Image file is empty.");
        }

        String contentType = image.getContentType();

        if (contentType == null ||
                !(contentType.equals("image/jpeg")
                        || contentType.equals("image/png")
                        || contentType.equals("image/webp"))) {

            throw new RuntimeException(
                    "Only JPG, PNG and WEBP images are allowed."
            );
        }

        String originalFilename = image.getOriginalFilename();

        if (originalFilename == null ||
                originalFilename.trim().isEmpty()) {

            throw new RuntimeException(
                    "Invalid image filename."
            );
        }

        String extension = getExtension(originalFilename);

        String imageName =
                UUID.randomUUID() + extension;

        Path targetPath =
                uploadDirectory.resolve(imageName);

        try {

            Files.copy(
                    image.getInputStream(),
                    targetPath,
                    StandardCopyOption.REPLACE_EXISTING
            );

        } catch (IOException e) {

            throw new RuntimeException(
                    "Could not save image.",
                    e
            );
        }

        return imageName;
    }

    private String getExtension(String filename) {

        int lastDot = filename.lastIndexOf('.');

        if (lastDot == -1) {
            throw new RuntimeException(
                    "Image must have a valid extension."
            );
        }

        return filename.substring(lastDot).toLowerCase();
    }

    private void deleteOldImage(String imageName) {

        if (imageName == null || imageName.isBlank()) {
            return;
        }

        try {

            Path imagePath =
                    uploadDirectory.resolve(imageName);

            Files.deleteIfExists(imagePath);

        } catch (IOException e) {

            System.err.println(
                    "Could not delete old image: "
                            + imageName
            );
        }
    }
}