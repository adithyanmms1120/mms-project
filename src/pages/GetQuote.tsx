import { useState, useCallback, useRef, useEffect } from "react";
import { Send, ChevronDown, Phone, Mail, MapPin, Search, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import ReactCountryFlag from "react-country-flag";
import { createPortal } from "react-dom";
import { SuccessPopup } from "@/components/SuccessPopup";

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
        startDate: "",
        selectedService: "",
        message: "",
    });

    const [isSending, setIsSending] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
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

            try {
                // Use the centralized API function
                const { sendQuoteRequest } = await import("@/services/api");
                await sendQuoteRequest(formData);

                toast.success("Quote request sent successfully!", {
                    description: "We'll get back to you within 24-48 hours.",
                });

                setShowSuccess(true);

                setFormData({
                    firstName: "",
                    lastName: "",
                    phone: "",
                    dialCode: "+1",
                    countryCode: "US",
                    email: "",
                    startDate: "",
                    selectedService: "",
                    message: "",
                });
                setErrors({});
            } catch (error: any) {
                console.error("Quote submission error:", error);
                toast.error("Failed to send request", {
                    description: error.message || "Please check your connection and try again.",
                });
            } finally {
                setIsSending(false);
            }
        },
        [formData, validateForm]
    );

    const update = (key: string, value: any) =>
        setFormData((prev) => ({ ...prev, [key]: value }));

    return (
        <>
            <SEO
                title="Get in Touch | MediaMatic Studio"
                description="Share your project details and get a customized quote."
                canonical="/contact-us/"
            />

            <SuccessPopup
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="Quote Request Sent!"
                message="Thank you for your interest! We have received your details and will get back to you with a customized quote within 24-48 hours."
            />

            <main className="min-h-screen bg-[#faf3e0] font-sans text-[#652b32] flex items-center justify-center px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-8 md:pb-12 lg:pb-16 relative overflow-hidden">
                <div className="w-full max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">

                        {/* LEFT SIDE - Header & Form */}
                        <div className="space-y-6 md:space-y-8">
                            {/* Title Section */}
                            <div>
                                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#652b32] leading-tight">
                                    Get In Touch
                                </h1>
                                <p className="mt-4 text-sm text-[#652b32]/50 leading-relaxed max-w-lg">
                                    I'd like to hear from you! Whether you have questions, need support, or want to discuss a project, feel free to reach out.
                                </p>
                            </div>

                            {/* Form */}
                            <div className="bg-white/50 backdrop-blur-sm border border-[#652b32]/10 rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl">
                                <QuoteForm
                                    formData={formData}
                                    errors={errors}
                                    isSending={isSending}
                                    update={update}
                                    handleSubmit={handleSubmit}
                                />
                            </div>
                        </div>

                        {/* RIGHT SIDE - Contact Cards */}
                        <div className="lg:sticky lg:top-8">
                            {/* Contact Cards */}
                            <div className="grid gap-3 md:gap-4">
                                {/* Phone & Email Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                    {/* Phone Card */}
                                    <div className="bg-white/50 backdrop-blur-sm border border-[#652b32]/10 rounded-xl md:rounded-2xl p-4 md:p-6 group hover:shadow-lg transition-all duration-300">
                                        <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#652b32]/10 flex items-center justify-center group-hover:bg-[#652b32]/20 transition">
                                                <Phone className="text-[#652b32]" size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-xs md:text-sm text-[#652b32] mb-1">Call Us</h3>
                                                <p className="text-xs md:text-sm text-[#652b32]/80 font-semibold">+91 96295 93615</p>
                                                <p className="text-[10px] md:text-xs text-[#652b32]/60 mt-1">US Toll Free: (+1) 888 219 5755</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email Card */}
                                    <div className="bg-white/50 backdrop-blur-sm border border-[#652b32]/10 rounded-xl md:rounded-2xl p-4 md:p-6 group hover:shadow-lg transition-all duration-300">
                                        <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#652b32]/10 flex items-center justify-center group-hover:bg-[#652b32]/20 transition">
                                                <Mail className="text-[#652b32]" size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-xs md:text-sm text-[#652b32] mb-1">Email Us</h3>
                                                <p className="text-xs md:text-sm text-[#652b32]/80 break-all">support@mediamaticstudio.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Address Card */}
                                <div className="bg-white/50 backdrop-blur-sm border border-[#652b32]/10 rounded-xl md:rounded-2xl p-4 md:p-6 group hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-start gap-3 md:gap-4">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#652b32]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#652b32]/20 transition">
                                            <MapPin className="text-[#652b32]" size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-xs md:text-sm text-[#652b32] mb-1 md:mb-2">Corporate Address</h3>
                                            <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-[#652b32]/80">
                                                <p className="leading-relaxed">
                                                    COVAI TECH PARK, Site No: 90,<br />
                                                    Kovai Thiru Nagar, Kalapatty Village,<br />
                                                    Coimbatore – 641 014
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Branch Coimbatore */}
                                <div className="bg-white/50 backdrop-blur-sm border border-[#652b32]/10 rounded-xl md:rounded-2xl p-4 md:p-6 group hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-start gap-3 md:gap-4">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#652b32]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#652b32]/20 transition">
                                            <MapPin className="text-[#652b32]" size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-xs md:text-sm text-[#652b32] mb-1 md:mb-2">Branch Office – Coimbatore</h3>
                                            <p className="text-xs md:text-sm text-[#652b32]/80 leading-relaxed mb-1 md:mb-2">
                                                Civil Aerodrome Post, No. 97,<br />
                                                Dr. Jaganathanagar,<br />
                                                Coimbatore – 641 014
                                            </p>
                                            <p className="text-xs md:text-sm text-[#652b32] font-semibold">+91 9600506094, 0422-4772362</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Branch Bangalore */}
                                <div className="bg-white/50 backdrop-blur-sm border border-[#652b32]/10 rounded-xl md:rounded-2xl p-4 md:p-6 group hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-start gap-3 md:gap-4">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#652b32]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#652b32]/20 transition">
                                            <MapPin className="text-[#652b32]" size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-xs md:text-sm text-[#652b32] mb-1 md:mb-2">Branch Office – Bangalore</h3>
                                            <p className="text-xs md:text-sm text-[#652b32]/80 leading-relaxed">
                                                MediaMatic Studio Private Limited<br />
                                                2nd Floor, No. 46, 29th Cross Ejipura Main Road,<br />
                                                Intermediate Ring Rd, off. Koramangala,<br />
                                                Bengaluru – 560047
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
    <form onSubmit={handleSubmit} className="space-y-5 text-[#652b32]">
        <div className="grid grid-cols-2 gap-4">
            <FormField
                placeholder="First Name"
                value={formData.firstName}
                error={errors.firstName}
                onChange={(v: string) => update("firstName", v)}
            />
            <FormField
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(v: string) => update("lastName", v)}
            />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
            <PhoneField
                value={formData.phone}
                dialCode={formData.dialCode}
                countryCode={formData.countryCode}
                onPhoneChange={(v: string) => update("phone", v)}
                onCountryChange={(code: string, dial: string) => {
                    update("countryCode", code);
                    update("dialCode", dial);
                }}
                error={errors.phone}
            />

            <FormField
                placeholder="E-mail"
                value={formData.email}
                error={errors.email}
                onChange={(v: string) => update("email", v)}
                type="email"
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-[#652b32] block">When do you want to start the project?</label>
            <input
                type="date"
                value={formData.startDate}
                onChange={(e) => update("startDate", e.target.value)}
                className="w-full bg-[#652b32]/5 border border-[#652b32]/20 rounded-xl px-4 py-3.5 outline-none text-[#652b32] placeholder:text-[#652b32]/40 text-sm transition focus:border-[#652b32]/40 hover:border-[#652b32]/30"
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-[#652b32] block">What are you looking for?</label>
            <div className="relative">
                <select
                    value={formData.selectedService}
                    onChange={(e) => update("selectedService", e.target.value)}
                    className={`w-full bg-[#652b32]/5 border rounded-xl px-4 py-3.5 outline-none text-[#652b32] text-sm appearance-none cursor-pointer transition hover:border-[#652b32]/30 focus:border-[#652b32]/40 ${errors.service ? "border-red-500" : "border-[#652b32]/20"
                        }`}
                >
                    <option value="" className="text-[#652b32]/60">—Please choose an option—</option>
                    {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#652b32]">
                    <ChevronDown size={18} />
                </div>
            </div>
            {errors.service && (
                <p className="text-red-500 text-xs mt-1">{errors.service}</p>
            )}
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-[#652b32] block">Message</label>
            <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => update("message", e.target.value)}
                className={`w-full bg-[#652b32]/5 border rounded-xl px-4 py-3.5 outline-none text-[#652b32] placeholder:text-[#652b32]/40 text-sm transition resize-none hover:border-[#652b32]/30 focus:border-[#652b32]/40 ${errors.message ? "border-red-500" : "border-[#652b32]/20"
                    }`}
            />
            {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
        </div>

        <button
            type="submit"
            disabled={isSending}
            className="w-full py-3.5 bg-[#652b32] hover:bg-[#522228] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
            {isSending ? "Submitting..." : "Submit Message"}
        </button>
    </form>
);

const PhoneField = ({ value, dialCode, countryCode, onPhoneChange, onCountryChange, error }: any) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties | null>(null);

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.dial_code.includes(searchTerm) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update dropdown position
    useEffect(() => {
        const updatePosition = () => {
            if (showDropdown && buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                setDropdownStyle({
                    position: "fixed",
                    top: rect.bottom + 8,
                    left: rect.left,
                    width: Math.max(rect.width, 320),
                    zIndex: 9999,
                });
            }
        };

        updatePosition();

        if (showDropdown) {
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
        }

        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [showDropdown]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const isDropdownClick = dropdownRef.current && dropdownRef.current.contains(event.target as Node);
            const isMenuClick = menuRef.current && menuRef.current.contains(event.target as Node);

            if (!isDropdownClick && !isMenuClick) {
                setShowDropdown(false);
                setSearchTerm("");
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setShowDropdown(false);
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

    const selectCountry = (country: Country) => {
        onCountryChange(country.code, country.dial_code);
        setShowDropdown(false);
        setSearchTerm("");
    };

    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                {/* Country Code Selector */}
                <div className="relative flex-shrink-0" ref={dropdownRef}>
                    <button
                        ref={buttonRef}
                        type="button"
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-2 px-3 py-3.5 bg-[#652b32]/5 border border-[#652b32]/20 rounded-xl hover:border-[#652b32]/40 transition-colors text-[#652b32] font-medium min-w-[110px] justify-between"
                    >
                        <span className="flex items-center gap-2">
                            <ReactCountryFlag
                                countryCode={countryCode}
                                svg
                                style={{ width: '22px', height: '16px' }}
                            />
                            <span className="text-sm font-bold">{dialCode}</span>
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu Portal */}
                    {showDropdown &&
                        dropdownStyle &&
                        createPortal(
                            <div
                                ref={menuRef}
                                style={dropdownStyle}
                                className="bg-white border-2 border-[#652b32]/20 rounded-xl shadow-[0_10px_40px_-10px_rgba(101,43,50,0.3)] overflow-hidden"
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
                                            className="w-full pl-10 pr-4 py-3 bg-white border border-[#652b32]/20 rounded-lg text-[#652b32] text-sm focus:outline-none focus:border-[#652b32]/40 placeholder:text-[#652b32]/40"
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                {/* Country List */}
                                <div className="max-h-[300px] overflow-y-auto bg-white">
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
                                                    <div className="text-xs font-medium text-[#652b32]/50">{country.dial_code}</div>
                                                </div>
                                                {countryCode === country.code && (
                                                    <Check className="w-4 h-4 text-[#652b32]" />
                                                )}
                                            </button>
                                        ))
                                    ) : (
                                        <div className="p-6 text-center text-sm text-[#652b32]/60">
                                            No countries found
                                        </div>
                                    )}
                                </div>
                            </div>,
                            document.body
                        )}
                </div>

                {/* Phone Number Input */}
                <div className="flex-1">
                    <input
                        type="tel"
                        value={value}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            onPhoneChange(val);
                        }}
                        placeholder="Phone No"
                        className={`w-full px-4 py-3.5 bg-[#652b32]/5 border rounded-xl outline-none text-[#652b32] placeholder:text-[#652b32]/40 text-sm transition hover:border-[#652b32]/30 focus:border-[#652b32]/40 ${error ? "border-red-500" : "border-[#652b32]/20"
                            }`}
                    />
                </div>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

const FormField = ({
    placeholder,
    value,
    onChange,
    error,
    type = "text",
}: any) => (
    <div className="space-y-2">
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full bg-[#652b32]/5 border rounded-xl px-4 py-3.5 outline-none text-[#652b32] placeholder:text-[#652b32]/40 text-sm transition hover:border-[#652b32]/30 focus:border-[#652b32]/40 ${error ? "border-red-500" : "border-[#652b32]/20"
                }`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

export default GetQuote;
