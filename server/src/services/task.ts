import {
  CreateSubTaskReq,
  CreateTaskReq,
  ReviewSubTaskReq,
  SubmitSubTaskReq,
} from "@/schema/task";
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

export type InsertTaskInput = Omit<CreateTaskReq["body"], "subTaskSwitch"> & {
  createdById: string;
  subTasks: Partial<CreateSubTaskReq>[];
};

// Create
export async function insertTask(
  input: InsertTaskInput,
  select?: Prisma.TaskSelect
) {
  const { tags, taskAssignees, subTasks, ...props } = input;
  console.log(
    tags.map((name) => ({
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
    }))
  );
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

// Read
export async function getTaskBySubTaskId(
  subTaskId: string,
  select?: Prisma.TaskSelect
) {
  return await prisma.task.findFirst({
    where: {
      subTasks: {
        some: {
          id: subTaskId,
        },
      },
    },
    select: Prisma.validator<Prisma.TaskSelect>()({
      ...taskSelectDefault,
      ...select,
    }),
  });
}

export async function getTaskById(id: string, select?: Prisma.TaskSelect) {
  return await prisma.task.findUnique({
    where: {
      id,
    },
    select: Prisma.validator<Prisma.TaskSelect>()({
      ...taskSelectDefault,
      ...select,
    }),
  });
}

// Update
export async function submitSubtask(
  subTaskId: string,
  input: SubmitSubTaskReq["body"]
) {
  await prisma.taskSubmit.create({
    data: {
      subTaskId,
      ...input,
    },
  });
  const subTask = await prisma.subTask.update({
    where: {
      id: subTaskId,
    },
    data: {
      status: "PENDING_REVIEW",
    },
  });

  const task = await prisma.task.findFirst({
    where: {
      subTasks: {
        some: {
          id: subTaskId,
        },
      },
    },
    select: {
      id: true,
      status: true,
      subTasks: true,
    },
  });

  const isAllSubmit = task!.subTasks.every(
    (subTask) => subTask.status == "ACCEPTED"
  );
  const numberOfSubmit = task!.subTasks.filter(
    (subTask) => subTask.status == "ACCEPTED"
  ).length;

  await prisma.task.update({
    where: {
      id: task!.id,
    },
    data: {
      status: isAllSubmit
        ? "IN_REVIEW"
        : numberOfSubmit == 0
        ? "TO_DO"
        : "ON_PROGRESS",
    },
  });

  return subTask;
}

export async function reviewSubTask(
  subTaskId: string,
  status: ReviewSubTaskReq["body"]["status"]
) {
  return await prisma.subTask.update({
    where: {
      id: subTaskId,
    },
    data: {
      status,
    },
  });
}

export async function updateTaskById(id: string, input: any) {
  return await prisma.task.update({
    where: {
      id,
    },
    data: {},
  });
}
