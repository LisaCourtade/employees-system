import React, { useState } from 'react';
import {Employee} from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'



export function EmployeesTable({
    employees,
}: EmployeesTableProps) {

    const [pageIndex, setPageIndex] = useState<number>(0);
    const [pageController, setPageController] = useState<CurrentPageController>({start: 0, end: 2});

    const handlePrev = () => {
        if (pageController.start !== 0) {
            let newStart = pageController.start - 1;
            let newEnd = pageController.end - 1;
            setPageController({start: newStart, end: newEnd})
        }

        if (pageIndex !== 0) {
            setPageIndex(prev => prev - 1);
        }
    }

    const handleNext= () => {
        if (pageController.start < Math.ceil(employees.length / 10) - 3) {
            let newStart = pageController.start + 1;
            let newEnd = pageController.end + 1;
            setPageController({start: newStart, end: newEnd})
        }

        if (pageIndex < Math.ceil(employees.length / 10) -1) {
            setPageIndex(prev => prev + 1);
        }
    }

    const handleClick = (page: number) => {
        setPageIndex(page);
    }

    return (
        <div className="employees-table">
            <div className="row">
                <div className="column header">Name</div>
                <div className="column header">Email</div>
                <div className="column header">Phone Number</div>
            </div>
            {employees.slice(pageIndex *10, pageIndex *10 + 10).map((em, i) => (
                <div className="row" key={i}>
                    <div className="column">{em.name}</div>
                    <div className="column">{em.email}</div>
                    <div className="column">{em.phoneNumber}</div>
                </div>
            ))}
            <div className="page-controller">
                <div className={pageIndex === 0 ? 'btn-disabled' : 'btn'}  onClick={handlePrev}><FontAwesomeIcon icon={faChevronLeft} /></div>
                {
                    [...Array(Math.ceil(employees.length / 10)).keys()].slice(pageController.start, pageController.end + 1).map((page) => (
                        <div onClick={() => handleClick(page)} className={`page-number btn ${page === pageIndex ? 'current-view' : ''}`}>{page + 1}</div>
                    ))
                }
                <div className={pageIndex === Math.ceil(employees.length / 10) -1 ? 'btn-disabled' : 'btn'} onClick={handleNext}><FontAwesomeIcon icon={faChevronRight} /></div> 
            </div>
        </div>
    )
}

interface EmployeesTableProps {
    employees: Employee[];
}

interface CurrentPageController {
    start: number;
    end: number;
}