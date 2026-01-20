import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResumeData, defaultResumeData } from "@/types/resume";
import PersonalInfoForm from "@/components/resume/PersonalInfoForm";
import SummaryForm from "@/components/resume/SummaryForm";
import ExperienceForm from "@/components/resume/ExperienceForm";
import EducationForm from "@/components/resume/EducationForm";
import SkillsForm from "@/components/resume/SkillsForm";
import ResumePreview from "@/components/resume/ResumePreview";
import { Download, FileText } from "lucide-react";
import html2pdf from "html2pdf.js";

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [isDownloading, setIsDownloading] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!resumeRef.current) return;

    setIsDownloading(true);
    try {
      const element = resumeRef.current;
      const opt = {
        margin: 0,
        filename: `${resumeData.personalInfo.fullName || "resume"}.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-semibold text-foreground">
                Resume Builder
              </h1>
              <p className="text-xs text-muted-foreground">
                Create professional resumes in minutes
              </p>
            </div>
          </div>
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? "Generating..." : "Download PDF"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <PersonalInfoForm
              data={resumeData.personalInfo}
              onChange={(personalInfo) =>
                setResumeData((prev) => ({ ...prev, personalInfo }))
              }
            />
            <SummaryForm
              summary={resumeData.summary}
              onChange={(summary) =>
                setResumeData((prev) => ({ ...prev, summary }))
              }
            />
            <ExperienceForm
              experiences={resumeData.experience}
              onChange={(experience) =>
                setResumeData((prev) => ({ ...prev, experience }))
              }
            />
            <EducationForm
              education={resumeData.education}
              onChange={(education) =>
                setResumeData((prev) => ({ ...prev, education }))
              }
            />
            <SkillsForm
              skills={resumeData.skills}
              onChange={(skills) =>
                setResumeData((prev) => ({ ...prev, skills }))
              }
            />
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Live Preview
              </h2>
              <span className="text-xs text-muted-foreground">
                Updates as you type
              </span>
            </div>
            <ScrollArea className="h-[calc(100vh-12rem)] rounded-lg border border-border bg-muted/30 p-4">
              <ResumePreview ref={resumeRef} data={resumeData} />
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
