import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircle, AlertTriangle } from "lucide-react";

interface ErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message?: string;
  onTryAgain?: () => void;
  tryAgainButtonText?: string;
  showIcon?: boolean;
  iconType?: "error" | "warning";
  showSecondaryButton?: boolean;
  secondaryButtonText?: string;
  onSecondaryAction?: () => void;
}

const ErrorDialog = ({
  open,
  onOpenChange,
  title = "Something went wrong",
  message = "An error occurred while processing your request. Please try again.",
  onTryAgain,
  tryAgainButtonText = "Try Again",
  showIcon = true,
  iconType = "error",
  showSecondaryButton = true,
  secondaryButtonText = "Cancel",
  onSecondaryAction,
}: ErrorDialogProps) => {
  const handleTryAgain = () => {
    onTryAgain?.();
    onOpenChange(false);
  };

  const handleSecondaryAction = () => {
    onSecondaryAction?.();
    onOpenChange(false);
  };

  const renderIcon = () => {
    if (!showIcon) return null;

    const iconClass = "w-16 h-16 mx-auto mb-4";

    if (iconType === "warning") {
      return (
        <AlertTriangle
          className={`${iconClass} text-orange-500`}
          strokeWidth={1.5}
        />
      );
    }

    return (
      <XCircle className={`${iconClass} text-red-500`} strokeWidth={1.5} />
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md animate-scale-in bg-gradient-to-b from-red-50/50 to-orange-50/30 border-red-200 bg-white/95 backdrop-blur-xs">
        <DialogHeader className="text-center space-y-4">
          {renderIcon()}

          <DialogTitle className="text-2xl font-bold text-gray-900 text-center">
            {title}
          </DialogTitle>

          <DialogDescription className="text-gray-600 text-base text-center leading-relaxed">
            {message}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            onClick={handleTryAgain}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-200 flex-1"
            size="lg"
          >
            {tryAgainButtonText}
          </Button>

          {showSecondaryButton && (
            <Button
              onClick={handleSecondaryAction}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg transition-colors duration-200 flex-1"
              size="lg"
            >
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorDialog;
