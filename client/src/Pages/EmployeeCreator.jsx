import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";

const createEmployee = (employee) => {
  return fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEquipment = () => {
  return fetch(`/api/equipment`).then((res) => res.json());
};

const fetchColors = () => {
  return fetch(`/api/colors`).then((res) => res.json());
};

const EmployeeCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [equipment, setEquipment] = useState(null);
  const [colors, setColors] = useState(null);

  const handleCreateEmployee = (employee) => {
    setLoading(true);

    createEmployee(employee)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchEquipment()
      .then((equipment) => {
        setEquipment(equipment);
      })
      .catch((error) => {
        throw error;
      });
    fetchColors()
      .then((colors) => {
        setColors(colors);
        setLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <EmployeeForm
      onCancel={() => navigate("/")}
      disabled={loading}
      onSave={handleCreateEmployee}
      equipment={equipment}
      colors={colors}
    />
  );
};

export default EmployeeCreator;
