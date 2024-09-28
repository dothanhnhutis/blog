import * as z from "zod";

const createSubTaskSchema = z.object({
  subTaskName: z.string({
    required_error: "subTaskName is required",
    invalid_type_error: "subTaskName must be boolean",
  }),
  enableAttachment: z
    .boolean({
      required_error: "enableAttachment is required",
      invalid_type_error: "enableAttachment must be boolean",
    })
    .default(false),
});

const subTaskSwitchSchema = z
  .object({
    enableSubTask: z.boolean({
      required_error: "enableSubTask is required",
      invalid_type_error: "enableSubTask must be boolean",
    }),
  })
  .passthrough()
  .pipe(
    z.discriminatedUnion(
      "enableSubTask",
      [
        z
          .object({
            enableSubTask: z.literal(false),
            subTask: z.object(
              {
                enableAttachment: z.boolean({
                  required_error: "enableAttachment is required",
                  invalid_type_error: "enableAttachment must be boolean",
                }),
              },
              {
                required_error: "subTask is required",
                invalid_type_error: "subTask must be object",
              }
            ),
          })
          .strict(),
        z
          .object(
            {
              enableSubTask: z.literal(true),
              subTasks: z.array(createSubTaskSchema, {
                required_error: "subTasks is required",
                invalid_type_error: "subTasks must be array",
              }),
            },
            {
              required_error: "subTasks is required",
              invalid_type_error: "subTasks must be object",
            }
          )
          .strict(),
      ],
      {
        required_error: "subTaskSwitch is required",
        invalid_type_error: "subTaskSwitch must be object",
        message: "asdas",
      }
    )
  );

const taskBodySchema = z.object({
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
  subTaskSwitch: subTaskSwitchSchema,
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
});

export const createTaskSchema = z.object({
  body: taskBodySchema.strict(),
});

export const submitSubTaskSchema = z.object({
  params: z.object({
    subTaskId: z.string(),
  }),
  body: z.object({
    comments: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be string",
    }),
    attachments: z
      .array(
        z
          .string({
            invalid_type_error: "attachments item must be string",
          })
          .url({ message: "attachments item must be url" }),
        {
          required_error: "attachments is required",
          invalid_type_error: "attachments must be string",
        }
      )
      .default([]),
  }),
});

export const reviewSubTaskSchema = z.object({
  params: z.object({
    subTaskId: z.string(),
  }),
  body: z.object({
    status: z.enum(["ACCEPTED", "REJECTED"]),
  }),
});

export const updateTaskSchema = z.object({
  params: z.object({
    taskId: z.string(),
  }),
  body: taskBodySchema.partial().strip(),
});

export type CreateTaskReq = z.infer<typeof createTaskSchema>;
export type CreateSubTaskReq = z.infer<typeof createSubTaskSchema>;
export type SubTaskSwitchReq = z.infer<typeof subTaskSwitchSchema>;
export type SubmitSubTaskReq = z.infer<typeof submitSubTaskSchema>;
export type ReviewSubTaskReq = z.infer<typeof reviewSubTaskSchema>;
export type UpdateTaskReq = z.infer<typeof updateTaskSchema>;
