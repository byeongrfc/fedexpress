"use client";

import { useState, useTransition } from "react";
import { Package } from "lucide-react";
import Inputs from "./Inputs";
import { Button } from "@/components/ui/button";
import TruckLoader from "@/components/TruckLoader";
import { updateShipment } from "@/actions/shipment";
import {
  type Shipment,
  type ShippingFormEntry,
  parseShipmentForm,
  getErrorKey,
} from "@/lib/validations/shipment";
import ErrorDialog from "@/components/ErrorDialog";
import SuccessDialog from "@/components/SuccessDialog";
import { useRouter } from "@/i18n/navigation";
import Delete from "./Delete";

interface Props
  extends Pick<
    Shipment,
    "language" | "routes" | "sender" | "recipient" | "package" | "pickup"
  > {
  shipmentId: string;
}

export default function Form({
  shipmentId,
  language,
  routes,
  sender,
  recipient,
  package: item,
  pickup,
}: Props) {
  const router = useRouter();

  const [targetLocations, setTargetLocations] = useState(routes);

  const [invalidFormData, setInvalidFormData] = useState<{
    invalid: boolean;
    key: ShippingFormEntry | null;
  }>({
    invalid: false,
    key: null,
  });

  const [error, setError] = useState<{
    exists: boolean;
    message: string | null;
  }>({
    exists: false,
    message: null,
  });

  const [success, setSuccess] = useState<{
    exists: boolean;
    message: string | null;
  }>({
    exists: false,
    message: null,
  });

  const [isSubmitPending, startSubmitTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("routes", JSON.stringify(targetLocations));

    const parsed = parseShipmentForm(formData);

    if (parsed.success) {
      startSubmitTransition(async () => {
        const result = await updateShipment(formData, shipmentId);
        if (result.error) {
          setError({ exists: true, message: result.error });
          setSuccess({ exists: false, message: null });
        } else {
          setError({ exists: false, message: null });
          setSuccess({ exists: true, message: result.success! });
        }
      });
    } else {
      setInvalidFormData({
        invalid: true,
        key: getErrorKey(parsed.error),
      });
    }
  };

  return (
    <>
      {success.exists && (
        <SuccessDialog
          open={success.exists}
          onOpenChange={() =>
            setSuccess({
              exists: false,
              message: null,
            })
          }
          title="Package Updated Successfully!"
          message="Your package has been updated."
          iconType="package"
          onContinue={() => router.push(`/track/${success.message}`)}
          continueButtonText="Track Package"
          showSecondaryButton={true}
          secondaryButtonText="Go to Dashboard"
          onSecondaryAction={() => router.push("/dashboard")}
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
          title="Failed to Update Package"
          message={error.message || undefined}
        />
      )}

      {isSubmitPending && <TruckLoader displayText="Updating..." />}

      <form onSubmit={handleSubmit}>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Inputs
            targetLocations={targetLocations}
            setTargetLocations={setTargetLocations}
            language={language}
            sender={sender}
            recipient={recipient}
            package={item}
            pickup={pickup}
            invalidFormData={invalidFormData}
            setInvalidFormData={setInvalidFormData}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            disabled={isSubmitPending}
            className="flex-1 h-12 text-base font-semibold"
          >
            <Package className="h-4 w-4 mr-2" />
            Update Shipment
          </Button>
          <Delete shipmentId={shipmentId} />
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-12 text-base"
            onClick={() => router.back()}
          >
            Cancel Changes
          </Button>
        </div>
      </form>
    </>
  );
}
