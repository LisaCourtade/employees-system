package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.models.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
