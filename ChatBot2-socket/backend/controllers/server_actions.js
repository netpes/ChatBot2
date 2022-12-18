const userSchema = require("../schema/signupSchema");
async function getAllUsersData() {
  const users = await userSchema.find();
  if (users) {
    const Fusers = users.map((user) => {
      return { name: user.name, id: user._id };
    });

    return Fusers;
  }
}

async function getAllUsersName() {
  const users = await userSchema.find({}, `_id`);
  if (users) {
    return users.map((user) => user.name.toString());
  }
}

module.exports = { getAllUsersData, getAllUsersName };
