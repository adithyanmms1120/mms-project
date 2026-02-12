import { useState, useCallback, useRef, useEffect } from "react";
import { Send, ChevronDown, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import ReactCountryFlag from "react-country-flag";

interface Country {
    code: string;
    name: string;
    dial_code: string;
    flag: string;
}

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
    { code: "AU", name: "Australia", dial_code: "+61", flag: "🇦🇺" },
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
    { code: "BG", name: "Bulgaria", dial_code: "+359", flag: "🇧🇬" },
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
    { code: " PH", name: "Philippines", dial_code: "+63", flag: "🇵🇭" },
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

const services = [
    "All Services",
    "2D & 3D Animation Videos",
    "Website Development",
    "Mobile App Development",
    "Branding",
    "Digital Marketing",
    "VPS Web Hosting Services",
];

const GetQuote = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        dialCode: "+1",
        countryCode: "US",
        email: "",
        selectedService: "",
        message: "",
    });

    const [isSending, setIsSending] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = useCallback(() => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName.trim())
            newErrors.firstName = "First name is required";

        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Valid email required";

        if (formData.phone && formData.phone.length !== 10)
            newErrors.phone = "Phone number must be exactly 10 digits";

        if (!formData.selectedService)
            newErrors.service = "Please select a service";

        if (!formData.message.trim())
            newErrors.message = "Message is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (!validateForm()) return;

            setIsSending(true);

            setTimeout(() => {
                setIsSending(false);
                toast.success("Inquiry sent successfully!", {
                    description: "We'll get back to you shortly.",
                });

                setFormData({
                    firstName: "",
                    lastName: "",
                    phone: "",
                    dialCode: "+1",
                    countryCode: "US",
                    email: "",
                    selectedService: "",
                    message: "",
                });

                setErrors({});
            }, 1500);
        },
        [validateForm]
    );

    const update = (key: string, value: any) =>
        setFormData((prev) => ({ ...prev, [key]: value }));

    return (
        <>
            <SEO
                title="Get in Touch | MediaMatic Studio"
                description="Share your project details and get a customized quote."
                canonical="/get-quote"
            />

            <main className="min-h-screen bg-[#faf3e0] font-sans text-[#652b32]">
                {/* Top Bar */}
                <nav className="flex items-center justify-center py-6">
                    <Link to="/" className="text-sm tracking-wide">
                        ☰
                    </Link>
                </nav>

                <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

                        {/* LEFT SIDE */}
                        <div className="space-y-12">

                            {/* Intro */}
                            <div>
                                <h1 className="text-5xl lg:text-6xl font-medium tracking-tight">
                                    Get in Touch
                                </h1>

                                <p className="mt-6 text-lg font-medium">
                                    I'd like to hear from you!
                                </p>

                                <p className="mt-3 leading-relaxed max-w-md text-[#652b32]/80">
                                    If you have any inquiries or just want to say hi, please use
                                    the contact form. We'll help you build something remarkable.
                                </p>
                            </div>

                            {/* FORM - Mobile */}
                            <div className="lg:hidden">
                                <QuoteForm
                                    formData={formData}
                                    errors={errors}
                                    isSending={isSending}
                                    update={update}
                                    handleSubmit={handleSubmit}
                                />
                            </div>

                            {/* Address Section */}
                            <div className="space-y-8">

                                {/* Corporate */}
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-widest mb-3 text-[#652b32]">
                                        Corporate Address
                                    </p>
                                    <p className="text-base leading-relaxed opacity-90">
                                        COVAI TECH PARK, Site No: 90,<br />
                                        Kovai Thiru Nagar, Kalapatty Village,<br />
                                        Coimbatore – 641 014
                                    </p>
                                    <p className="text-base font-semibold mt-2 opacity-90">+91 96295 93615</p>
                                </div>

                                {/* Coimbatore Branch */}
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-widest mb-3 text-[#652b32]">
                                        Branch Office – Coimbatore
                                    </p>
                                    <p className="text-base leading-relaxed opacity-90">
                                        Civil Aerodrome Post, No. 97,<br />
                                        Dr. Jaganathanagar,<br />
                                        Coimbatore – 641 014
                                    </p>
                                    <p className="text-base font-semibold mt-2 opacity-90">
                                        +91 9600506094, 0422-4772362
                                    </p>
                                </div>

                                {/* Bangalore Branch */}
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-widest mb-3 text-[#652b32]">
                                        Branch Office – Bangalore
                                    </p>
                                    <p className="text-base leading-relaxed opacity-90">
                                        MediaMatic Studio Private Limited<br />
                                        2nd Floor, No. 46, 29th Cross Ejipura Main Road,<br />
                                        Intermediate Ring Rd, off. Koramangala,<br />
                                        Bengaluru – 560047
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* RIGHT SIDE - Desktop Form */}
                        <div className="hidden lg:block">
                            <QuoteForm
                                formData={formData}
                                errors={errors}
                                isSending={isSending}
                                update={update}
                                handleSubmit={handleSubmit}
                            />
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
};

const QuoteForm = ({
    formData,
    errors,
    isSending,
    update,
    handleSubmit,
}: any) => (
    <form onSubmit={handleSubmit} className="space-y-5">

        <div className="grid grid-cols-2 gap-4">
            <FormField
                label="First Name *"
                value={formData.firstName}
                error={errors.firstName}
                onChange={(v: string) => update("firstName", v)}
            />
            <FormField
                label="Last Name"
                value={formData.lastName}
                onChange={(v: string) => update("lastName", v)}
            />
        </div>

        <FormField
            label="Email *"
            value={formData.email}
            error={errors.email}
            onChange={(v: string) => update("email", v)}
            type="email"
        />

        <PhoneField
            label="Phone"
            value={formData.phone}
            dialCode={formData.dialCode}
            countryCode={formData.countryCode}
            onPhoneChange={(v: string) => update("phone", v)}
            onCountryChange={(code: string, dial: string) => {
                update("countryCode", code);
                update("dialCode", dial);
            }}
        />

        {/* Services Dropdown */}
        <div>
            <label className="block text-sm mb-1.5">Select Service *</label>
            <select
                value={formData.selectedService}
                onChange={(e) => update("selectedService", e.target.value)}
                className={`w-full px-4 py-3 border rounded-md outline-none transition ${errors.service
                    ? "border-red-500"
                    : "border-[#652b32]/30 focus:border-[#652b32]"
                    }`}
            >
                <option value="">-- Choose a Service --</option>
                {services.map((service) => (
                    <option key={service} value={service}>
                        {service}
                    </option>
                ))}
            </select>

            {errors.service && (
                <p className="text-red-500 text-xs mt-1">{errors.service}</p>
            )}
        </div>

        {/* Message */}
        <div>
            <label className="block text-sm mb-1.5">Message *</label>
            <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => update("message", e.target.value)}
                className={`w-full px-4 py-3 border rounded-md outline-none transition resize-none ${errors.message
                    ? "border-red-500"
                    : "border-[#652b32]/30 focus:border-[#652b32]"
                    }`}
            />
            {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
        </div>

        <div className="flex justify-end">
            <button
                type="submit"
                disabled={isSending}
                className="px-8 py-3 bg-[#652b32] text-white rounded-md text-sm hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
            >
                {isSending ? "Sending..." : "Send"}
                <Send size={16} />
            </button>
        </div>
    </form>
);

const PhoneField = ({ label, value, dialCode, countryCode, onPhoneChange, onCountryChange }: any) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCountries = countries.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.dial_code.includes(searchQuery)
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative">
            <label className="block text-sm mb-1.5">{label}</label>
            <div className="flex">
                {/* Flag Dropdown Trigger */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="h-full px-3 flex items-center gap-2 border border-r-0 border-[#652b32]/30 rounded-l-md hover:bg-[#652b32]/5 transition"
                    >
                        <ReactCountryFlag
                            countryCode={countryCode}
                            svg
                            style={{ width: '20px', height: '15px' }}
                        />
                        <span className="text-sm font-medium">{dialCode}</span>
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Custom Dropdown */}
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-72 max-h-80 bg-[#faf3e0] border border-[#652b32]/10 rounded-xl shadow-2xl z-[60] overflow-hidden flex flex-col">
                            <div className="p-3 border-b border-[#652b32]/10">
                                <input
                                    type="text"
                                    placeholder="Search country or code..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-3 py-2 bg-white/50 border border-[#652b32]/20 rounded-lg text-xs outline-none focus:border-[#652b32] transition"
                                    autoFocus
                                />
                            </div>
                            <div className="overflow-y-auto flex-1 custom-scrollbar">
                                {filteredCountries.map((c) => (
                                    <button
                                        key={c.code}
                                        type="button"
                                        onClick={() => {
                                            onCountryChange(c.code, c.dial_code);
                                            setIsDropdownOpen(false);
                                            setSearchQuery("");
                                        }}
                                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#652b32]/5 transition group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <ReactCountryFlag
                                                countryCode={c.code}
                                                svg
                                                style={{ width: '20px', height: '15px' }}
                                            />
                                            <span className="text-sm text-[#652b32]/80 group-hover:text-[#652b32]">{c.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-[#652b32]/40 group-hover:text-[#652b32]/60">{c.dial_code}</span>
                                            {countryCode === c.code && <Check size={14} className="text-[#652b32]" />}
                                        </div>
                                    </button>
                                ))}
                                {filteredCountries.length === 0 && (
                                    <div className="p-4 text-center text-sm text-[#652b32]/40">No results found</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Phone Input */}
                <input
                    type="tel"
                    value={value}
                    onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        onPhoneChange(val);
                    }}
                    placeholder="Enter 10-digit number"
                    className="flex-1 px-4 py-3 border border-[#652b32]/30 rounded-r-md outline-none focus:border-[#652b32] transition"
                />
            </div>
        </div>
    );
};

const FormField = ({
    label,
    value,
    onChange,
    error,
    type = "text",
}: any) => (
    <div>
        <label className="block text-sm mb-1.5">{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full px-4 py-3 border rounded-md outline-none transition ${error
                ? "border-red-500"
                : "border-[#652b32]/30 focus:border-[#652b32]"
                }`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

export default GetQuote;
