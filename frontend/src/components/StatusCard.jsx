import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatusCard({
  title = "Checking user access...",
  subtitle,
  status = "loading", // "loading" | "success" | "error"
  icon,
  className,
}) {
  const icons = {
    loading: <Loader2 className="w-6 h-6 animate-spin text-purple-600" />,
    success: <CheckCircle2 className="w-6 h-6 text-green-600" />,
    error: <XCircle className="w-6 h-6 text-red-600" />,
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary via-purple-600 to-pink-500 text-white px-6 py-12 mb-8 rounded-b-3xl">
      <Card
        className={cn(
          "w-full max-w-sm shadow-2xl relative overflow-hidden",
          className
        )}
      >
        {/* Background Decoration */}
        <div className="absolute -top-6 -right-6 text-7xl opacity-10">
          {status === "loading" ? "🔄" : status === "success" ? "✅" : "⚠️"}
        </div>

        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-500 p-3 rounded-full shadow-lg">
              {icon || icons[status]}
            </div>
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          {subtitle && (
            <CardDescription className="text-sm">{subtitle}</CardDescription>
          )}
        </CardHeader>

        {status === "loading" && (
          <CardContent className="text-center text-gray-500 text-sm">
            This may take a few seconds...
          </CardContent>
        )}
      </Card>
    </div>
  );
}
