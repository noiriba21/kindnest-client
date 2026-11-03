import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

const base = createAuthClient({
  plugins: [jwtClient()],
});

// TypeScript-ke bole dilam: ei client-er type niye jhamela korish na
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authClient: any = base;