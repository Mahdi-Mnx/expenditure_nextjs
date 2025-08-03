"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, ArrowLeft, FileQuestion } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className=" flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-slate-950 h-[100vh]">
      <Card className="w-full max-w-lg text-center ">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
            <FileQuestion className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-4xl font-bold text-gray-900">
            404
          </CardTitle>
          <CardDescription className="text-xl text-gray-600">
            Page Not Found
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-gray-600">
              {
                "Oops! The page you're looking for doesn't exist or has been moved."
              }
            </p>
            <p className="text-sm text-gray-500">
              {
                "Don't worry, it happens to the best of us. Let's get you back on track."
              }
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="w-full bg-transparent"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>

          {/* Popular links */}
          <div className="pt-4 border-t">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Popular Pages
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link
                href="/about"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Contact
              </Link>
              <Link
                href="/blog"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Blog
              </Link>
              <Link
                href="/help"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Help Center
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-gray-400">
              Error Code: 404 • Page Not Found
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
