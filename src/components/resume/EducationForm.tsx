import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Education } from "@/types/resume";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

const EducationForm = ({ education, onChange }: EducationFormProps) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    };
    onChange([...education, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(
      education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const removeEducation = (id: string) => {
    onChange(education.filter((edu) => edu.id !== id));
  };

  return (
    <div className="form-section animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title mb-0">
          <GraduationCap className="w-5 h-5" />
          Education
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addEducation}
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>

      {education.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6 border border-dashed rounded-lg">
          No education added yet. Click "Add" to add your education history.
        </p>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className="relative p-4 border border-border rounded-lg bg-secondary/30"
            >
              <div className="absolute top-3 right-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeEducation(edu.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs font-medium text-muted-foreground mb-3">
                Education {index + 1}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label className="input-label">Institution</Label>
                  <Input
                    placeholder="University Name"
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(edu.id, "institution", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label className="input-label">Degree</Label>
                  <Input
                    placeholder="Bachelor's, Master's, etc."
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, "degree", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label className="input-label">Field of Study</Label>
                  <Input
                    placeholder="Computer Science"
                    value={edu.field}
                    onChange={(e) =>
                      updateEducation(edu.id, "field", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label className="input-label">Start Date</Label>
                  <Input
                    placeholder="2016"
                    value={edu.startDate}
                    onChange={(e) =>
                      updateEducation(edu.id, "startDate", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label className="input-label">End Date</Label>
                  <Input
                    placeholder="2020"
                    value={edu.endDate}
                    onChange={(e) =>
                      updateEducation(edu.id, "endDate", e.target.value)
                    }
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

export default EducationForm;
