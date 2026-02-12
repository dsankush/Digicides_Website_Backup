'use client';

import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { CheckCircle } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', organization: '', email: '', phone: '', message: '' });
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Allow various phone number formats (10 digits with optional country code, spaces, dashes, parentheses)
    const phoneRegex = /^(\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10 && phoneRegex.test(phone);
  };

  const handlePhoneChange = (value: string) => {
    // Only allow numbers, spaces, dashes, parentheses, and plus signs
    const filteredValue = value.replace(/[^0-9\s\-\(\)\+\.]/g, '');
    setFormData({ ...formData, phone: filteredValue });
    if (fieldErrors.phone) {
      setFieldErrors({ ...fieldErrors, phone: '' });
    }
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
  };

  const validateOrganization = (org: string): boolean => {
    return org.trim().length >= 2;
  };

  const validateMessage = (message: string): boolean => {
    return message.trim().length >= 10;
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!validateName(formData.name)) {
      errors.name = 'Name must be at least 2 characters and contain only letters';
    }

    if (!validateOrganization(formData.organization)) {
      errors.organization = 'Organization name must be at least 2 characters';
    }

    if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number (at least 10 digits)';
    }

    if (!validateMessage(formData.message)) {
      errors.message = 'Message must be at least 10 characters';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setFieldErrors({});

    // Validate form fields
    if (!validateForm()) {
      setError('Please correct the errors below');
      setIsSubmitting(false);
      return;
    }

    const token = recaptchaRef.current?.getValue();

    if (!token) {
      setError("Please verify reCAPTCHA");
      setIsSubmitting(false);
      return;
    }

    // GTM tracking for form submission
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'form_submit',
        form_name: 'contact_us_form',
        form_id: 'contact-form-main',
        page_location: window.location.href,
        user_data: {
          name: formData.name,
          organization: formData.organization,
          email: formData.email,
          phone: formData.phone
        }
      });
    }

    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setError("Failed to submit form");
        setIsSubmitting(false);
        return;
      }

      // GTM tracking for successful form submission
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'form_submit_success',
          form_name: 'contact_us_form',
          form_id: 'contact-form-main',
          page_location: window.location.href
        });

        // GTM tracking for conversion
        window.dataLayer.push({
          event: 'conversion',
          conversion_type: 'form_submission',
          page_type: 'contact_form',
          page_location: window.location.href
        });
      }

      setIsSubmitted(true);
      setFormData({ name: '', organization: '', email: '', phone: '', message: '' });
      
    } catch (error) {
      console.error("Error submitting form", error);
      setError("Failed to submit form. Please try again.");
      setIsSubmitting(false);
    }
    
    recaptchaRef.current?.reset();
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setError('');
    setFieldErrors({});
    setFormData({ name: '', organization: '', email: '', phone: '', message: '' });
  };

  if (isSubmitted) {
    return (
      <div id="contact-us" className="z-10 flex w-full max-w-[1440px] mx-auto flex-col items-center justify-start gap-8 px-4 pt-20 sm:pt-48 md:pt-48 lg:pt-48 xl:pt-48 2xl:pt-48 text-foreground md:px-24 xl:px-44">
        <div className="flex w-full gap-5">
          <div className="hidden h-full w-full overflow-hidden rounded-[18px] md:flex md:w-1/2">
            <Image
              src="/contact.webp"
              alt="contact"
              width={1000}
              height={1400}
              className="h-full w-full pt-5 md:pt-0 object-contain"
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-6 rounded-[18px] bg-[#fafafa] p-8 md:w-1/2">
            {/* Success Icon */}
            <div className="mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>

            {/* Success Message */}
            <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900">
              Thank You!
            </h2>
            
            <p className="text-center text-lg text-gray-600 leading-relaxed">
              Your message has been sent successfully. Our team will review your inquiry and get back to you within 24 hours with a personalized solution for your agri marketing needs.
            </p>

            {/* Send Another Message Button */}
            <Button 
              onClick={handleReset}
              variant="outline" 
              size="lg" 
              className="w-full"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="contact-us" className="z-10 flex w-full flex-col items-center justify-start gap-8 px-4 pt-20 sm:pt-48 md:pt-48 lg:pt-48 xl:pt-48 2xl:pt-48 text-foreground md:px-24 xl:px-44">
      <div className="flex w-full gap-5">
        <div className="hidden h-[770px] w-full overflow-hidden rounded-[18px] md:flex md:w-1/2">
          <Image
            src="/contact.webp"
            alt="contact"
            width={1000}
            height={1400}
            className="h-full w-full pt-5 md:pt-0 object-contain"
          />
        </div>
        <form
          id="contact-form-main"
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-start justify-start gap-4 rounded-[18px] bg-[#fafafa] p-6 md:w-1/2"
        >
          <h2 className="text-center text-3xl md:text-4xl">
            Contact
            <span className="ml-2 rounded-md bg-primary/10 px-2 text-primary">
              us
            </span>
          </h2>
          <p className="text-left text-lg font-normal text-muted-foreground">
            Let&apos;s work together
          </p>

          {/* Name Field */}
          <div className="flex w-full flex-col gap-3">
            <Label className="text-lg">Your name</Label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                // Clear field error when user starts typing
                if (fieldErrors.name) {
                  setFieldErrors({ ...fieldErrors, name: '' });
                }
              }}
              className={`h-12 ${fieldErrors.name ? 'border-red-500 focus:border-red-500' : ''}`}
              required
            />
            {fieldErrors.name && <p className="text-red-500 text-sm">{fieldErrors.name}</p>}
          </div>

          {/* Organization Field */}
          <div className="flex w-full flex-col gap-3">
            <Label className="text-lg">Organization name</Label>
            <Input
              type="text"
              placeholder="Enter your organization name"
              value={formData.organization}
              onChange={(e) => {
                setFormData({ ...formData, organization: e.target.value });
                if (fieldErrors.organization) {
                  setFieldErrors({ ...fieldErrors, organization: '' });
                }
              }}
              className={`h-12 ${fieldErrors.organization ? 'border-red-500 focus:border-red-500' : ''}`}
              required
            />
            {fieldErrors.organization && <p className="text-red-500 text-sm">{fieldErrors.organization}</p>}
          </div>

          {/* Email Field */}
          <div className="flex w-full flex-col gap-3">
            <Label className="text-lg">Your email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              className={`h-12 ${fieldErrors.email ? 'border-red-500 focus:border-red-500' : ''}`}
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (fieldErrors.email) {
                  setFieldErrors({ ...fieldErrors, email: '' });
                }
              }}
              required
            />
            {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
          </div>

          {/* Phone Field */}
          <div className="flex w-full flex-col gap-3">
            <Label className="text-lg">Your phone number</Label>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              className={`h-12 ${fieldErrors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
              value={formData.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              required
            />
            {fieldErrors.phone && <p className="text-red-500 text-sm">{fieldErrors.phone}</p>}
          </div>

          {/* Message Field */}
          <div className="flex w-full flex-col gap-1">
            <Label className="text-lg">Your message</Label>
            <Textarea
              placeholder="Enter your message"
              className={`h-32 ${fieldErrors.message ? 'border-red-500 focus:border-red-500' : ''}`}
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (fieldErrors.message) {
                  setFieldErrors({ ...fieldErrors, message: '' });
                }
              }}
              required
            />
            {fieldErrors.message && <p className="text-red-500 text-sm">{fieldErrors.message}</p>}
          </div>

          {/* reCAPTCHA Component */}
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            ref={recaptchaRef}
          />

          {/* Error Text */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Submit Button */}
          <Button 
            type="submit" 
            variant="default" 
            className="w-full" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
