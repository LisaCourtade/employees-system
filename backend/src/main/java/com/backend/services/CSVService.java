package com.backend.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.models.Employee;
import com.backend.repository.EmployeeRepository;

@Service
public class CSVService {
  @Autowired
  EmployeeRepository repository;

  public List<Employee> save(MultipartFile file) throws IOException {
    if (!"text/csv".equals(file.getContentType())) {
      throw new IOException("Please upload csv file");
    }

    try {
      List<Employee> employees = this.parseEmployees(file.getInputStream());
      repository.saveAll(employees);
      return employees;

    } catch (IOException e) {
      throw new RuntimeException("fail to store csv data: " + e.getMessage());
    }
  }

  public List<Employee> getEmployees() {
    return repository.findAll();
  }

  private List<Employee> parseEmployees(InputStream is) {
    try (
        BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
        CSVParser csvParser = new CSVParser(fileReader,
            CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

      List<Employee> employees = new ArrayList<Employee>();

      Iterable<CSVRecord> csvRecords = csvParser.getRecords();
      for (CSVRecord csvRecord : csvRecords) {
        try {
          System.out.println(csvRecord.get("name"));
        } catch (Exception e) {
          System.out.println(csvRecord.isMapped("name"));
        }
        Employee employee = new Employee(
            csvRecord.get("name"),
            csvRecord.get("email"),
            csvRecord.get("phoneNumber"));
        employees.add(employee);
      }

      return employees;
    } catch (IOException e) {
      throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
    }
  }
}
