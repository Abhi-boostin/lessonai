'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface LessonPlan {
  topic: string;
  gradeLevel: string;
  mainConcept: string;
  subtopics: string[];
  materials: string[];
  objectives: string[];
  introduction: string;
  development: string;
  conclusion: string;
  assessment: string;
}

export default function LessonPlanner() {
  const router = useRouter();
  const [lessonPlan, setLessonPlan] = useState<LessonPlan>({
    topic: "",
    gradeLevel: "",
    mainConcept: "",
    subtopics: [""],
    materials: [""],
    objectives: [""],
    introduction: "",
    development: "",
    conclusion: "",
    assessment: "",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLessonPlan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (
    index: number,
    value: string,
    field: keyof LessonPlan
  ) => {
    setLessonPlan((prev) => ({
      ...prev,
      [field]: prev[field].map((item: string, i: number) =>
        i === index ? value : item
      ),
    }));
  };

  const addArrayItem = (field: keyof LessonPlan) => {
    setLessonPlan((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Lesson Planner</h1>
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Lesson Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Topic</label>
              <Input
                name="topic"
                value={lessonPlan.topic}
                onChange={handleChange}
                placeholder="Enter lesson topic"
              />
            </div>
            <div>
              <label className="block mb-2">Grade Level</label>
              <Input
                name="gradeLevel"
                value={lessonPlan.gradeLevel}
                onChange={handleChange}
                placeholder="Enter grade level"
              />
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="objectives">
              <AccordionTrigger>Learning Objectives</AccordionTrigger>
              <AccordionContent>
                {lessonPlan.objectives.map((objective, index) => (
                  <div key={index} className="mb-2">
                    <Input
                      value={objective}
                      onChange={(e) =>
                        handleArrayChange(index, e.target.value, "objectives")
                      }
                      placeholder={`Objective ${index + 1}`}
                    />
                  </div>
                ))}
                <Button
                  onClick={() => addArrayItem("objectives")}
                  variant="outline"
                  size="sm"
                >
                  Add Objective
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="materials">
              <AccordionTrigger>Materials Needed</AccordionTrigger>
              <AccordionContent>
                {lessonPlan.materials.map((material, index) => (
                  <div key={index} className="mb-2">
                    <Input
                      value={material}
                      onChange={(e) =>
                        handleArrayChange(index, e.target.value, "materials")
                      }
                      placeholder={`Material ${index + 1}`}
                    />
                  </div>
                ))}
                <Button
                  onClick={() => addArrayItem("materials")}
                  variant="outline"
                  size="sm"
                >
                  Add Material
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="lesson-outline">
              <AccordionTrigger>Lesson Outline</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div>
                  <label className="block mb-2">Introduction</label>
                  <Textarea
                    name="introduction"
                    value={lessonPlan.introduction}
                    onChange={handleChange}
                    placeholder="Describe the introduction"
                  />
                </div>
                <div>
                  <label className="block mb-2">Development</label>
                  <Textarea
                    name="development"
                    value={lessonPlan.development}
                    onChange={handleChange}
                    placeholder="Describe the main development"
                  />
                </div>
                <div>
                  <label className="block mb-2">Conclusion</label>
                  <Textarea
                    name="conclusion"
                    value={lessonPlan.conclusion}
                    onChange={handleChange}
                    placeholder="Describe the conclusion"
                  />
                </div>
                <div>
                  <label className="block mb-2">Assessment</label>
                  <Textarea
                    name="assessment"
                    value={lessonPlan.assessment}
                    onChange={handleChange}
                    placeholder="Describe the assessment method"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Save Draft</Button>
            <Button>Create Lesson Plan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 