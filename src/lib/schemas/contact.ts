import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  inquiryType: z.enum(["booking", "press", "collaboration", "general"], {
    required_error: "Please select an inquiry type",
  }),
  hcaptchaToken: z.string().min(1, "Please complete the captcha verification"),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
