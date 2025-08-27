import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package } from "lucide-react";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message?: string;
  onContinue?: () => void;
  continueButtonText?: string;
  showIcon?: boolean;
  iconType?: "check" | "package";
  showSecondaryButton?: boolean;
  secondaryButtonText?: string;
  onSecondaryAction?: () => void;
}

const SuccessDialog = ({
  open,
  onOpenChange,
  title = "Success!",
  message = "Your action was completed successfully.",
  onContinue,
  continueButtonText = "Continue",
  showIcon = true,
  iconType = "check",
  showSecondaryButton = false,
  secondaryButtonText = "Okay",
  onSecondaryAction,
}: SuccessDialogProps) => {
  const handleContinue = () => {
    onContinue?.();
    onOpenChange(false);
  };

  const handleSecondaryAction = () => {
    onSecondaryAction?.();
    onOpenChange(false);
  };

  const renderIcon = () => {
    if (!showIcon) return null;

    const iconClass = "w-16 h-16 mx-auto mb-4";

    if (iconType === "package") {
      return (
        <div className="relative">
          <Package
            className={`${iconClass} text-emerald-500`}
            strokeWidth={1.5}
          />
          <CheckCircle
            className="w-6 h-6 text-emerald-600 absolute z-10 -top-2 -right-2 bg-white rounded-full"
            onClick={() => onOpenChange(false)}
          />
        </div>
      );
    }

    return (
      <CheckCircle
        className={`${iconClass} text-emerald-500`}
        strokeWidth={1.5}
      />
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md animate-scale-in bg-gradient-to-b from-emerald-50/50 to-blue-50/30 border-emerald-200 bg-white/95 backdrop-blur-xs">
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
            onClick={handleContinue}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-200 flex-1"
            size="lg"
          >
            {continueButtonText}
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

export default SuccessDialog;
