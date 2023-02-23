import React, { useState, ChangeEvent, useEffect } from 'react';
import './App.css';
import { EmployeesTable } from './components/EmployeesTable';

function App() {

  const [file, setFile] = useState<File | undefined>(undefined);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.set('file', file);

    fetch(
      'http://localhost:8080/api/employee/upload',
      {
        body: formData,
        method: 'POST'
      }
    ).then(res => res.json().then((data: Employee[] | null) => setEmployees(data ?? [])))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    fetch('http://localhost:8080/api/employee/all',
    {method: 'GET'}
    ).then(res => res.json().then(data => setEmployees(data)))
    .catch(err => console.log(err));
  }, [])

  return (
    <div className="App">
        <div className="title">
          <h1>Employee Database</h1>
        </div>
        <div className="file-input-container">
          <label htmlFor="file">Import employee information from a CSV file containing 'name', 'email' and 'phoneNumber' columns:</label>
          <div className="file-input">
            <input type="file" id="file" accept=".csv" onChange={handleChange}/>
            <div className="button" onClick={handleUpload}>Upload</div>
          </div>
        </div>
        {!!employees.length && (
          <EmployeesTable employees={employees}/>
        )}
    </div>
  );
}

export interface Employee {
  name: string;
  email: string;
  phoneNumber: string;
}

export default App;
