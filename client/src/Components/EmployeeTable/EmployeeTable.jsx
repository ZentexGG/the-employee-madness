import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({
  employees,
  onDelete,
  selectFilter,
  searchInput,
  sortEmployees,
}) => (
  <div className="EmployeeTable">
    <input onInput={(e) => searchInput(e.target.value)} />
    <select onChange={(e) => selectFilter(e.target.selectedOptions[0].value)}>
      <option value="level">Level</option>
      <option value="position">Position</option>
    </select>

    <p>Arrange by:</p>
    <select onChange={(e) => sortEmployees(e.target.selectedOptions[0].value)}>
      <option value="firstName">First name</option>
      <option value="middleName">Middle name</option>
      <option value="lastName">Last name</option>
      <option value="position">Position</option>
      <option value="level">Level</option>
    </select>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Present</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>{employee.present ? "✅" : "❌"}</td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
