require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const equipmentModel = require("./db/equipment.model");
const EquipmentTypes = require("./db/type.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();

app.use(express.json());

app.use("/api/equipment/:id", async (req, res, next) => {
  let equipment = null;

  try {
    equipment = await equipmentModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!equipment) {
    return res.status(404).end("Equipment not found");
  }

  req.equipment = equipment;
  next();
});

app.get("/api/equipment/:id", (req, res) => {
  return res.json(req.equipment);
});
app.get("/api/equipment/", async (req, res) => {
  const equipment = await equipmentModel.find({}).lean();
  return res.json(equipment);
})

app.patch("/api/equipment/:id", async (req, res, next) => {
  const equipment = req.body;

  try {
    const updated = await req.equipment.set(equipment).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});


app.post("/api/equipment/", async (req, res, next) => {
  const equipment = req.body;

  try {
    const saved = await equipmentModel.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/equipment/:id", async (req, res, next) => {
  try {
    const deleted = await req.equipment.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});



app.get("/api/employees/", async (req, res) => {
  let empName = req.query.name ? req.query.name : "";
  const employees = await EmployeeModel.find({name: {"$regex": empName, "$options": "i"}}).sort({ created: "desc" });
  return res.json(employees);
});

app.use("/api/employees/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await EmployeeModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!employee) {
    return res.status(404).end("Employee not found");
  }

  req.employee = employee;
  next();
});
app.get("/api/employees/:id", (req, res) => {
  return res.json(req.employee);
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  const employee = req.body;

  try {
    const updated = await req.employee.set(employee).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const deleted = await req.employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/equiptypes", async (req, res) => {
  const equipTypes = await EquipmentTypes.find().lean()
  res.json(equipTypes);
})

app.post("/api/equiptypes/", async (req, res, next) => {
  const equipType = req.body;

  try {
    const saved = await EquipmentTypes.create(equipType);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
