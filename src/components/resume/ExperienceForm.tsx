import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Experience } from "@/types/resume";
import { Briefcase, Plus, Trash2 } from "lucide-react";

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

const ExperienceForm = ({ experiences, onChange }: ExperienceFormProps) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    onChange([...experiences, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onChange(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id: string) => {
    onChange(experiences.filter((exp) => exp.id !== id));
  };

  return (
    <div className="form-section animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title mb-0">
          <Briefcase className="w-5 h-5" />
          Work Experience
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addExperience}
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>

      {experiences.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6 border border-dashed rounded-lg">
          No experience added yet. Click "Add" to add your work history.
        </p>
      ) : (
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative p-4 border border-border rounded-lg bg-secondary/30"
            >
              <div className="absolute top-3 right-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExperience(exp.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs font-medium text-muted-foreground mb-3">
                Experience {index + 1}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="input-label">Company</Label>
                  <Input
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, "company", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label className="input-label">Position</Label>
                  <Input
                    placeholder="Job Title"
                    value={exp.position}
                    onChange={(e) =>
                      updateExperience(exp.id, "position", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label className="input-label">Start Date</Label>
                  <Input
                    placeholder="Jan 2020"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "startDate", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label className="input-label">End Date</Label>
                  <Input
                    placeholder="Present"
                    value={exp.endDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "endDate", e.target.value)
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="input-label">Description</Label>
                  <Textarea
                    placeholder="Describe your responsibilities and achievements..."
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(exp.id, "description", e.target.value)
                    }
                    rows={3}
                    className="resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
