import { CreateTaskReq } from "@/schema/task";
import prisma from "@/utils/db";
import { Prisma } from "@prisma/client";

export const taskSelectDefault: Prisma.TaskSelect = {
  id: true,
  name: true,
  description: true,
  status: true,
  tags: {
    select: {
      tagName: true,
    },
  },
  startDate: true,
  dueDate: true,
  priority: true,
  createdById: true,
  createdBy: {
    select: {
      profile: {
        select: {
          photo: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  },
  subTasks: true,
  taskAssignees: {
    select: {
      user: {
        select: {
          profile: {
            select: {
              photo: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  },
  createdAt: true,
  updatedAt: true,
};

export type InsertTaskInput = CreateTaskReq["body"] & {
  createdById: string;
};
// Create
export async function insertTask(
  input: InsertTaskInput,
  select?: Prisma.TaskSelect
) {
  const { tags, taskAssignees, subTasks, ...props } = input;
  return await prisma.task.create({
    data: {
      ...props,
      tags: {
        create: tags.map((name) => ({
          tag: {
            connectOrCreate: {
              where: {
                name,
              },
              create: {
                name,
              },
            },
          },
        })),
      },
      taskAssignees: {
        create: taskAssignees.map((userId) => ({ userId })),
      },
      subTasks: {
        create: subTasks,
      },
    },
    select: Prisma.validator<Prisma.TaskSelect>()({
      ...taskSelectDefault,
      ...select,
    }),
  });
}
