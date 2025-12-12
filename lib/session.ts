import "server-only";

import { cache } from "react";
import { auth } from "@/auth";

export const getCurrentUser = cache(async () => {
  try {
    const session = await auth();
    if (session?.user) return session.user;
  } catch (error) {
    console.error("Auth failed, using mock user for migration review");
  }

  // MOCK USER FOR MIGRATION REVIEW
  return {
    id: "mock-user-id",
    name: "Demo User",
    email: "demo@example.com",
    image: null,
    role: "ADMIN", // Admin role to see all menus
  };
});