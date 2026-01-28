import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

import { env } from "@/env.mjs";

export default {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // Note: Resend provider requires an adapter and cannot be used in middleware
    // Email login is handled separately in auth.ts with the Prisma adapter
  ],
} satisfies NextAuthConfig;
