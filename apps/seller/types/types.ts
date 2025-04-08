import { Question, Template, User as UserType } from "@repo/database/client";

import { Review } from "@repo/database/client";

export type { Question, Review, Template, UserType };

export type TemplateData = Template & {
  questions: Question[];
};
export type ViewType =
  | "reviews"
  | "integrations"
  | "share"
  | "wallOfLove"
  | "editTemplate";
