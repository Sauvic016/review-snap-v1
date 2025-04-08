import { getTemplate } from "@/app/actions/template";
import TemplateForm from "@/components/template/TemplateForm";
import { notFound } from "next/navigation";

export default async function EditTemplatePage(
  { params }: { params: { id: string } },
) {
  try {
    const template = await getTemplate(params.id);

    if (!template) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-black/90">
        <TemplateForm templateData={template} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching template:", error);
    throw new Error("Failed to load template. Please try again later.");
  }
}
