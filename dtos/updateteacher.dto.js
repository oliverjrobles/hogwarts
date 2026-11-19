import * as z from "zod";

const UpdateTeacherDto = z
  .object({
    name: z.string().min(1),
    subject: z.string().min(1),
    employment_start: z.iso.date(),
    currently_active: z.boolean(),
    deceased: z.boolean(),
  })
  .refine((data) => !data.currently_active || data.employment_start <= new Date().toISOString().slice(0, 10), {
    message: "An active teacher cannot have a future employment date",
    path: ["employment_start"],
  });

export default UpdateTeacherDto;
