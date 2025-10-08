package com.example.demo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FileService {

    private static final Logger logger = LoggerFactory.getLogger(FileService.class);
    private final Path storageDir;
    private final List<String> allowedExtensions = List.of("txt", "csv", "json", "*");

    public FileService() throws IOException {
        this(Path.of(System.getProperty("user.home"), "Downloads/data"));
    }

    public FileService(Path storageDir) throws IOException {
        this.storageDir = storageDir;
        if (!Files.exists(storageDir)) {
            Files.createDirectories(storageDir);
            logger.info("Storage directory created at {}", storageDir);
        }
    }

    public String saveFile(MultipartFile file) throws IOException {
        String filename = Path.of(file.getOriginalFilename()).getFileName().toString();
        if (file.isEmpty()) {
            throw new IOException("File is empty");
        }

        String ext = getFileExtension(filename);
        if (!allowedExtensions.contains(ext)) {
            throw new IOException("File type not allowed: " + ext);
        }

        Path target = storageDir.resolve(filename);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        logger.info("File saved: {}", filename);
        return filename;
    }

    public byte[] loadFile(String filename) throws IOException {
        Path target = storageDir.resolve(filename);
        if (!Files.exists(target)) {
            throw new IOException("File not found: " + filename);
        }
        logger.info("File loaded: {}", filename);
        return Files.readAllBytes(target);
    }

    public void deleteFile(String filename) throws IOException {
        Path target = storageDir.resolve(filename);
        if (!Files.exists(target)) {
            throw new IOException("File not found: " + filename);
        }
        Files.delete(target);
        logger.info("File deleted: {}", filename);
    }

    public List<String> listFiles() throws IOException {
        return Files.list(storageDir)
                .filter(Files::isRegularFile)
                .map(p -> p.getFileName().toString())
                .collect(Collectors.toList());
    }

    private String getFileExtension(String filename) {
        int dot = filename.lastIndexOf(".");
        return dot == -1 ? "" : filename.substring(dot + 1).toLowerCase();
    }
}
