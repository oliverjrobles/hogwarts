import * as z from "zod";

const UpdateTeacherDto = z.object({
  name: z.string().min(1),
  subject: z.string().min(1),
});

export default UpdateTeacherDto;
