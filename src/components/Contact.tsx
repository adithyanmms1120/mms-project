import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, Phone, MapPin, CheckCircle, ArrowUpRight, ChevronDown, Search, AlertCircle, Check } from "lucide-react";
import { toast } from "sonner";
import { createPortal } from "react-dom";
import ReactCountryFlag from "react-country-flag";
import { SuccessPopup } from "@/components/SuccessPopup";


gsap.registerPlugin(ScrollTrigger);

// Country data type
interface Country {
  code: string;
  name: string;
  dial_code: string;
  flag: string;
}

// Country data (expanded for better coverage)
const countries: Country[] = [
  { code: "AF", name: "Afghanistan", dial_code: "+93", flag: "🇦🇫" },
  { code: "AL", name: "Albania", dial_code: "+355", flag: "🇦🇱" },
  { code: "DZ", name: "Algeria", dial_code: "+213", flag: "🇩🇿" },
  { code: "AS", name: "American Samoa", dial_code: "+1", flag: "🇦🇸" },
  { code: "AD", name: "Andorra", dial_code: "+376", flag: "🇦🇩" },
  { code: "AO", name: "Angola", dial_code: "+244", flag: "🇦🇴" },
  { code: "AI", name: "Anguilla", dial_code: "+1", flag: "🇦🇮" },
  { code: "AG", name: "Antigua and Barbuda", dial_code: "+1", flag: "🇦🇬" },
  { code: "AR", name: "Argentina", dial_code: "+54", flag: "🇦🇷" },
  { code: "AM", name: "Armenia", dial_code: "+374", flag: "🇦🇲" },
  { code: "AW", name: "Aruba", dial_code: "+297", flag: "🇦🇼" },
  { code: "AU", name: "Australia", dial_code: "+61", flag: "��🇺" },
  { code: "AT", name: "Austria", dial_code: "+43", flag: "🇦🇹" },
  { code: "AZ", name: "Azerbaijan", dial_code: "+994", flag: "🇦🇿" },
  { code: "BS", name: "Bahamas", dial_code: "+1", flag: "🇧🇸" },
  { code: "BH", name: "Bahrain", dial_code: "+973", flag: "🇧🇭" },
  { code: "BD", name: "Bangladesh", dial_code: "+880", flag: "🇧🇩" },
  { code: "BB", name: "Barbados", dial_code: "+1", flag: "🇧🇧" },
  { code: "BY", name: "Belarus", dial_code: "+375", flag: "🇧🇾" },
  { code: "BE", name: "Belgium", dial_code: "+32", flag: "🇧🇪" },
  { code: "BZ", name: "Belize", dial_code: "+501", flag: "🇧🇿" },
  { code: "BJ", name: "Benin", dial_code: "+229", flag: "🇧🇯" },
  { code: "BM", name: "Bermuda", dial_code: "+1", flag: "🇧🇲" },
  { code: "BT", name: "Bhutan", dial_code: "+975", flag: "🇧🇹" },
  { code: "BO", name: "Bolivia", dial_code: "+591", flag: "🇧🇴" },
  { code: "BA", name: "Bosnia and Herzegovina", dial_code: "+387", flag: "🇧🇦" },
  { code: "BW", name: "Botswana", dial_code: "+267", flag: "🇧🇼" },
  { code: "BR", name: "Brazil", dial_code: "+55", flag: "🇧🇷" },
  { code: "BN", name: "Brunei", dial_code: "+673", flag: "🇧🇳" },
  { code: "BG", name: "Bulgaria", dial_code: "+359", flag: "��🇬" },
  { code: "BF", name: "Burkina Faso", dial_code: "+226", flag: "🇧🇫" },
  { code: "BI", name: "Burundi", dial_code: "+257", flag: "🇧🇮" },
  { code: "KH", name: "Cambodia", dial_code: "+855", flag: "🇰🇭" },
  { code: "CM", name: "Cameroon", dial_code: "+237", flag: "🇨🇲" },
  { code: "CA", name: "Canada", dial_code: "+1", flag: "🇨🇦" },
  { code: "CV", name: "Cape Verde", dial_code: "+238", flag: "🇨🇻" },
  { code: "KY", name: "Cayman Islands", dial_code: "+1", flag: "🇰🇾" },
  { code: "CF", name: "Central African Republic", dial_code: "+236", flag: "🇨🇫" },
  { code: "TD", name: "Chad", dial_code: "+235", flag: "🇹🇩" },
  { code: "CL", name: "Chile", dial_code: "+56", flag: "🇨🇱" },
  { code: "CN", name: "China", dial_code: "+86", flag: "🇨🇳" },
  { code: "CO", name: "Colombia", dial_code: "+57", flag: "🇨🇴" },
  { code: "KM", name: "Comoros", dial_code: "+269", flag: "🇰🇲" },
  { code: "CG", name: "Congo", dial_code: "+242", flag: "🇨🇬" },
  { code: "CR", name: "Costa Rica", dial_code: "+506", flag: "🇨🇷" },
  { code: "HR", name: "Croatia", dial_code: "+385", flag: "🇭🇷" },
  { code: "CU", name: "Cuba", dial_code: "+53", flag: "🇨🇺" },
  { code: "CY", name: "Cyprus", dial_code: "+357", flag: "🇨🇾" },
  { code: "CZ", name: "Czech Republic", dial_code: "+420", flag: "🇨🇿" },
  { code: "DK", name: "Denmark", dial_code: "+45", flag: "🇩🇰" },
  { code: "DJ", name: "Djibouti", dial_code: "+253", flag: "🇩🇯" },
  { code: "DM", name: "Dominica", dial_code: "+1", flag: "🇩🇲" },
  { code: "DO", name: "Dominican Republic", dial_code: "+1", flag: "🇩🇴" },
  { code: "EC", name: "Ecuador", dial_code: "+593", flag: "🇪🇨" },
  { code: "EG", name: "Egypt", dial_code: "+20", flag: "🇪🇬" },
  { code: "SV", name: "El Salvador", dial_code: "+503", flag: "🇸🇻" },
  { code: "GQ", name: "Equatorial Guinea", dial_code: "+240", flag: "🇬🇶" },
  { code: "ER", name: "Eritrea", dial_code: "+291", flag: "🇪🇷" },
  { code: "EE", name: "Estonia", dial_code: "+372", flag: "🇪🇪" },
  { code: "ET", name: "Ethiopia", dial_code: "+251", flag: "🇪🇹" },
  { code: "FJ", name: "Fiji", dial_code: "+679", flag: "🇫🇯" },
  { code: "FI", name: "Finland", dial_code: "+358", flag: "🇫🇮" },
  { code: "FR", name: "France", dial_code: "+33", flag: "🇫🇷" },
  { code: "GA", name: "Gabon", dial_code: "+241", flag: "🇬🇦" },
  { code: "GM", name: "Gambia", dial_code: "+220", flag: "🇬🇲" },
  { code: "GE", name: "Georgia", dial_code: "+995", flag: "🇬🇪" },
  { code: "DE", name: "Germany", dial_code: "+49", flag: "🇩🇪" },
  { code: "GH", name: "Ghana", dial_code: "+233", flag: "🇬🇭" },
  { code: "GR", name: "Greece", dial_code: "+30", flag: "🇬🇷" },
  { code: "GD", name: "Grenada", dial_code: "+1", flag: "🇬🇩" },
  { code: "GT", name: "Guatemala", dial_code: "+502", flag: "🇬🇹" },
  { code: "GN", name: "Guinea", dial_code: "+224", flag: "🇬🇳" },
  { code: "GW", name: "Guinea-Bissau", dial_code: "+245", flag: "🇬🇼" },
  { code: "GY", name: "Guyana", dial_code: "+592", flag: "🇬🇾" },
  { code: "HT", name: "Haiti", dial_code: "+509", flag: "🇭🇹" },
  { code: "HN", name: "Honduras", dial_code: "+504", flag: "🇭🇳" },
  { code: "HK", name: "Hong Kong", dial_code: "+852", flag: "🇭🇰" },
  { code: "HU", name: "Hungary", dial_code: "+36", flag: "🇭🇺" },
  { code: "IS", name: "Iceland", dial_code: "+354", flag: "🇮🇸" },
  { code: "IN", name: "India", dial_code: "+91", flag: "🇮🇳" },
  { code: "ID", name: "Indonesia", dial_code: "+62", flag: "🇮🇩" },
  { code: "IR", name: "Iran", dial_code: "+98", flag: "🇮🇷" },
  { code: "IQ", name: "Iraq", dial_code: "+964", flag: "🇮🇶" },
  { code: "IE", name: "Ireland", dial_code: "+353", flag: "🇮🇪" },
  { code: "IL", name: "Israel", dial_code: "+972", flag: "🇮🇱" },
  { code: "IT", name: "Italy", dial_code: "+39", flag: "🇮🇹" },
  { code: "JM", name: "Jamaica", dial_code: "+1", flag: "🇯🇲" },
  { code: "JP", name: "Japan", dial_code: "+81", flag: "🇯🇵" },
  { code: "JO", name: "Jordan", dial_code: "+962", flag: "🇯🇴" },
  { code: "KZ", name: "Kazakhstan", dial_code: "+7", flag: "🇰🇿" },
  { code: "KE", name: "Kenya", dial_code: "+254", flag: "🇰🇪" },
  { code: "KI", name: "Kiribati", dial_code: "+686", flag: "🇰🇮" },
  { code: "KP", name: "North Korea", dial_code: "+850", flag: "🇰🇵" },
  { code: "KR", name: "South Korea", dial_code: "+82", flag: "🇰🇷" },
  { code: "KW", name: "Kuwait", dial_code: "+965", flag: "🇰🇼" },
  { code: "KG", name: "Kyrgyzstan", dial_code: "+996", flag: "🇰🇬" },
  { code: "LA", name: "Laos", dial_code: "+856", flag: "🇱🇦" },
  { code: "LV", name: "Latvia", dial_code: "+371", flag: "🇱🇻" },
  { code: "LB", name: "Lebanon", dial_code: "+961", flag: "🇱🇧" },
  { code: "LS", name: "Lesotho", dial_code: "+266", flag: "🇱🇸" },
  { code: "LR", name: "Liberia", dial_code: "+231", flag: "🇱🇷" },
  { code: "LY", name: "Libya", dial_code: "+218", flag: "🇱🇾" },
  { code: "LI", name: "Liechtenstein", dial_code: "+423", flag: "🇱🇮" },
  { code: "LT", name: "Lithuania", dial_code: "+370", flag: "🇱🇹" },
  { code: "LU", name: "Luxembourg", dial_code: "+352", flag: "🇱🇺" },
  { code: "MO", name: "Macao", dial_code: "+853", flag: "🇲🇴" },
  { code: "MK", name: "North Macedonia", dial_code: "+389", flag: "🇲🇰" },
  { code: "MG", name: "Madagascar", dial_code: "+261", flag: "🇲🇬" },
  { code: "MW", name: "Malawi", dial_code: "+265", flag: "🇲🇼" },
  { code: "MY", name: "Malaysia", dial_code: "+60", flag: "🇲🇾" },
  { code: "MV", name: "Maldives", dial_code: "+960", flag: "🇲🇻" },
  { code: "ML", name: "Mali", dial_code: "+223", flag: "🇲🇱" },
  { code: "MT", name: "Malta", dial_code: "+356", flag: "🇲🇹" },
  { code: "MH", name: "Marshall Islands", dial_code: "+692", flag: "🇲🇭" },
  { code: "MR", name: "Mauritania", dial_code: "+222", flag: "🇲🇷" },
  { code: "MU", name: "Mauritius", dial_code: "+230", flag: "🇲🇺" },
  { code: "MX", name: "Mexico", dial_code: "+52", flag: "🇲🇽" },
  { code: "FM", name: "Micronesia", dial_code: "+691", flag: "🇫🇲" },
  { code: "MD", name: "Moldova", dial_code: "+373", flag: "🇲🇩" },
  { code: "MC", name: "Monaco", dial_code: "+377", flag: "🇲🇨" },
  { code: "MN", name: "Mongolia", dial_code: "+976", flag: "🇲🇳" },
  { code: "ME", name: "Montenegro", dial_code: "+382", flag: "🇲🇪" },
  { code: "MA", name: "Morocco", dial_code: "+212", flag: "🇲🇦" },
  { code: "MZ", name: "Mozambique", dial_code: "+258", flag: "🇲🇿" },
  { code: "MM", name: "Myanmar", dial_code: "+95", flag: "🇲🇲" },
  { code: "NA", name: "Namibia", dial_code: "+264", flag: "🇳🇦" },
  { code: "NR", name: "Nauru", dial_code: "+674", flag: "🇳🇷" },
  { code: "NP", name: "Nepal", dial_code: "+977", flag: "🇳🇵" },
  { code: "NL", name: "Netherlands", dial_code: "+31", flag: "🇳🇱" },
  { code: "NZ", name: "New Zealand", dial_code: "+64", flag: "🇳🇿" },
  { code: "NI", name: "Nicaragua", dial_code: "+505", flag: "🇳🇮" },
  { code: "NE", name: "Niger", dial_code: "+227", flag: "🇳🇪" },
  { code: "NG", name: "Nigeria", dial_code: "+234", flag: "🇳🇬" },
  { code: "NO", name: "Norway", dial_code: "+47", flag: "🇳🇴" },
  { code: "OM", name: "Oman", dial_code: "+968", flag: "🇴🇲" },
  { code: "PK", name: "Pakistan", dial_code: "+92", flag: "🇵🇰" },
  { code: "PW", name: "Palau", dial_code: "+680", flag: "🇵🇼" },
  { code: "PS", name: "Palestine", dial_code: "+970", flag: "🇵🇸" },
  { code: "PA", name: "Panama", dial_code: "+507", flag: "🇵🇦" },
  { code: "PG", name: "Papua New Guinea", dial_code: "+675", flag: "🇵🇬" },
  { code: "PY", name: "Paraguay", dial_code: "+595", flag: "🇵🇾" },
  { code: "PE", name: "Peru", dial_code: "+51", flag: "🇵🇪" },
  { code: "PH", name: "Philippines", dial_code: "+63", flag: "🇵🇭" },
  { code: "PL", name: "Poland", dial_code: "+48", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", dial_code: "+351", flag: "🇵🇹" },
  { code: "PR", name: "Puerto Rico", dial_code: "+1", flag: "🇵🇷" },
  { code: "QA", name: "Qatar", dial_code: "+974", flag: "🇶🇦" },
  { code: "RO", name: "Romania", dial_code: "+40", flag: "🇷🇴" },
  { code: "RU", name: "Russia", dial_code: "+7", flag: "🇷🇺" },
  { code: "RW", name: "Rwanda", dial_code: "+250", flag: "🇷🇼" },
  { code: "KN", name: "Saint Kitts and Nevis", dial_code: "+1", flag: "🇰🇳" },
  { code: "LC", name: "Saint Lucia", dial_code: "+1", flag: "🇱🇨" },
  { code: "VC", name: "Saint Vincent and the Grenadines", dial_code: "+1", flag: "🇻🇨" },
  { code: "WS", name: "Samoa", dial_code: "+685", flag: "🇼🇸" },
  { code: "SM", name: "San Marino", dial_code: "+378", flag: "🇸🇲" },
  { code: "ST", name: "Sao Tome and Principe", dial_code: "+239", flag: "🇸🇹" },
  { code: "SA", name: "Saudi Arabia", dial_code: "+966", flag: "🇸🇦" },
  { code: "SN", name: "Senegal", dial_code: "+221", flag: "🇸🇳" },
  { code: "RS", name: "Serbia", dial_code: "+381", flag: "🇷🇸" },
  { code: "SC", name: "Seychelles", dial_code: "+248", flag: "🇸🇨" },
  { code: "SL", name: "Sierra Leone", dial_code: "+232", flag: "🇸🇱" },
  { code: "SG", name: "Singapore", dial_code: "+65", flag: "🇸🇬" },
  { code: "SK", name: "Slovakia", dial_code: "+421", flag: "🇸🇰" },
  { code: "SI", name: "Slovenia", dial_code: "+386", flag: "🇸🇮" },
  { code: "SB", name: "Solomon Islands", dial_code: "+677", flag: "🇸🇧" },
  { code: "SO", name: "Somalia", dial_code: "+252", flag: "🇸🇴" },
  { code: "ZA", name: "South Africa", dial_code: "+27", flag: "🇿🇦" },
  { code: "ES", name: "Spain", dial_code: "+34", flag: "🇪🇸" },
  { code: "LK", name: "Sri Lanka", dial_code: "+94", flag: "🇱🇰" },
  { code: "SD", name: "Sudan", dial_code: "+249", flag: "🇸🇩" },
  { code: "SR", name: "Suriname", dial_code: "+597", flag: "🇸🇷" },
  { code: "SZ", name: "Swaziland", dial_code: "+268", flag: "🇸🇿" },
  { code: "SE", name: "Sweden", dial_code: "+46", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", dial_code: "+41", flag: "🇨🇭" },
  { code: "SY", name: "Syria", dial_code: "+963", flag: "🇸🇾" },
  { code: "TW", name: "Taiwan", dial_code: "+886", flag: "🇹🇼" },
  { code: "TJ", name: "Tajikistan", dial_code: "+992", flag: "🇹🇯" },
  { code: "TZ", name: "Tanzania", dial_code: "+255", flag: "🇹🇿" },
  { code: "TH", name: "Thailand", dial_code: "+66", flag: "🇹🇭" },
  { code: "TG", name: "Togo", dial_code: "+228", flag: "🇹🇬" },
  { code: "TO", name: "Tonga", dial_code: "+676", flag: "🇹🇴" },
  { code: "TT", name: "Trinidad and Tobago", dial_code: "+1", flag: "🇹🇹" },
  { code: "TN", name: "Tunisia", dial_code: "+216", flag: "🇹🇳" },
  { code: "TR", name: "Turkey", dial_code: "+90", flag: "🇹🇷" },
  { code: "TM", name: "Turkmenistan", dial_code: "+993", flag: "🇹🇲" },
  { code: "TV", name: "Tuvalu", dial_code: "+688", flag: "🇹🇻" },
  { code: "UG", name: "Uganda", dial_code: "+256", flag: "🇺🇬" },
  { code: "UA", name: "Ukraine", dial_code: "+380", flag: "🇺🇦" },
  { code: "AE", name: "United Arab Emirates", dial_code: "+971", flag: "🇦🇪" },
  { code: "GB", name: "United Kingdom", dial_code: "+44", flag: "🇬🇧" },
  { code: "US", name: "United States", dial_code: "+1", flag: "🇺🇸" },
  { code: "UY", name: "Uruguay", dial_code: "+598", flag: "🇺🇾" },
  { code: "UZ", name: "Uzbekistan", dial_code: "+998", flag: "🇺🇿" },
  { code: "VU", name: "Vanuatu", dial_code: "+678", flag: "🇻🇺" },
  { code: "VE", name: "Venezuela", dial_code: "+58", flag: "🇻🇪" },
  { code: "VN", name: "Vietnam", dial_code: "+84", flag: "🇻🇳" },
  { code: "YE", name: "Yemen", dial_code: "+967", flag: "🇾🇪" },
  { code: "ZM", name: "Zambia", dial_code: "+260", flag: "🇿🇲" },
  { code: "ZW", name: "Zimbabwe", dial_code: "+263", flag: "🇿🇼" },
];

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sendBtnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find(c => c.code === "US") || countries[0]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const countryBtnRef = useRef<HTMLButtonElement>(null);
  const [locationType, setLocationType] = useState<"corporate" | "branch">("corporate");

  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Filter countries based on search
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dial_code.includes(searchTerm) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    const updatePosition = () => {
      if (showCountryDropdown && countryBtnRef.current) {
        const rect = countryBtnRef.current.getBoundingClientRect();
        setDropdownStyle({
          position: "fixed",
          top: rect.bottom + 8,
          left: rect.left,
          width: Math.max(rect.width, 280),
          zIndex: 9999,
        });
      }
    };

    updatePosition();

    if (showCountryDropdown) {
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
    }

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [showCountryDropdown]);

  // Close dropdown when clicking outside or on escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isDropdownClick = dropdownRef.current && dropdownRef.current.contains(event.target as Node);
      const isMenuClick = menuRef.current && menuRef.current.contains(event.target as Node);

      if (!isDropdownClick && !isMenuClick) {
        setShowCountryDropdown(false);
        setSearchTerm("");
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowCountryDropdown(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // GSAP animations (unchanged, but ensure it's efficient)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-char",
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.5,
          stagger: 0.02,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: "top 95%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".contact-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: "top 95%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".info-card",
        { opacity: 0, x: 50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.4)",
          force3D: true,
          scrollTrigger: {
            trigger: ".info-cards-container",
            start: "top 95%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Validation functions (improved phone validation for flexibility)
  const validateForm = (): boolean => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation - optional, but if provided, check length
    if (formData.phone.trim()) {
      if (formData.phone.length !== 10) {
        newErrors.phone = "Phone number must be exactly 10 digits";
        isValid = false;
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Allow only digits
    if (value.length > 10) value = value.substring(0, 10);
    setFormData({ ...formData, phone: value });

    // Clear phone error when user types
    if (errors.phone) {
      setErrors({ ...errors, phone: "" });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });

    // Clear error for this field when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const selectCountry = (country: Country) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
    setSearchTerm("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting", {
        icon: <AlertCircle className="w-5 h-5" />,
      });
      return;
    }

    const btn = sendBtnRef.current;
    if (!btn) return;

    setIsSending(true);

    // Combine country code with phone number (remove formatting)
    const digitsOnly = formData.phone.replace(/\D/g, '');
    const fullPhoneNumber = selectedCountry.dial_code + digitsOnly;

    const submissionData = {
      ...formData,
      phone: fullPhoneNumber,
      country_code: selectedCountry.code
    };

    // Button animation (unchanged)
    const icon = btn.querySelector(".send-icon");
    const btnText = btn.querySelector(".btn-text");

    if (icon && btnText) {
      const tl = gsap.timeline();
      tl.to(btn, { scale: 0.96, duration: 0.1 });
      tl.to(
        icon,
        {
          x: 250,
          y: -100,
          rotation: 35,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        0
      );
      tl.to(btnText, { opacity: 0, duration: 0.15 }, 0.05);
      tl.to(btn, {
        scale: 1,
        duration: 0.25,
        ease: "elastic.out(1, 0.6)",
      }, 0.25);
      tl.set(icon, { x: 0, y: 0, rotation: 0, opacity: 1 }, 1);
      tl.to(btnText, { opacity: 1, duration: 0.25 }, 1);
    }

    // API call
    try {
      const response = await fetch(
        "https://mediamaticstudio.com/api/contact/send/",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      toast.success("Message sent successfully!", {
        description: "We'll get back to you soon.",
        icon: <CheckCircle className="w-5 h-5" />,
      });

      setShowSuccess(true);

      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({ name: "", email: "", phone: "", message: "" });

    } catch (error: unknown) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Please try again later";
      toast.error("Something went wrong", {
        description: errorMessage,
      });
    } finally {
      setIsSending(false);
    }
  };

  const splitHeading = (text: string) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="contact-char inline-block text-inherit"
        style={{ display: char === " " ? "inline" : "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen bg-background py-12 md:py-16 relative overflow-hidden">
      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Message Sent!"
        message="Thank you for reaching out! We've received your message and will be in touch shortly."
      />
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `
          radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)
        `,
        backgroundSize: "50px 50px",
      }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14" style={{ perspective: "1000px" }}>
          <span className="block text-base font-semibold tracking-wider text-foreground/40 mb-4 uppercase">
            Get In Touch
          </span>
          <h2 className="text-[clamp(3rem,10vw,7.5rem)] font-black text-foreground leading-[0.85] mb-12 flex flex-col md:flex-row items-center md:items-baseline justify-center md:gap-6">
            <span className="text-inherit uppercase">{splitHeading("Contact")}</span>
            <span className="italic font-normal text-foreground/60 text-[0.35em] md:text-[0.3em] tracking-tight">{splitHeading("Us")}</span>
          </h2>
          <div className="w-24 h-[1.5px] bg-foreground/30 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Form */}
          <div>
            <p className="contact-item text-lg md:text-xl text-foreground/50 mb-8">
              You have a project in mind? Let's create something amazing together for you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name Field */}
              <div className="contact-item">
                <label className="block text-base md:text-sm font-bold text-foreground/80 mb-2 uppercase tracking-[0.15em]">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className={`w-full px-5 py-3 bg-transparent border-[1.5px] rounded-xl focus:outline-none transition-all text-foreground placeholder:text-foreground/50 font-medium text-lg md:text-base ${errors.name ? "border-red-500" : "border-foreground/20 focus:border-foreground"
                    }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="contact-item">
                <label className="block text-base md:text-sm font-bold text-foreground/80 mb-2 uppercase tracking-[0.15em]">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className={`w-full px-5 py-3 bg-transparent border-[1.5px] rounded-xl focus:outline-none transition-all text-foreground placeholder:text-foreground/50 font-medium text-lg md:text-base ${errors.email ? "border-red-500" : "border-foreground/20 focus:border-foreground"
                    }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Input with Country Dropdown */}
              <div className="contact-item">
                <label className="block text-base md:text-sm font-bold text-foreground/80 mb-2 uppercase tracking-[0.15em]">
                  Phone Number {formData.phone.length > 0 ? "" : "(Optional)"}
                </label>
                <div className="relative" ref={dropdownRef}>
                  <div className="flex flex-row gap-2">
                    {/* Country Code Selector */}
                    <div className="relative flex-shrink-0">
                      <button
                        ref={countryBtnRef}
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="flex items-center gap-2 px-3 md:px-4 py-3 bg-transparent border-[1.5px] border-foreground/20 rounded-xl hover:border-foreground/50 transition-colors text-foreground font-medium min-w-[100px] md:min-w-[130px] justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <ReactCountryFlag
                            countryCode={selectedCountry.code}
                            svg
                            style={{ width: '22px', height: '16px' }}
                          />
                          <span className="text-xs md:text-sm font-bold tracking-tight">{selectedCountry.dial_code}</span>
                        </span>
                        <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 ${showCountryDropdown ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu - Improved positioning and responsiveness */}
                      {showCountryDropdown &&
                        dropdownStyle &&
                        createPortal(
                          <div
                            ref={menuRef}
                            style={dropdownStyle}
                            className="bg-[#faf3e0] border-2 border-[#652b32]/20 rounded-xl shadow-[0_10px_40px_-10px_rgba(101,43,50,0.3)] overflow-hidden text-left"
                            role="listbox"
                          >
                            {/* Search */}
                            <div className="p-3 border-b border-[#652b32]/10 bg-[#faf3e0] sticky top-0 z-10">
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#652b32]/50" />
                                <input
                                  type="text"
                                  value={searchTerm}
                                  onChange={(e) => setSearchTerm(e.target.value)}
                                  placeholder="Search country..."
                                  className="w-full pl-10 pr-4 py-3 bg-[#652b32]/5 border border-[#652b32]/10 rounded-lg text-[#652b32] text-sm focus:outline-none"
                                  autoFocus
                                />
                              </div>
                            </div>

                            {/* List */}
                            <div className="max-h-[300px] overflow-y-auto">
                              {filteredCountries.length ? (
                                filteredCountries.map((country) => (
                                  <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => selectCountry(country)}
                                    className="w-full px-4 py-3 flex items-center gap-4 hover:bg-[#652b32]/5 text-left transition-colors group"
                                  >
                                    <div className="w-8 flex-shrink-0">
                                      <ReactCountryFlag
                                        countryCode={country.code}
                                        svg
                                        style={{ width: '24px', height: '18px' }}
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-sm font-bold text-[#652b32]/80 group-hover:text-[#652b32]">{country.name}</div>
                                      <div className="text-xs font-medium opacity-60">{country.dial_code}</div>
                                    </div>
                                    {selectedCountry.code === country.code && (
                                      <Check className="w-4 h-4 text-[#652b32]" />
                                    )}
                                  </button>
                                ))
                              ) : (
                                <div className="p-6 text-center text-sm opacity-60">
                                  No countries found
                                </div>
                              )}
                            </div>
                          </div>,
                          document.body
                        )}

                    </div>

                    {/* Phone Number Input */}
                    <div className="flex-1 min-w-0">
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className={`w-full px-4 md:px-5 py-3 bg-transparent border-[1.5px] rounded-xl focus:outline-none transition-all text-foreground placeholder:text-foreground/50 font-medium text-lg md:text-base ${errors.phone ? "border-red-500" : "border-foreground/20 focus:border-foreground"
                          }`}
                        placeholder="Enter 10-digit number"
                        maxLength={10}
                      />
                      <div className="mt-1 text-[10px] md:text-xs text-foreground/40 hidden sm:block">
                        {formData.phone ? `${formData.phone.length}/10 digits` : "Enter phone number (optional)"}
                      </div>
                    </div>
                  </div>

                  {/* Phone error message */}
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}

                  {/* Display full number preview */}
                  {formData.phone && !errors.phone && (
                    <div className="mt-2 text-xs text-foreground/60">
                      Full number: {selectedCountry.dial_code} {formData.phone}
                    </div>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div className="contact-item">
                <label className="block text-base md:text-sm font-bold text-foreground/80 mb-2 uppercase tracking-[0.15em]">
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                  rows={5}
                  className={`w-full px-5 py-3 bg-transparent border-[1.5px] rounded-xl focus:outline-none transition-all resize-none text-foreground placeholder:text-foreground/50 font-medium text-lg md:text-base ${errors.message ? "border-red-500" : "border-foreground/20 focus:border-foreground"
                    }`}
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message}
                  </p>
                )}
                <div className="mt-1 text-xs text-foreground/40">
                  {formData.message ? `${formData.message.length} characters` : "Minimum 10 characters required"}
                </div>
              </div>

              {/* Submit Button */}
              <button
                ref={sendBtnRef}
                type="submit"
                disabled={isSending}
                className="contact-item group w-full py-3 px-6 bg-foreground text-background rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-strong transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden relative text-sm uppercase tracking-wider"
              >
                <span className="btn-text">{isSending ? "Sending..." : "Send Message"}</span>
                <Send className="send-icon w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </form>
          </div>

          {/* Info Cards */}
          <div>
            <div className="flex gap-3 mb-6">
              <button
                type="button"
                onClick={() => setLocationType("corporate")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition
                ${locationType === "corporate"
                    ? "bg-foreground text-background"
                    : "border border-foreground/30 text-foreground/60 hover:text-foreground"}
              `}
              >
                Corporate
              </button>

              <button
                type="button"
                onClick={() => setLocationType("branch")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition
                ${locationType === "branch"
                    ? "bg-foreground text-background"
                    : "border border-foreground/30 text-foreground/60 hover:text-foreground"}
              `}
              >
                Branch
              </button>
            </div>

            <div className="info-cards-container flex flex-col justify-center gap-5">
              {locationType === "corporate" ? (
                <>
                  {/* CORPORATE DETAILS */}
                  <a href="mailto:support@mediamaticstudio.com" className="block">
                    <div className="info-card p-5 md:p-6 rounded-2xl border-2 border-foreground/10 flex gap-4 hover:border-foreground/25 transition group">
                      <div className="w-12 h-12 rounded-xl border-2 border-foreground/15 flex items-center justify-center">
                        <Mail className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider">Email Us</h3>
                        <span className="text-foreground/50 text-sm flex items-center gap-1">
                          support@mediamaticstudio.com <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </a>

                  <a href={`tel:919629593615`}>
                    <div className="info-card p-5 md:p-6 rounded-2xl border-2 border-foreground/10 flex gap-4 hover:border-foreground/25 transition group">
                      <div className="w-12 h-12 rounded-xl border-2 border-foreground/15 flex items-center justify-center">
                        <Phone className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider">Call Us</h3>
                        <p className="text-foreground/50 text-sm">
                          +91  96295 93615
                        </p>
                        <p className="text-foreground/35 text-xs">US Toll Free: (+1) 888 219 5755</p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://www.google.com/maps?q=COVAI+TECH+PARK,+Kalapatty,+Coimbatore"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="info-card p-5 md:p-6 rounded-2xl border-2 border-foreground/10 flex gap-4 hover:border-foreground/25 transition group">
                      <div className="w-12 h-12 rounded-xl border-2 border-foreground/15 flex items-center justify-center">
                        <MapPin className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider">Visit Us</h3>
                        <p className="text-foreground/50 text-xs">
                          COVAI TECH PARK, Site No: 90,<br />
                          Kovai Thiru Nagar, Kalapatty Village,<br />
                          Coimbatore – 641 014
                        </p>
                      </div>
                    </div>
                  </a>
                </>
              ) : (
                <>
                  {/* BRANCH DETAILS */}
                  <a href="mailto:branch@mediamaticstudio.com">
                    <div className="info-card p-5 md:p-6 rounded-2xl border-2 border-foreground/10 flex gap-4 hover:border-foreground/25 transition group">
                      <div className="w-12 h-12 rounded-xl border-2 border-foreground/15 flex items-center justify-center">
                        <Mail className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider">Email Us</h3>
                        <span className="text-foreground/50 text-sm flex items-center gap-1">
                          support@mediamaticstudio.com <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </a>

                  <a href="tel:+919600506094">
                    <div className="info-card p-5 md:p-6 rounded-2xl border-2 border-foreground/10 flex gap-4 hover:border-foreground/25 transition group">
                      <div className="w-12 h-12 rounded-xl border-2 border-foreground/15 flex items-center justify-center">
                        <Phone className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider">Call Us</h3>
                        <p className="text-foreground/50 text-sm">+91 9600506094</p>
                        <p className="text-foreground/50 text-sm">0422-4772362</p>
                      </div>
                    </div>
                  </a>

                  <div className="flex flex-col gap-6">
                    <a
                      href="https://maps.app.goo.gl/ys3qZ3vK76G2DdhN9"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="info-card p-5 md:p-6 rounded-2xl border-2 border-foreground/10 flex gap-4">
                        <div className="w-12 h-12 rounded-xl border-2 border-foreground/15 flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm uppercase tracking-wider">Coimbatore Branch</h3>
                          <p className="text-foreground/50 text-xs mt-2 leading-relaxed">
                            Civil Aerodrome Post, No. 97,<br />
                            Dr. Jaganathanagar,<br />
                            Coimbatore – 641 014
                          </p>
                        </div>
                      </div>
                    </a>

                    <a
                      href="https://www.google.com/maps/search/?api=1&query=MediaMatic+Studio+Private+Limited+Ejipura+Bengaluru"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="info-card p-5 md:p-6 rounded-2xl border-2 border-foreground/10 flex gap-4">
                        <div className="w-12 h-12 rounded-xl border-2 border-foreground/15 flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm uppercase tracking-wider">Bengaluru Branch</h3>
                          <p className="text-foreground/50 text-xs mt-2 leading-relaxed">
                            MediaMatic Studio Pvt Ltd,<br />
                            2nd Floor, No. 46, 29th Cross,<br />
                            Ejipura Main Road, Koramangala,<br />
                            Bengaluru – 560 047
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};    
