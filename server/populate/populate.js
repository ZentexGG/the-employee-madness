/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const equipments = require("./equipment.json");
const equipmentTypes = require("./equipmentTypes.json");
const colors = require("./colors.json");

const EmployeeModel = require("../db/employee.model");
const EquipmentModel = require("../db/equipment.model");
const TypeModel = require("../db/type.model");
const ColorModel = require("../db/color.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const favColors = await ColorModel.find({});

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    present: pick([true, false]),
    equipment: pick(equipments),
    favColor: pick(favColors)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populateEquipment = async () => {
  await EquipmentModel.deleteMany({});

  const equipment = equipments.map((name) => ({
    name,
    type: pick(equipmentTypes),
    amount: Math.floor(Math.random() * (250 - 50 + 1) + 50),
  }));

  await EquipmentModel.create(...equipment);
  console.log("Equipment created");
};

const populateTypes = async () => {
  await TypeModel.deleteMany({});

  const types = equipmentTypes.map((name) => ({ name }));
  await TypeModel.create(...types);
  console.log("Types created");
};

const populateColors = async () => {
  await ColorModel.deleteMany({});

  const color = colors.map((name) => ({ name }));
  await ColorModel.create(...color);
  console.log("Colors created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEquipment();
  await populateTypes();
  await populateColors();
  await populateEmployees();
  
  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
