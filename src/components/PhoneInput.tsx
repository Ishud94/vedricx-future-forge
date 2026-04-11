import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const countryCodes = [
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "GB", flag: "🇬🇧" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+971", country: "AE", flag: "🇦🇪" },
  { code: "+65", country: "SG", flag: "🇸🇬" },
  { code: "+60", country: "MY", flag: "🇲🇾" },
  { code: "+966", country: "SA", flag: "🇸🇦" },
  { code: "+974", country: "QA", flag: "🇶🇦" },
  { code: "+968", country: "OM", flag: "🇴🇲" },
  { code: "+977", country: "NP", flag: "🇳🇵" },
  { code: "+94", country: "LK", flag: "🇱🇰" },
  { code: "+880", country: "BD", flag: "🇧🇩" },
  { code: "+234", country: "NG", flag: "🇳🇬" },
  { code: "+27", country: "ZA", flag: "🇿🇦" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
];

interface PhoneInputProps {
  countryCode: string;
  phone: string;
  onCountryCodeChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  required?: boolean;
}

const PhoneInput = ({ countryCode, phone, onCountryCodeChange, onPhoneChange, required = true }: PhoneInputProps) => (
  <div className="flex gap-2">
    <Select value={countryCode} onValueChange={onCountryCodeChange}>
      <SelectTrigger className="w-[100px] flex-shrink-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {countryCodes.map((c) => (
          <SelectItem key={c.code} value={c.code}>
            {c.flag} {c.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <Input
      type="tel"
      value={phone}
      onChange={(e) => onPhoneChange(e.target.value.replace(/[^0-9]/g, ""))}
      placeholder="9999999999"
      maxLength={15}
      required={required}
    />
  </div>
);

export default PhoneInput;
