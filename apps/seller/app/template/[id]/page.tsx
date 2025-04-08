import { getTemplate } from "@/app/actions/template";
import TemplateWorkspace from "@/components/template/TemplateWorkspace";

// type Props = {};

const TemplatePage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  //Fetch data using templateId
  const template = await getTemplate(id);

  if (!template) {
    return <div>No template found</div>;
  }

  return (
    <div className="flex flex-1 p-0">
      <TemplateWorkspace review={template.reviews} template={template} />
    </div>
  );
};

export default TemplatePage;
