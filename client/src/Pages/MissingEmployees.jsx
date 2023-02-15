import React from 'react'
import EmployeeList from './EmployeeList'

export default function MissingEmployees() {
    return <EmployeeList
        attendance={false}
    />
}
