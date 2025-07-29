"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Facebook, Github, Linkedin, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TermsOfService() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using FinPredict ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.

These Terms of Service ("Terms") govern your use of our website located at finpredict.com (the "Service") operated by FinPredict Inc. ("us", "we", or "our").

Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.`,
    },
    {
      title: "2. Description of Service",
      content: `FinPredict provides household expenditure prediction services using machine learning algorithms and statistical models. Our service includes:

• Household expenditure forecasting and analysis
• Financial planning tools and recommendations  
• Data visualization and reporting features
• User account management and data storage
• Customer support and educational resources

The Service is provided "as is" and we reserve the right to modify, suspend, or discontinue the Service at any time without notice.`,
    },
    {
      title: "3. User Accounts and Registration",
      content: `To access certain features of the Service, you must register for an account. When you create an account, you must provide information that is accurate, complete, and current at all times.

You are responsible for:
• Safeguarding the password and all activities under your account
• Maintaining the security of your account and password
• Notifying us immediately of any unauthorized use of your account
• Ensuring all information provided is accurate and up-to-date

We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion.`,
    },
    {
      title: "4. Privacy and Data Protection",
      content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service.

By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy. We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

We do not sell, trade, or rent your personal information to third parties without your explicit consent, except as outlined in our Privacy Policy.`,
    },
    {
      title: "5. Acceptable Use Policy",
      content: `You agree not to use the Service:

• For any unlawful purpose or to solicit others to perform unlawful acts
• To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances
• To infringe upon or violate our intellectual property rights or the intellectual property rights of others
• To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate
• To submit false or misleading information
• To upload or transmit viruses or any other type of malicious code
• To spam, phish, pharm, pretext, spider, crawl, or scrape
• For any obscene or immoral purpose or to engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service`,
    },
    {
      title: "6. Intellectual Property Rights",
      content: `The Service and its original content, features, and functionality are and will remain the exclusive property of FinPredict Inc. and its licensors. The Service is protected by copyright, trademark, and other laws.

Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent. You may not:

• Reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service
• Use our intellectual property for commercial purposes without explicit permission
• Reverse engineer, decompile, or disassemble any part of the Service`,
    },
    {
      title: "7. Payment Terms and Billing",
      content: `Certain aspects of the Service may be provided for a fee or other charge. If you elect to use paid aspects of the Service, you agree to the pricing and payment terms.

• All fees are non-refundable unless otherwise stated
• Subscription fees are billed in advance on a recurring basis
• We reserve the right to change our pricing at any time
• You authorize us to charge your payment method for all fees
• Failed payments may result in service suspension or termination
• You are responsible for all taxes associated with your use of the Service`,
    },
    {
      title: "8. Disclaimers and Limitations of Liability",
      content: `The information on this Service is provided on an "as is" basis. To the fullest extent permitted by law, this Company:

• Excludes all representations and warranties relating to this Service and its contents
• Does not guarantee the accuracy of predictions or financial advice
• Is not liable for any financial losses resulting from use of our predictions
• Disclaims all liability for damages arising from use of the Service

IN NO EVENT SHALL FINPREDICT INC. BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.`,
    },
    {
      title: "9. Indemnification",
      content: `You agree to defend, indemnify, and hold harmless FinPredict Inc., its officers, directors, employees, and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).

This indemnification applies to claims arising from:
• Your use of and access to the Service
• Your violation of any term of these Terms
• Your violation of any third party right, including intellectual property rights
• Any claim that your use of the Service caused damage to a third party`,
    },
    {
      title: "10. Termination",
      content: `We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever including but not limited to a breach of the Terms.

If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.

Upon termination:
• Your right to use the Service will cease immediately
• We may delete your account and all associated data
• All provisions of the Terms which should survive termination shall survive`,
    },
    {
      title: "11. Governing Law and Jurisdiction",
      content: `These Terms shall be interpreted and governed by the laws of the State of New York, United States, without regard to its conflict of law provisions.

Any disputes arising from these Terms or your use of the Service shall be resolved in the state and federal courts located in New York County, New York. You consent to the jurisdiction of such courts and waive any objection to venue.

If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force and effect.`,
    },
    {
      title: "12. Changes to Terms",
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.

What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.

If you do not agree to the new terms, you are no longer authorized to use the Service and should discontinue use immediately.`,
    },
  ];

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
          <h1 className="text-4xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Please read these Terms of Service carefully before using
            FinPredict. By using our service, you agree to be bound by these
            terms.
          </p>
          <div className="mt-6 text-sm text-slate-400">
            <p>Last updated: January 15, 2024</p>
            <p>Effective date: January 15, 2024</p>
          </div>
        </div>

        {/* Quick Navigation */}
        <Card className="mb-8 max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Quick Navigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
              {sections.map((section, index) => (
                <a
                  key={index}
                  href={`#section-${index + 1}`}
                  className="text-emerald-400 hover:text-emerald-300 hover:underline p-2 rounded hover:bg-slate-700/50 transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Terms Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
            <CardContent className="p-8">
              <ScrollArea className="h-[800px] pr-4">
                <div className="space-y-8">
                  {sections.map((section, index) => (
                    <div key={index} id={`section-${index + 1}`}>
                      <h2 className="text-xl font-bold text-white mb-4">
                        {section.title}
                      </h2>
                      <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                        {section.content}
                      </div>
                      {index < sections.length - 1 && (
                        <Separator className="mt-8 bg-slate-700" />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="max-w-4xl mx-auto mt-8">
          <Card className="bg-slate-800/50 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 backdrop-blur-xl border-emerald-400/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                Questions about these Terms?
              </h3>
              <p className="text-slate-300 mb-4">
                If you have any questions about these Terms of Service, please
                contact us.
              </p>
              <div className="text-sm text-slate-400">
                <p>Email: legal@finpredict.com</p>
                <p>Address: 123 Financial District, New York, NY 10004</p>
                <p>Phone: +1 (555) 123-4567</p>
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
