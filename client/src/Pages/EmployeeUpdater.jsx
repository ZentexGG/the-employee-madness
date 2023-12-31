import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";

const updateEmployee = (employee) => {
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEmployee = (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};

const fetchEquipment = () => {
  return fetch(`/api/equipment`).then((res) => res.json());
}

const fetchColors = () => {
  return fetch(`/api/colors`).then((res) => res.json());
}

const fetchCompanies = () => {
  return fetch(`/api/companies`).then((res) => res.json());
};

const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [equipment, setEquipment] = useState(null);
  const [colors, setColors] = useState(null);
  const [companies, setCompanies] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);

  useEffect(() => {
    setEmployeeLoading(true);
    fetchEmployee(id)
      .then((employee) => {
        setEmployee(employee);
      })
      .catch((error) => {
        throw error;
      });
    fetchEquipment()
      .then((equipment) => {
        setEquipment(equipment)
      })
      .catch((error) => {
        throw error;
      });
    fetchColors()
      .then((colors) => {
        setColors(colors);
      })
      .catch((error) => {
        throw error;
      });
    
    fetchCompanies()
      .then((companies) => {
        setCompanies(companies);
        setEmployeeLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  }, [id]);

  const handleUpdateEmployee = (employee) => {
    setUpdateLoading(true);
    updateEmployee(employee)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  };

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <EmployeeForm
      employee={employee}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
      equipment={equipment}
      colors={colors}
      companies={companies}
    />
  );
};

export default EmployeeUpdater;
