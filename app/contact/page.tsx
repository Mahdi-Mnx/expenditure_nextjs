"use client";

import type React from "react";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Users,
  TrendingUp,
  Facebook,
  Github,
  Linkedin,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    // Reset form or show success message
    alert("Thank you for your message! We'll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-xl flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-slate-900" />
          </div>
          <span className="text-2xl font-bold text-white">FinPredict</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/auth/login">
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-semibold">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Have a question or need support? We're here to help. Reach out to us
            and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageSquare className="h-5 w-5 text-emerald-400" />
                  Get in Touch
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Choose the best way to reach us
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-emerald-400 mt-1" />
                  <div>
                    <p className="font-medium text-white">Email Support</p>
                    <p className="text-sm text-slate-300">
                      support@finpredict.com
                    </p>
                    <p className="text-xs text-slate-400">
                      Response within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-400 mt-1" />
                  <div>
                    <p className="font-medium text-white">Phone Support</p>
                    <p className="text-sm text-slate-300">+1 (555) 123-4567</p>
                    <p className="text-xs text-slate-400">
                      Mon-Fri, 9AM-6PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-purple-400 mt-1" />
                  <div>
                    <p className="font-medium text-white">Office Address</p>
                    <p className="text-sm text-slate-300">
                      123 Financial District
                      <br />
                      New York, NY 10004
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-yellow-400 mt-1" />
                  <div>
                    <p className="font-medium text-white">Business Hours</p>
                    <p className="text-sm text-slate-300">
                      Monday - Friday: 9:00 AM - 6:00 PM EST
                      <br />
                      Saturday: 10:00 AM - 4:00 PM EST
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Options */}
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">
                  Other Ways to Get Help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-400/10 hover:bg-emerald-400/20 transition-colors cursor-pointer">
                  <Headphones className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="font-medium text-sm text-white">Live Chat</p>
                    <p className="text-xs text-slate-400">Available 24/7</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-400/10 hover:bg-blue-400/20 transition-colors cursor-pointer">
                  <Users className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-medium text-sm text-white">
                      Community Forum
                    </p>
                    <p className="text-xs text-slate-400">
                      Get help from other users
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Send us a Message</CardTitle>
                <CardDescription className="text-slate-300">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-white">
                        Category
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleInputChange("category", value)
                        }
                      >
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="technical">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="billing">
                            Billing & Payments
                          </SelectItem>
                          <SelectItem value="feature">
                            Feature Request
                          </SelectItem>
                          <SelectItem value="bug">Bug Report</SelectItem>
                          <SelectItem value="partnership">
                            Partnership
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="Brief description of your inquiry"
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide as much detail as possible about your inquiry..."
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400"
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">* Required fields</p>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900 mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
            <CardHeader className="text-center">
              <CardTitle className="text-white">
                Frequently Asked Questions
              </CardTitle>
              <CardDescription className="text-slate-300">
                Quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-white">
                    How accurate are the predictions?
                  </h4>
                  <p className="text-sm text-slate-300 mb-4">
                    Our ML models achieve 85-92% accuracy based on historical
                    data and user inputs.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-white">
                    Is my financial data secure?
                  </h4>
                  <p className="text-sm text-slate-300 mb-4">
                    Yes, we use bank-level encryption and never store sensitive
                    financial information.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-white">
                    Can I cancel my subscription anytime?
                  </h4>
                  <p className="text-sm text-slate-300 mb-4">
                    You can cancel your subscription at any time with no
                    penalties.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-white">
                    Do you offer enterprise solutions?
                  </h4>
                  <p className="text-sm text-slate-300 mb-4">
                    Yes, we provide custom enterprise solutions. Contact our
                    sales team for details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10  bg-slate-950 text-slate-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid  md:grid-cols-4 gap-96 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3  md:mb-0 ">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-slate-900" />
                </div>
                <span className="text-xl font-bold text-white">FinPredict</span>
              </div>
              <p className="text-slate-400 mb-6 mt-5 max-w-md">
                Empowering households with comprehensive AI-driven financial
                insights and predictions for better spending decisions and
                financial planning.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/sadaqelmi.abdulle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-400 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold">
                    <Facebook />
                  </span>
                </a>
                <a
                  href="https://github.com/Mohamed-apdi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-400 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold">
                    <Github />
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/mahdi-abdulkadir-743a26322/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-400 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold">
                    <Linkedin />
                  </span>
                </a>
              </div>
            </div>
            <div className="flex items-center gap-6 text-slate-400">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
              <Link href="/help" className="hover:text-white transition-colors">
                Support
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-400">
              © 2025 Household Financial Predictor. All rights reserved. Built
              with ❤️ for better financial futures.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
