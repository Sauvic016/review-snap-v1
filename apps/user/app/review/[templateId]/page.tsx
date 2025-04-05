import prisma from "@repo/database/client";
import ReviewFormWrapper from "@/components/ReviewBoard";
import { notFound } from "next/navigation";
import { cache } from "react";

// Cache the template fetch
const getTemplate = cache(async (templateId: string) => {
  const template = await prisma.template.findUnique({
    where: { id: templateId },
    select: { // Only select fields we need
      id: true,
      title: true,
      description: true,
      sellerId: true,
      questions: {
        select: {
          content: true,
        },
      },
    },
  });

  if (!template) {
    notFound();
  }

  return template;
});

export default async function ReviewPage({
  params: { templateId },
}: {
  params: { templateId: string };
}) {
  const template = await getTemplate(templateId);

  return (
    <div className="w-full">
      <ReviewFormWrapper
        title={template.title}
        message={template.description ?? ""}
        questions={template.questions.map((q) => q.content)}
        sellerId={template.sellerId}
        templateId={template.id}
      />
    </div>
  );
}

export const revalidate = 3600; // Revalidate every hour
