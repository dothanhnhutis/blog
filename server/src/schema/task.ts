import * as z from "zod";

const subTaskSchema = z.object({
  subTaskName: z.string(),
  enableUpload: z.boolean(),
});

export const createTaskSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be string",
    }),
    description: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be string",
    }),
    tags: z
      .string({
        required_error: "tags is required",
        invalid_type_error: "tags must be string",
      })
      .array()
      .default([]),
    startDate: z
      .string({
        required_error: "startDate is required",
        invalid_type_error: "startDate must be string",
      })
      .datetime("startDate invalid datetime"),
    dueDate: z
      .string({
        required_error: "dueDate is required",
        invalid_type_error: "dueDate must be string",
      })
      .datetime("dueDate invalid datetime"),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    taskAssignees: z
      .array(
        z.string({
          invalid_type_error: "taskAssignees item must be string",
        }),
        {
          required_error: "taskAssignees is required",
          invalid_type_error: "taskAssignees must be array",
        }
      )
      .min(1, "taskAssignees can't be empty"),
    subTasks: subTaskSchema.array().default([]),
  }),
});

export type CreateTaskReq = z.infer<typeof createTaskSchema>;
