import { DefaultSession } from "next-auth";
import { UserRole } from "../app/generated/prisma/enums";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: UserRole;
    };
  }

  interface User {
    id: string;
    role: UserRole;
  }
}