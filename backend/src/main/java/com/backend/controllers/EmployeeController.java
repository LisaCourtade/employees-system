package com.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.backend.models.Employee;

import com.backend.services.CSVService;

@RestController
@RequestMapping("api/employee")
public class EmployeeController {

  @Autowired
  CSVService fileService;

  @CrossOrigin(origins = "http://localhost:3000")
  @PostMapping(path = "/upload")
  public List<Employee> uploadEmployees(@RequestParam("file") MultipartFile file) {

    try {
      fileService.save(file);

      return fileService.save(file);
    } catch (Exception e) {
      return null;
    }
  }

  @CrossOrigin(origins = "http://localhost:3000")
  @GetMapping("/all")
  public List<Employee> getAllTutorials() {
    try {
      List<Employee> employee = fileService.getEmployees();

      return employee;
    } catch (Exception e) {
      return null;
    }
  }
}
