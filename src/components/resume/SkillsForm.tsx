import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Plus, X } from "lucide-react";

interface SkillsFormProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

const SkillsForm = ({ skills, onChange }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onChange([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="form-section animate-fade-in">
      <h3 className="section-title">
        <Lightbulb className="w-5 h-5" />
        Skills
      </h3>
      
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Add a skill (e.g., JavaScript, Project Management)"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>

      {skills.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6 border border-dashed rounded-lg">
          No skills added yet. Type a skill and press Enter or click "Add".
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="px-3 py-1.5 text-sm gap-1.5 group hover:bg-destructive/10 cursor-pointer transition-colors"
              onClick={() => removeSkill(skill)}
            >
              {skill}
              <X className="w-3 h-3 opacity-50 group-hover:opacity-100" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
