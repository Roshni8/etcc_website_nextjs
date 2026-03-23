"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultCategory?: string;
}

const productCategories = [
  "Toroidal Transformers",
  "Potentiometers",
  "Current Transformers",
  "Wire Wound Resistors & Rheostats",
  "Other / Custom",
];

const QuoteModal = ({ open, onOpenChange, defaultCategory = "" }: QuoteModalProps) => {
  const [formData, setFormData] = useState({
    category: defaultCategory,
    specifications: "",
    quantity: "",
    timeline: "",
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("quote_submissions").insert({
        category: formData.category,
        specifications: formData.specifications,
        quantity: formData.quantity || null,
        timeline: formData.timeline || null,
        company_name: formData.companyName,
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone || null,
      });

      if (error) throw error;

      supabase.functions.invoke("send-quote-notification", {
        body: {
          category: formData.category,
          specifications: formData.specifications,
          quantity: formData.quantity || "",
          timeline: formData.timeline || "",
          companyName: formData.companyName,
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone || "",
        },
      }).catch((err) => console.error("Email notification failed:", err));

      toast({
        title: "Quote Request Submitted",
        description: "Thank you! Our team will review your requirements and get back to you within 24 hours.",
      });
      onOpenChange(false);
      setFormData({
        category: "",
        specifications: "",
        quantity: "",
        timeline: "",
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
      });
    } catch {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Request a Quote</DialogTitle>
          <DialogDescription>
            Tell us about your requirements and we&apos;ll provide a detailed quote within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="category" className="text-sm font-medium text-foreground">
              Product Category *
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) => updateField("category", e.target.value)}
              className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select a category</option>
              {productCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="specifications" className="text-sm font-medium text-foreground">
              Specifications / Requirements *
            </label>
            <textarea
              id="specifications"
              required
              rows={3}
              placeholder="Describe your technical specifications, voltage ratings, special requirements..."
              value={formData.specifications}
              onChange={(e) => updateField("specifications", e.target.value)}
              className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="quantity" className="text-sm font-medium text-foreground">
                Quantity
              </label>
              <input
                id="quantity"
                type="text"
                placeholder="e.g. 100 units"
                value={formData.quantity}
                onChange={(e) => updateField("quantity", e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="timeline" className="text-sm font-medium text-foreground">
                Timeline
              </label>
              <input
                id="timeline"
                type="text"
                placeholder="e.g. 4 weeks"
                value={formData.timeline}
                onChange={(e) => updateField("timeline", e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <hr className="border-border" />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="companyName" className="text-sm font-medium text-foreground">
                Company Name *
              </label>
              <input
                id="companyName"
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="contactName" className="text-sm font-medium text-foreground">
                Contact Name *
              </label>
              <input
                id="contactName"
                type="text"
                required
                value={formData.contactName}
                onChange={(e) => updateField("contactName", e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email *
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-sm font-medium text-foreground">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary-dark"
          >
            {isSubmitting ? "Submitting..." : "Submit Quote Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;
