/* eslint-disable no-unused-vars */
import { User as UserModel } from "@prisma/client";

declare module "next-auth" {
  interface User extends UserModel {
    id: string;
  }
}

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}
