import { deleteShipment } from "@/actions/shipment";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { useToast } from "@/hooks/use-toast";
import ErrorDialog from "@/components/ErrorDialog";
import TruckLoader from "@/components/TruckLoader";

interface Props {
  shipmentId: string;
}

function Delete({ shipmentId }: Props) {
  const router = useRouter();
  const toast = useToast();

  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<{
    exists: boolean;
    message: string | null;
  }>({
    exists: false,
    message: null,
  });

  const [isDeletePending, startDeleteTransition] = useTransition();

  const handleDelete = () => {
    if (!showConfirm) return;

    startDeleteTransition(async () => {
      const result = await deleteShipment(shipmentId);
      if (result.error) {
        setError({ exists: true, message: result.error });
      } else {
        setError({ exists: false, message: null });
        toast("Package deleted", {
          description: "Your package has been deleted",
        });
        router.replace("/dashboard");
      }
    });
  };

  return (
    <>
      {showConfirm && !isDeletePending && (
        <ErrorDialog
          open={showConfirm && !isDeletePending}
          onOpenChange={() =>
            setError({
              exists: false,
              message: null,
            })
          }
          title="Confirm Delete Package"
          message="This action cannot be undone."
          tryAgainButtonText="Delete"
          onTryAgain={handleDelete}
          secondaryButtonText="Cancel"
          onSecondaryAction={() => setShowConfirm(false)}
        />
      )}

      {error.exists && (
        <ErrorDialog
          open={error.exists}
          onOpenChange={() =>
            setError({
              exists: false,
              message: null,
            })
          }
          title="Failed to Delete Package"
          message={error.message || undefined}
        />
      )}

      {isDeletePending && <TruckLoader displayText="Deleting..." />}

      <Button
        type="button"
        disabled={isDeletePending}
        onClick={() => setShowConfirm(true)}
        className="bg-red-500 hover:bg-red-400 flex-1 h-12 text-base font-semibold"
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete Shipment
      </Button>
    </>
  );
}

export default Delete;
