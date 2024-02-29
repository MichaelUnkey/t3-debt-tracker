import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "@/server/api/trpc";
import { debt } from "@/server/db/schema";

export const debtRouter = createTRPCRouter({
  insertDebt: publicProcedure
    .input(
      z.object({
        name: z.string().min(3).max(256),
        debtType: z.enum(["credit", "debt"]),
        companyId: z.number().int(),
        isMonthly: z.boolean(),
        amountOwed: z.number(),
        amountDue: z.number(),
        dueDate: z.number().int().lte(31).gte(1),
        note: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(debt).values({
        name: input.name,
        debtType: input.debtType,
        companyId: input.companyId,
        isMonthly: input.isMonthly,
        amountOwed: input.amountOwed,
        amountDue: input.amountDue,
        dueDate: input.dueDate,
        note: input.note,
      });
    }),

  getDebt: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.debt.findFirst({
      orderBy: (debt, { desc }) => [desc(debt.createdAt)],
    });
  }),
});
