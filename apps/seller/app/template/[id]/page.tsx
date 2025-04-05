import { getTemplate } from "~/app/actions/template";

// type Props = {};

const TemplatePage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  //Fetch data using templateId
  const template = await getTemplate(id);
  console.log(template);
  if (!template) {
    return <div>No template found</div>;
  }

  // TODO: Showcase Video testimonial
  return (
    <div className="bg-black">
      Hi
    </div>
  );
};

export default TemplatePage;
