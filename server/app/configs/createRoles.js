const Role = require("../models/Role");
const sequelize = require("../../configs/dbConfig");

const createRoles = async () => {
  const t = await sequelize.transaction();
  try {
    await sequelize.sync();

    const roles = ["manager", "moderator", "buyer", "seller"];
    for (const role of roles) {
      await Role.create({ name: role }, { transaction: t });
    }

    await t.commit();
    console.log("Roles created:", roles);
  } catch (error) {
    await t.rollback();
    console.error("Error creating roles:", error);
  } finally {
    await sequelize.close();
  }
};

createRoles();
