import { getTemplateOptimized } from "@/app/actions/template";
import TemplateWorkspace from "@/components/template/TemplateWorkspace";
import { Suspense } from "react";
import LoadingUI from "@/components/ui/LoadingUI";

export const dynamic = "force-dynamic";
export const fetchCache = "force-cache";

// type Props = {};

const TemplatePage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  //Fetch optimized data using templateId
  const template = await getTemplateOptimized(id);

  if (!template) {
    return <div>No template found</div>;
  }

  return (
    <div className="flex flex-1 p-0 bg-black text-white">
      <Suspense fallback={<LoadingUI />}>
        <TemplateWorkspace review={template.reviews} template={template} />
      </Suspense>
    </div>
  );
};

export default TemplatePage;
