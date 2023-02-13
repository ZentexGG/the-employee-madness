import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import EquipmentForm from "../Components/EquipmentForm/EquipmentForm";
import Loading from "../Components/Loading";

const updateEquipment = (equipment) => {
  return fetch(`/api/equipment/${equipment._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipment),
  }).then((res) => res.json());
};

const fetchEquipment = (id) => {
  return fetch(`/api/equipment/${id}`).then((res) => res.json());
};

const fetchTypes = () => {
  return fetch("/api/equiptypes").then((res) => res.json());
};

const EquipmentUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState(null);
  const [equipTypes, setEquipTypes] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [equipmentLoading, setEquipmentLoading] = useState(true);

  useEffect(() => {
    setEquipmentLoading(true);
    fetchEquipment(id)
      .then((equipment) => {
        setEquipment(equipment);
        setEquipmentLoading(false);
      })
      .catch((error) => {
        throw error;
      });
    fetchTypes()
      .then((types) => {
        setEquipTypes(types);
      })
      .catch((error) => {
        throw error;
      });
  }, [id]);

  const handleUpdateEquipment = (equipment) => {
    setUpdateLoading(true);
    updateEquipment(equipment)
      .then(() => {
        navigate("/equipment");
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  };

  if (equipmentLoading) {
    return <Loading />;
  }

  return (
    <EquipmentForm
      equipment={equipment}
      onSave={handleUpdateEquipment}
      disabled={updateLoading}
      onCancel={() => navigate("/equipment")}
      equipTypes={equipTypes}
    />
  );
};

export default EquipmentUpdater;
