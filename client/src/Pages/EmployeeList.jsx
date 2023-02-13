import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (signal) => {
  return fetch("/api/employees", { signal }).then((res) => res.json());
};

const fetchEmployeesByName = (signal, empName) => {
  return fetch(`/api/employees?name=${empName}`, { signal }).then((res) =>
    res.json()
  );
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = ({ nameFilter }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [filterBy, setFilterBy] = useState("level");
  const [sortBy, setSortBy] = useState(null);

  const selectFilter = (filter) => {
    setFilterBy(filter);
  };

  const searchInput = (input) => {
    if (input.length > 0) {
      let filtered = data.filter((e) =>
        e[filterBy].toLowerCase().includes(input.toLowerCase())
      );
      setData(filtered);
    } else {
      setData(initialData);
    }
  };

  const getFirstName = (name) => name.split(" ")[0];

  const getMiddleName = (name) => name.split(" ")[1];

  const getLastName = (name) => {
    if (name.split(" ").length > 2) {
      return name.split(" ")[2];
    }
    return name.split(" ")[1];
  };

  const sortEmployees = (filter) => {
    switch (filter) {
      case "firstName":
        let firstSorted = data.sort((a, b) =>
          getFirstName(a["name"]).localeCompare(getFirstName(b["name"]))
        );
        setData([...firstSorted]);
        return;
      case "middleName":
        let middleSorted = data.sort((a, b) =>
          getMiddleName(a["name"]).localeCompare(getMiddleName(b["name"]))
        );
        setData([...middleSorted]);
        return;
      case "lastName":
        let lastSorted = data.sort((a, b) =>
          getLastName(a["name"]).localeCompare(getLastName(b["name"]))
        );
        setData([...lastSorted]);
        return;
      case "position":
        let positionSorted = data.sort((a, b) =>
          a["position"].localeCompare(b["position"])
        );
        setData([...positionSorted])
        return;
      case "level":
        let levelSorted = data.sort((a, b) =>
          a["level"].localeCompare(b["level"])
        );
        setData([...levelSorted]);
        return;
      default:
        return;
    }
  };

  const handleDelete = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });

    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    if (nameFilter) {
      fetchEmployeesByName(controller.signal, nameFilter)
        .then((employees) => {
          setLoading(false);
          setData(employees);
          setInitialData(employees);
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            setData(null);
            throw error;
          }
        });
    } else {
      fetchEmployees(controller.signal)
        .then((employees) => {
          setLoading(false);
          setData(employees);
          setInitialData(employees);
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            setData(null);
            throw error;
          }
        });
    }

    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <EmployeeTable
      sortEmployees={sortEmployees}
      searchInput={searchInput}
      selectFilter={selectFilter}
      employees={data}
      onDelete={handleDelete}
    />
  );
};

export default EmployeeList;
