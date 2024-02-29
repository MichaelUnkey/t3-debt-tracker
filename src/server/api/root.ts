import { postRouter } from "@/server/api/routers/post";
import { companyRouter } from "@/server/api/routers/company";
import { debtRouter } from "@/server/api/routers/debt";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  company: companyRouter,
  debt: debtRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
