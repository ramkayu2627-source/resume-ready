import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

interface SummaryFormProps {
  summary: string;
  onChange: (summary: string) => void;
}

const SummaryForm = ({ summary, onChange }: SummaryFormProps) => {
  return (
    <div className="form-section animate-fade-in">
      <h3 className="section-title">
        <FileText className="w-5 h-5" />
        Professional Summary
      </h3>
      <div>
        <Label className="input-label">Summary</Label>
        <Textarea
          placeholder="Write a brief professional summary highlighting your key achievements and career goals..."
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground mt-2">
          2-4 sentences about your professional background and what you bring to the table.
        </p>
      </div>
    </div>
  );
};

export default SummaryForm;
