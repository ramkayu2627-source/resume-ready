import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PersonalInfo } from "@/types/resume";
import { User, Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const PersonalInfoForm = ({ data, onChange }: PersonalInfoFormProps) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="form-section animate-fade-in">
      <h3 className="section-title">
        <User className="w-5 h-5" />
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label className="input-label">Full Name</Label>
          <Input
            placeholder="John Doe"
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
        </div>
        <div>
          <Label className="input-label flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            Email
          </Label>
          <Input
            type="email"
            placeholder="john@example.com"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div>
          <Label className="input-label flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            Phone
          </Label>
          <Input
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
        <div>
          <Label className="input-label flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            Location
          </Label>
          <Input
            placeholder="New York, NY"
            value={data.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>
        <div>
          <Label className="input-label flex items-center gap-1.5">
            <Linkedin className="w-3.5 h-3.5" />
            LinkedIn (optional)
          </Label>
          <Input
            placeholder="linkedin.com/in/johndoe"
            value={data.linkedin || ""}
            onChange={(e) => handleChange("linkedin", e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <Label className="input-label flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            Website (optional)
          </Label>
          <Input
            placeholder="johndoe.com"
            value={data.website || ""}
            onChange={(e) => handleChange("website", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
