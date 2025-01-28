import React from "react";
import { Button } from "@/app/components/ui/Button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-red-200 to-red-50">
      <div className="text-center max-w-md">
        <div className="flex justify-center items-center text-red-600">
          <AlertTriangle size={48} />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mt-4">Something went wrong!</h1>
        <p className="text-gray-600 mt-2">
          Oops! The page you’re looking for doesn’t exist or an error occurred.
        </p>

        <div className="mt-6 space-x-4">
        <Link href="/">
            <Button className="px-4 py-2 h-10 bg-red-600 text-white rounded-lg hover:bg-red-500">
                Go Home
            </Button>
          </Link>
        
        <Link href={'/contact'}>
            <Button
                variant="default"
                className="px-4 py-2 h-10 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
                Contact Support
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-400">
        <p>
          <small>
            If you think this is a mistake, please let us know or try refreshing the page.
          </small>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
