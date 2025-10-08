package com.example.demo.service;

import org.junit.jupiter.api.*;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.charset.StandardCharsets;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class FileServiceTest {

    private FileService fileService;
    private final Path storageDir = Path.of(System.getProperty("user.home"), "Downloads/data-test/");

    @BeforeAll
    void setup() throws IOException {
        fileService = new FileService(storageDir);
    }

    @AfterAll
    void cleanup() throws IOException {
        if (Files.exists(storageDir)) {
            Files.list(storageDir).forEach(file -> {
                try { Files.delete(file); } catch (IOException ignored) {}
            });
            Files.delete(storageDir);
        }
    }

    @Test
    void testSaveAndLoadFile() throws IOException {
        MockMultipartFile file = new MockMultipartFile(
                "file", "test.txt", "text/plain", "Hello World".getBytes(StandardCharsets.UTF_8)
        );

        String filename = fileService.saveFile(file);
        assertEquals("test.txt", filename);

        byte[] content = fileService.loadFile(filename);
        assertEquals("Hello World", new String(content, StandardCharsets.UTF_8));

        fileService.deleteFile(filename);
    }

    @Test
    void testDeleteNonExistentFile() {
        IOException ex = assertThrows(IOException.class, () -> fileService.deleteFile("no_file.txt"));
        assertTrue(ex.getMessage().contains("not found"));
    }

    @Test
    void testListFiles() throws IOException {
        MockMultipartFile file1 = new MockMultipartFile("file", "file1.txt", "text/plain", "A".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("file", "file2.txt", "text/plain", "B".getBytes());

        fileService.saveFile(file1);
        fileService.saveFile(file2);

        List<String> files = fileService.listFiles();
        assertTrue(files.contains("file1.txt"));
        assertTrue(files.contains("file2.txt"));

        fileService.deleteFile("file1.txt");
        fileService.deleteFile("file2.txt");
    }

    @Test
    void testInvalidFileType() {
        MockMultipartFile file = new MockMultipartFile(
                "file", "image.jpg", "image/jpeg", "dummy content".getBytes()
        );

        IOException ex = assertThrows(IOException.class, () -> fileService.saveFile(file));
        assertEquals("File type not allowed: jpg", ex.getMessage());
    }
}
