"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Shield,
  Eye,
  Lock,
  Database,
  UserCheck,
  Globe,
  TrendingUp,
  Facebook,
  Github,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Information We Collect",
      icon: Database,
      content: `We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.

Personal Information:
• Name, email address, and contact information
• Account credentials and authentication data
• Profile information and preferences
• Payment and billing information

Financial Information:
• Household income and expenditure data
• Financial goals and planning information
• Demographic and household composition data
• Economic indicators and regional data

Technical Information:
• Device information and browser type
• IP address and location data
• Usage patterns and interaction data
• Cookies and similar tracking technologies

We only collect information that is necessary to provide and improve our services.`,
    },
    {
      title: "2. How We Use Your Information",
      icon: UserCheck,
      content: `We use the information we collect to provide, maintain, and improve our services:

Service Provision:
• Generate household expenditure predictions
• Provide personalized financial insights
• Create data visualizations and reports
• Process payments and manage subscriptions

Communication:
• Send service-related notifications
• Respond to your inquiries and support requests
• Provide updates about new features
• Send marketing communications (with consent)

Improvement and Analytics:
• Analyze usage patterns to improve our algorithms
• Conduct research and development
• Ensure security and prevent fraud
• Comply with legal obligations

We do not sell your personal information to third parties for marketing purposes.`,
    },
    {
      title: "3. Information Sharing and Disclosure",
      icon: Globe,
      content: `We may share your information in the following circumstances:

With Your Consent:
• When you explicitly authorize us to share information
• For specific services you request

Service Providers:
• Third-party vendors who assist in providing our services
• Payment processors and billing services
• Cloud hosting and data storage providers
• Analytics and customer support tools

Legal Requirements:
• To comply with applicable laws and regulations
• To respond to legal process or government requests
• To protect our rights, property, or safety
• To prevent fraud or security threats

Business Transfers:
• In connection with mergers, acquisitions, or asset sales
• During bankruptcy or similar proceedings

We require all third parties to maintain appropriate security measures and use your information only as necessary to provide their services.`,
    },
    {
      title: "4. Data Security and Protection",
      icon: Shield,
      content: `We implement comprehensive security measures to protect your information:

Technical Safeguards:
• End-to-end encryption for data transmission
• Advanced encryption for data storage
• Secure authentication and access controls
• Regular security audits and penetration testing

Operational Safeguards:
• Employee training on data protection
• Strict access controls and monitoring
• Incident response and breach notification procedures
• Regular backup and disaster recovery testing

Physical Safeguards:
• Secure data centers with restricted access
• Environmental controls and monitoring
• Redundant systems and infrastructure
• 24/7 security monitoring

While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to maintaining industry-standard protections.`,
    },
    {
      title: "5. Your Privacy Rights and Choices",
      icon: Eye,
      content: `You have several rights regarding your personal information:

Access and Portability:
• Request a copy of your personal information
• Download your data in a portable format
• Receive information about how we process your data

Correction and Updates:
• Update or correct your account information
• Request correction of inaccurate data
• Add missing information to your profile

Deletion and Restriction:
• Request deletion of your personal information
• Restrict processing of your data
• Object to certain types of processing

Communication Preferences:
• Opt out of marketing communications
• Choose notification preferences
• Manage cookie and tracking settings

Account Management:
• Deactivate or delete your account
• Export your data before account closure
• Request account data retention information

To exercise these rights, please contact us using the information provided at the end of this policy.`,
    },
    {
      title: "6. Cookies and Tracking Technologies",
      icon: Lock,
      content: `We use cookies and similar technologies to enhance your experience:

Essential Cookies:
• Required for basic website functionality
• Authentication and security features
• Session management and preferences

Analytics Cookies:
• Usage statistics and performance monitoring
• Feature usage and user behavior analysis
• Error tracking and debugging information

Marketing Cookies:
• Personalized content and recommendations
• Advertising effectiveness measurement
• Social media integration features

You can control cookie settings through your browser preferences. However, disabling certain cookies may limit your ability to use some features of our service.

Third-Party Tracking:
• Google Analytics for website analytics
• Payment processors for transaction processing
• Customer support tools for service delivery

We do not allow third parties to collect personal information about your online activities over time and across different websites when you use our service.`,
    },
    {
      title: "7. Data Retention and Deletion",
      content: `We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy:

Account Information:
• Retained while your account is active
• Deleted within 30 days of account closure
• Some information may be retained for legal compliance

Financial Data:
• Prediction data retained for service improvement
• Aggregated and anonymized for research purposes
• Individual data deleted upon account closure

Communication Records:
• Support communications retained for 3 years
• Marketing communications until you opt out
• Legal communications retained as required by law

Automatic Deletion:
• Inactive accounts after 2 years of inactivity
• Temporary data and logs after 90 days
• Backup data according to retention schedules

You can request immediate deletion of your data by contacting us. Some information may be retained in anonymized form for legitimate business purposes.`,
    },
    {
      title: "8. International Data Transfers",
      content: `Your information may be transferred to and processed in countries other than your own:

Data Processing Locations:
• United States (primary data centers)
• European Union (backup and redundancy)
• Other countries where our service providers operate

Transfer Safeguards:
• Standard Contractual Clauses for EU transfers
• Adequacy decisions where applicable
• Binding Corporate Rules for internal transfers
• Certification schemes and codes of conduct

Your Rights:
• Information about transfer mechanisms
• Copies of relevant safeguards
• Right to object to certain transfers

We ensure that all international transfers comply with applicable data protection laws and provide appropriate safeguards for your information.`,
    },
    {
      title: "9. Children's Privacy",
      content: `Our service is not intended for children under the age of 13, and we do not knowingly collect personal information from children under 13.

If we become aware that we have collected personal information from a child under 13, we will:
• Delete the information immediately
• Terminate the associated account
• Notify the parent or guardian if possible
• Implement additional safeguards to prevent future collection

Parents and guardians should monitor their children's internet usage and help enforce this policy by instructing their children never to provide personal information through our service without permission.

If you believe we have collected information from a child under 13, please contact us immediately.`,
    },
    {
      title: "10. Changes to This Privacy Policy",
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws.

Notification of Changes:
• Email notification for material changes
• Prominent notice on our website
• In-app notifications for significant updates
• 30-day advance notice for major changes

Your Continued Use:
• Continued use constitutes acceptance of changes
• Right to object to changes and close account
• Access to previous versions of the policy

We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.

Material changes will not apply retroactively without your explicit consent.`,
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
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-emerald-400/20 rounded-full backdrop-blur-xl">
              <Shield className="h-12 w-12 text-emerald-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your information when you use FinPredict.
          </p>
          <div className="mt-6 text-sm text-slate-400">
            <p>Last updated: January 15, 2024</p>
            <p>Effective date: January 15, 2024</p>
          </div>
        </div>

        {/* Privacy Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
          <Card className="text-center bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
            <CardContent className="pt-6">
              <Lock className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2 text-white">
                Secure by Design
              </h3>
              <p className="text-sm text-slate-300">
                Bank-level encryption and security measures protect your data
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
            <CardContent className="pt-6">
              <Eye className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2 text-white">
                Full Transparency
              </h3>
              <p className="text-sm text-slate-300">
                Clear information about what data we collect and how we use it
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
            <CardContent className="pt-6">
              <UserCheck className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2 text-white">Your Control</h3>
              <p className="text-sm text-slate-300">
                Full control over your data with easy access, correction, and
                deletion
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Navigation */}
        <Card className="mb-8 max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Quick Navigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              {sections.map((section, index) => (
                <a
                  key={index}
                  href={`#section-${index + 1}`}
                  className="text-emerald-400 hover:text-emerald-300 hover:underline p-2 rounded hover:bg-slate-700/50 transition-colors flex items-center gap-2"
                >
                  {section.icon && <section.icon className="h-4 w-4" />}
                  {section.title}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Policy Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
            <CardContent className="p-8">
              <ScrollArea className="h-[800px] pr-4">
                <div className="space-y-8">
                  {sections.map((section, index) => (
                    <div key={index} id={`section-${index + 1}`}>
                      <div className="flex items-center gap-3 mb-4">
                        {section.icon && (
                          <div className="p-2 bg-emerald-400/20 rounded-lg backdrop-blur-xl">
                            <section.icon className="h-5 w-5 text-emerald-400" />
                          </div>
                        )}
                        <h2 className="text-xl font-bold text-white">
                          {section.title}
                        </h2>
                      </div>
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
          <Card className=" bg-slate-800/50 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 backdrop-blur-xl border-emerald-400/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                Questions about your privacy?
              </h3>
              <p className="text-slate-300 mb-4">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us.
              </p>
              <div className="text-sm text-slate-400">
                <p>Email: privacy@finpredict.com</p>
                <p>Data Protection Officer: dpo@finpredict.com</p>
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
                Empowering households with comprehensive ML-driven financial
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
