const EmployeeForm = ({ onSave, disabled, employee, onCancel, equipment, colors, companies }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onSave(employee);
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
        <select
          name="equipment"
          id="equipment"
          defaultValue={employee ? employee.equipment : "Select option"}
          multiple={true}
        >
          {equipment?.map((e) => (
            <option key={e["_id"]}>{e["name"]}</option>
          ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="favColor">Favorite color:</label>
        <select
          name="favColor"
          id="favColor"
          defaultValue={employee ? employee.favColor : null}
        >
          {colors?.map((e) => (
            <option key={e["_id"]} value={e["_id"]}>
              {e["name"]}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="favColor">Company:</label>
        <select
          name="company"
          id="company"
          defaultValue={employee ? employee.company : null}
        >
          {companies?.map((e) => (
            <option key={e["_id"]}>{e["name"]}</option>
          ))}
        </select>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
