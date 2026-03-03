import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { sendQuoteRequest } from "@/services/api";
import { SuccessPopup } from "@/components/SuccessPopup";



const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    phone: z.string().min(10, "Phone number must be at least 10 digits").max(10, "Phone number must be 10 digits"),
    date: z.string().min(1, "Date is required"),
    slotTime: z.string().min(1, "Time slot is required"),
    message: z.string().min(1, "Message is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface PodcastBookingDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export const PodcastBookingDialog: React.FC<PodcastBookingDialogProps> = ({
    isOpen,
    onOpenChange,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const dialCode = "+91";

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            date: "",
            slotTime: "",
            message: "",
        },
    });



    const onSubmit = async (values: FormValues) => {
        setIsSubmitting(true);
        try {
            const fullPhone = dialCode + values.phone;
            await sendQuoteRequest({
                ...values,
                phone: fullPhone,
                source: "Podcast Studio booking",
                type: "Podcast Booking",
            });

            setShowSuccess(true);
            form.reset();
        } catch (error) {
            toast.error("Failed to send request", {
                description: "Please try again later or contact us directly.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <SuccessPopup
                isOpen={showSuccess}
                onClose={() => {
                    setShowSuccess(false);
                    onOpenChange(false);
                }}
                title="Booking Request Sent!"
                message="Thank you for choosing our Podcast Studio! Our team will contact you shortly to confirm your session."
            />

            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[700px] max-h-[95vh] overflow-y-auto p-0 border-none bg-white shadow-2xl rounded-3xl overflow-hidden">
                    <DialogHeader className="p-10 pb-0 relative">
                        <DialogTitle className="text-[24px] md:text-[32px] font-medium text-center text-[#652b32] tracking-tight mb-2">
                            Get Your Podcast Studio Session Booked
                        </DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-10 pt-6 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                {/* Row 1 */}
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-[#333] text-[16px] font-medium uppercase tracking-wide">First Name<span className="text-red-500 ml-1 font-bold">*</span></FormLabel>
                                            <FormControl>
                                                <Input {...field} className="h-12 border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-[#652b32] px-0 bg-transparent text-lg transition-all" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-[#333] text-[16px] font-medium uppercase tracking-wide">Last Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="h-12 border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-[#652b32] px-0 bg-transparent text-lg transition-all" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Row 2 */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-[#333] text-[16px] font-medium uppercase tracking-wide">Email<span className="text-red-500 ml-1 font-bold">*</span></FormLabel>
                                            <FormControl>
                                                <Input type="email" {...field} className="h-12 border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-[#652b32] px-0 bg-transparent text-lg transition-all" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-[#333] text-[16px] font-medium uppercase tracking-wide">Phone Number<span className="text-red-500 ml-1 font-bold">*</span></FormLabel>
                                            <div className="flex gap-4 items-end">
                                                {/* Country Selector */}
                                                <div className="flex items-center gap-2 pb-2.5 bg-transparent border-b border-gray-300 text-foreground font-medium min-w-[60px]">
                                                    <span className="text-sm font-bold tracking-tight">{dialCode}</span>
                                                </div>

                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter 10-digit number"
                                                        maxLength={10}
                                                        onChange={(e) => {
                                                            const val = e.target.value.replace(/\D/g, '');
                                                            field.onChange(val);
                                                        }}
                                                        className="h-12 border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-[#652b32] px-0 bg-transparent text-lg transition-all flex-1"
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Row 3: Slot Date & Time */}
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-[#333] text-[16px] font-medium uppercase tracking-wide">Slot Date<span className="text-red-500 ml-1 font-bold">*</span></FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} className="h-12 border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-[#652b32] px-0 bg-transparent text-lg transition-all" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="slotTime"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-[#333] text-[16px] font-medium uppercase tracking-wide">Slot Time<span className="text-red-500 ml-1 font-bold">*</span></FormLabel>
                                            <FormControl>
                                                <Input type="time" {...field} className="h-12 border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-[#652b32] px-0 bg-transparent text-lg transition-all" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel className="text-[#333] text-[16px] font-medium uppercase tracking-wide">Message<span className="text-red-500 ml-1 font-bold">*</span></FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                rows={1}
                                                className="min-h-[60px] border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-[#652b32] px-0 bg-transparent text-lg resize-none overflow-hidden transition-all shadow-none"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-center pt-6">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#652b32] hover:bg-[#522228] text-white font-bold py-7 px-16 rounded-full text-xl uppercase tracking-wider transition-all shadow-xl active:scale-[0.98] disabled:opacity-70 min-w-[220px]"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog >
        </>
    );
};
