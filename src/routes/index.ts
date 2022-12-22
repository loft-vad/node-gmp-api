import { Router } from "express";
import usersRouter from "./users";
import groupsRouter from "./groups";
import { it } from "node:test";
import { hasUncaughtExceptionCaptureCallback } from "node:process";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/groups", groupsRouter);

export default routes;

// import { User } from "../types/user";
// export const validate = (user: User): Either<Error, User> =>
//   user.age < 18 ? screenLeft(new Error(`User ${user.login} must be over 18`)) : right(user);

// export const match = (user1: User, user2: User): Either<Error, [User, User]> => {
//   // common in users
//   if (user1.likes.some((like) => user2.likes.includes(like))) {
//     return right([user1, user2]);
//   }

//   return screenLeft(new Error(`No common likes for ${user1.login} and ${user2.login}`));
// };

// const userArbitrary = fc
//   .unicodeString()
//   .chain((login) =>
//     fc
//       .integer(1, 100)
//       .chain((age) =>
//         fc.emailAddress().chain((email) => fc.subarray<Like>(["cars", "cats", "football"]).map<User>((likes) => ({ login, age, email, likes }))),
//       ),
//   );

// it("should validate a user", () => {
//   fc.assert(
//     fc.property(userArbitrary, (user) =>
//       validate(user).fold(
//         (e) => {
//           hasUncaughtExceptionCaptureCallback(e).to.be.an.instanceOf(Error).and.to.have.property("message").include(user.login);
//         },
//         (validatedUser) => {
//           hasUncaughtExceptionCaptureCallback(validatedUser).to.deep.equal(user);
//         },
//       ),
//     ),
//   );
// });
