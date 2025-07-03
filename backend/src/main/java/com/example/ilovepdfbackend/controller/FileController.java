package com.example.ilovepdfbackend.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.ilovepdfbackend.service.FileService;

import java.io.IOException;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        String savedFileName = fileService.saveFile(file);
        return ResponseEntity.ok("File uploaded: " + savedFileName);
    }

    @PostMapping("/convert")
    public ResponseEntity<String> convertFile(@RequestParam("file") MultipartFile file,
                                              @RequestParam("targetFormat") String targetFormat) {
        String convertedFileName = fileService.convertFile(file, targetFormat);
        return ResponseEntity.ok("File converted to " + targetFormat + ": " + convertedFileName);
    }

    @PostMapping("/compress")
    public ResponseEntity<String> compressFile(@RequestParam("file") MultipartFile file) {
        String compressedFileName = fileService.compressFile(file);
        return ResponseEntity.ok("File compressed: " + compressedFileName);
    }

    @PostMapping("/merge")
    public ResponseEntity<String> mergeFiles(@RequestParam("files") MultipartFile[] files) {
        String mergedFileName = fileService.mergeFiles(files);
        return ResponseEntity.ok("Files merged: " + mergedFileName);
    }

    @PostMapping("/split")
    public ResponseEntity<String> splitFile(@RequestParam("file") MultipartFile file,
                                            @RequestParam("pages") String pages) {
        String splitFileName = fileService.splitFile(file, pages);
        return ResponseEntity.ok("File split: " + splitFileName);
    }
}
