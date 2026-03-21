"use client";

import { useState } from "react";
import type { ProjectType, Vibe } from "@/lib/templates/types";

type Step = 1 | 2 | 3 | "done";

interface QuestionnaireState {
  step: Step;
  projectType: ProjectType | null;
  vibe: Vibe | null;
  projectName: string;
}

export function useQuestionnaire() {
  const [state, setState] = useState<QuestionnaireState>({
    step: 1,
    projectType: null,
    vibe: null,
    projectName: "",
  });

  const selectProjectType = (type: ProjectType) => {
    setState((s) => ({ ...s, projectType: type, step: 2 }));
  };

  const selectVibe = (vibe: Vibe) => {
    setState((s) => ({ ...s, vibe, step: 3 }));
  };

  const submitName = (name: string) => {
    setState((s) => ({
      ...s,
      projectName: name.trim() || "Mon Projet",
      step: "done",
    }));
  };

  return { state, selectProjectType, selectVibe, submitName };
}
