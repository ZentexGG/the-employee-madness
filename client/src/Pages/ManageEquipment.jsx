import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable/EquipmentTable";

const fetchEquipment = (signal) => {
  return fetch("/api/equipment", { signal }).then((res) => res.json());
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipment/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const ManageEquipment = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleDelete = (id) => {
    deleteEquipment(id).catch((err) => {
      console.log(err);
    });

    setData((equipments) => {
      return equipments.filter((equipment) => equipment._id !== id);
    });
  };

  useEffect(() => {
    const controller = new AbortController();
      fetchEquipment(controller.signal)
        .then((equipments) => {
          setLoading(false);
          setData(equipments);
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            setData(null);
            throw error;
          }
        });

    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <EquipmentTable
      equipments={data}
      onDelete={handleDelete}
    />
  );
};

export default ManageEquipment;
