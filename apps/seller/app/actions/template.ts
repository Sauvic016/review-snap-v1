"use server";
import prisma from "@repo/database/client";

import type { Question, Template } from "@repo/database/client";

type templateProp = Omit<Template, "createdAt" | "updatedAt" | "id">;

export const createTemplate = async (
  template: templateProp,
  questions: string[],
) => {
  const { sellerId, title, description } = template;
  const settings = template.settings!;
  const templates = await prisma.template.create({
    data: {
      sellerId,
      title,
      description,
      settings,
    },
  });

  const questionData = questions.map((question: string, index: number) => {
    return { templateId: templates.id, content: question, order: index };
  });
  const question = await prisma.question.createMany({
    data: questionData,
    skipDuplicates: true,
  });
  console.log(templates, "questions", question);
  return templates;
};

export const getTemplate = async (id: string) => {
  const template = prisma.template.findUnique({
    where: {
      id,
    },
    include: {
      reviews: true,
      questions: true,
    },
  });
  return template;
};

export const getAllTemplate = async (sellerId: string) => {
  const templates = prisma.template.findMany({
    where: {
      sellerId,
    },
    include: {
      reviews: true,
    },
  });
  return templates;
};

interface templateData {
  questions?: Question[];
  message: string;
  title: string;
}

export const updateTemplate = async (
  sellerId: string,
  templateId: string,
  templateData: templateData,
) => {
  try {
    // First, update the template basic info
    const updatedTemplate = await prisma.template.update({
      where: {
        id: templateId,
        sellerId: sellerId, // Ensure the seller owns this template
      },
      data: {
        title: templateData.title,
        description: templateData.message,
      },
    });

    // Handle questions if provided
    if (templateData.questions && templateData.questions.length > 0) {
      // Delete all existing questions for this template
      await prisma.question.deleteMany({
        where: {
          templateId: templateId,
        },
      });

      // Create new questions with updated order
      const questionData = templateData.questions.map((question, index) => {
        return {
          templateId: templateId,
          content: question.content,
          order: index,
        };
      });

      await prisma.question.createMany({
        data: questionData,
        skipDuplicates: true,
      });
    }

    // Fetch the updated template with questions
    const result = await prisma.template.findUnique({
      where: {
        id: templateId,
      },
      include: {
        questions: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    return result;
  } catch (error) {
    console.error("Error updating template:", error);
    throw error;
  }
};
