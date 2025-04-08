"use client";

import React, { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowLeft, Camera, FileText, Plus, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createTemplate, updateTemplate } from "@/app/actions/template";
import { useSession } from "next-auth/react";
import GreetingCard from "@repo/ui/components/SellerCards/GreetingCard";
import { CardWrapper } from "@repo/ui/components/CardWrapper";
import { Question, TemplateData } from "@/types/types";

const questions = [
  "Who are you and what are you working on?",
  "How has our product or service helped you?",
  "What's the best thing about our product or service?",
];

export default function TemplateForm(
  { templateData }: { templateData?: TemplateData },
) {
  const [title, setTitle] = useState<string>(templateData?.title || "");
  const [customMessage, setCustomMessage] = useState<string>(
    templateData?.description || "",
  );
  const [question, setQuestion] = useState<(string | Question)[]>(
    templateData?.questions || questions,
  );

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...question];
    updatedQuestions[index] = value;
    setQuestion(updatedQuestions);
  };

  const addQuestions = () => {
    setQuestion([...question, ""]);
  };

  const deleteQuestion = (indexToDelete: number) => {
    if (question.length === 1) {
      alert("At least one question is necessary");
    } else setQuestion(question.filter((_, index) => index !== indexToDelete));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !customMessage.trim()) {
      return; // Don't submit if required fields are empty
    }

    setIsLoading(true);
    try {
      if (templateData) {
        // Update existing template
        const formattedQuestions = question.map((q, index) => {
          if (typeof q === "string") {
            return { content: q, order: index, templateId: templateData.id };
          }
          return { ...q, content: q.content, order: index };
        });

        const result = await updateTemplate(
          templateData.sellerId,
          templateData.id,
          {
            title,
            message: customMessage,
            questions: formattedQuestions as Question[],
          },
        );
        console.log("Updated template:", result);
      } else {
        // Create new template with the current user's ID
        const user = session?.user;
        if (!user) {
          throw new Error("You must be signed in to create a template");
        }

        const template = {
          sellerId: user.id, // Use the authenticated user's ID
          title,
          description: customMessage,
          settings: {
            bgColor: "black",
            textColor: "white",
          },
        };

        const result = await createTemplate(
          template,
          question.map((q) => (typeof q === "string" ? q : q.content)),
        );
        console.log("Created template:", result);
      }
      alert("Success");
      router.push("/dashboard");
    } catch (error) {
      console.error(
        templateData ? "Error updating template:" : "Error creating template:",
        error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen bg-black/90">
      {/* Form Section */}
      <div className="flex flex-col justify-center px-4 py-12 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-yellow-500 mb-2">
            {templateData ? "Edit Template" : "Create New Template"}
          </h2>
          <p className="text-gray-400">
            {templateData
              ? "Update your template details and questions below."
              : "Design your perfect review template to collect valuable feedback."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-yellow-500 text-sm font-medium mb-1"
              >
                Template Title
              </label>
              <input
                id="title"
                className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-zinc-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                type="text"
                value={title}
                required
                placeholder="Enter a descriptive title..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-yellow-500 text-sm font-medium mb-1"
              >
                Introduction Message
              </label>
              <textarea
                id="message"
                className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-zinc-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                rows={3}
                value={customMessage}
                required
                placeholder="Enter a welcoming message for your customers..."
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setCustomMessage(e.target.value)}
              />
            </div>

            <div className="pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-yellow-500 text-sm font-medium">
                  Review Questions
                </h3>
                <Button
                  type="button"
                  onClick={addQuestions}
                  variant="default"
                  size="sm"
                  className="text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/10 hover:text-yellow-400"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Question
                </Button>
              </div>

              <div className="space-y-3">
                {question.map((quet, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-1 rounded-lg bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 border border-gray-700/50 focus-within:border-yellow-500/50 transition-all"
                  >
                    <input
                      type="text"
                      value={typeof quet === "string" ? quet : quet.content}
                      onChange={(e) =>
                        handleQuestionChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 bg-transparent text-white focus:outline-none"
                      placeholder={`Question ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => deleteQuestion(index)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-md transition-colors"
                      title="Delete question"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-6 flex gap-4">
            <Button
              type="button"
              onClick={templateData
                ? () => router.push(`/template/${templateData.id}`)
                : () => router.push("/dashboard")}
              className="flex-1 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-lg transition-all"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to {`${templateData ? "Workspace" : "Dashboard"}`}
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
              className={`flex-1 py-3 ${
                isLoading
                  ? "bg-yellow-600/50"
                  : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500"
              } text-black font-medium rounded-lg transition-all shadow-lg hover:shadow-yellow-500/25`}
            >
              {isLoading
                ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      >
                      </circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      >
                      </path>
                    </svg>
                    Saving...
                  </>
                )
                : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    {templateData ? "Update Template" : "Create Template"}
                  </>
                )}
            </Button>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      <div className="lg:flex flex-col justify-center px-4 py-12 bg-white text-black">
        <h3 className="text-xl font-semibold text-yellow-500 mb-6">
          Preview
        </h3>
        <div className="max-w-2xl mx-auto w-full">
          <CardWrapper>
            <GreetingCard
              title={title}
              message={customMessage}
              questions={question.map((
                q,
              ) => (typeof q === "string" ? q : q.content))}
              isClickable={false}
            />
          </CardWrapper>
        </div>
      </div>
    </div>
  );
}
