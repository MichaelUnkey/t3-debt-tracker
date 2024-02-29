import { z } from "zod";

import { createTRPCRouter, publicProcedure, privateProcedure } from "@/server/api/trpc";
import { company } from "@/server/db/schema";

export const companyRouter = createTRPCRouter({
  insertCompany: privateProcedure
    .input(z.object({ 
      name: z.string(),
      phone: z.string(),
      webAddress: z.string(),

     }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(company).values({
        name: input.name,
        phone: input.phone,
        webAddress: input.webAddress,
      });
    }),

  getCompanies: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.company.findFirst({
      orderBy: (company, { desc }) => [desc(company.createdAt)],
    });
  }),
});
