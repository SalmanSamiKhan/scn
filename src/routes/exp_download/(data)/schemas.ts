import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
	ad_code: z.string(),
	exp_serial: z.string(),
	exp_year: z.string(),
	invoice_no: z.string(),
	status: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
