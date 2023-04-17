import { userModel } from "../models/user.model.js";
import { registrationUserValidation } from "../shared/validation.js";
import HttpError from "../shared/htttp.error.js";
import bencrypt from "bcryptjs";

//////////////////////////////////////// Staff Register //////////////////////////
export const userRegister = async (data) => {
  const { error } = registrationUserValidation(data);
  if (error) throw HttpError.badRequest(error.details[0].message);

  // fixed get email already error message
  const emailExists = await userModel.findOne({ email: data.email });
  if (emailExists) throw HttpError.badRequest("Email Already Exists");

  const salt = await bencrypt.genSalt(10);
  const hashPassword = await bencrypt.hash(data.password, salt);

  const user = new userModel({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashPassword,
  });

  const savedAgent = await user.save();
  return savedAgent;
};

// //////////////////////////////////////// Staff Member Display //////////////////////////
// export const displayAgent = async (request) => {
//   const { page, per_page, search, branch } = request;

//   let query = {
//     userStatus: { $ne: userStatus.rejected },
//     userType: userType.staff,
//   };

//   if (search) {
//     query.firstName = { $regex: search };
//   }

//   if (branch) {
//     query.branch = { $regex: branch };
//   }

//   const options = {
//     page: page,
//     limit: per_page,
//     sort: {
//       createdAt: -1,
//     },
//   };

//   let users = await userModel.paginate(query, options);
//   return users;
// };

