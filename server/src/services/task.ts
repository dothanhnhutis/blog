import prisma from "@/utils/db";
import { Prisma } from "@prisma/client";

export async function createTask() {
  return await prisma.task.create({
    data: {
      name: "task name",
      description: "task description",
      startDate: "2024-09-27T02:23:12.469Z",
      dueDate: "2024-09-30T02:23:12.469Z",
      priority: "LOW",
      createdById: "",
      status: "TO_DO",
      tags: {
        create: [
          {
            tagTask: {
              connectOrCreate: {
                where: {
                  name: "",
                },
                create: {
                  name: "",
                },
              },
            },
          },
        ],
      },
      taskAssignees: {
        create: [
          {
            userId: "9153ee46-25d3-4520-adb3-af7077b269c8",
          },
        ],
      },
      subTask: {
        create: [
          {
            enableUpload: false,
            subTaskName: "sub task name",
          },
        ],
      },
    },
  });
}
