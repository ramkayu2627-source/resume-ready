import { forwardRef } from "react";
import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data }, ref) => {
    const { personalInfo, summary, experience, education, skills } = data;

    const hasContent =
      personalInfo.fullName ||
      summary ||
      experience.length > 0 ||
      education.length > 0 ||
      skills.length > 0;

    if (!hasContent) {
      return (
        <div className="resume-paper rounded-lg p-8 min-h-[800px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p className="text-lg font-display">Your resume preview</p>
            <p className="text-sm mt-2">
              Start filling in your details to see your resume come to life.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="resume-paper rounded-lg p-8 min-h-[800px] font-sans"
        style={{ backgroundColor: "white", color: "#1a1a2e" }}
      >
        {/* Header */}
        <header className="border-b-2 border-[hsl(220,60%,25%)] pb-4 mb-6">
          {personalInfo.fullName && (
            <h1
              className="text-3xl font-display font-bold mb-2"
              style={{ color: "#1a365d" }}
            >
              {personalInfo.fullName}
            </h1>
          )}
          <div className="flex flex-wrap gap-4 text-sm" style={{ color: "#4a5568" }}>
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5" />
                {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                {personalInfo.website}
              </span>
            )}
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-6">
            <h2
              className="text-lg font-display font-semibold mb-2 uppercase tracking-wide"
              style={{ color: "#1a365d" }}
            >
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#2d3748" }}>
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2
              className="text-lg font-display font-semibold mb-3 uppercase tracking-wide"
              style={{ color: "#1a365d" }}
            >
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold" style={{ color: "#2d3748" }}>
                        {exp.position}
                      </h3>
                      <p className="text-sm" style={{ color: "#4a5568" }}>
                        {exp.company}
                      </p>
                    </div>
                    {(exp.startDate || exp.endDate) && (
                      <span
                        className="text-sm whitespace-nowrap"
                        style={{ color: "#718096" }}
                      >
                        {exp.startDate}
                        {exp.startDate && exp.endDate && " – "}
                        {exp.endDate}
                      </span>
                    )}
                  </div>
                  {exp.description && (
                    <p
                      className="text-sm mt-1 leading-relaxed"
                      style={{ color: "#4a5568" }}
                    >
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2
              className="text-lg font-display font-semibold mb-3 uppercase tracking-wide"
              style={{ color: "#1a365d" }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold" style={{ color: "#2d3748" }}>
                      {edu.degree}
                      {edu.field && ` in ${edu.field}`}
                    </h3>
                    <p className="text-sm" style={{ color: "#4a5568" }}>
                      {edu.institution}
                    </p>
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <span
                      className="text-sm whitespace-nowrap"
                      style={{ color: "#718096" }}
                    >
                      {edu.startDate}
                      {edu.startDate && edu.endDate && " – "}
                      {edu.endDate}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2
              className="text-lg font-display font-semibold mb-3 uppercase tracking-wide"
              style={{ color: "#1a365d" }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: "#e2e8f0",
                    color: "#2d3748",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }
);

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;
