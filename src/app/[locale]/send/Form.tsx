"use client";

import { useState, useTransition } from "react";
import Inputs from "./Inputs";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import TruckLoader from "@/components/TruckLoader";
import { sendShipment } from "@/actions/shipment";
import {
  type Route,
  type Address,
  type ShippingFormEntry,
  parseShipmentForm,
  getErrorKey,
} from "@/lib/validations/shipment";
import ErrorDialog from "@/components/ErrorDialog";
import SuccessDialog from "@/components/SuccessDialog";
import { useRouter } from "@/i18n/navigation";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function Form() {
  const router = useRouter();
  const [showMap, setShowMap] = useState(false);
  const [targetLocations, setTargetLocations] = useState<
    (Omit<Route, "address"> & { address: Address | null })[]
  >([]);

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

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("routes", JSON.stringify(targetLocations));

    const parsed = parseShipmentForm(formData);

    if (parsed.success) {
      startTransition(async () => {
        const result = await sendShipment(formData);
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
          title="Package Sent Successfully!"
          message="Your package has been processed and is now on its way. You'll receive tracking updates shortly."
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
          title="Failed to Ship Package"
          message={error.message || undefined}
        />
      )}

      {isPending && <TruckLoader displayText="Shipping..." />}

      <form onSubmit={handleSubmit}>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Send a Package
            </h1>
            <p className="text-xl text-muted-foreground">
              Fill in the details below to schedule your delivery.
            </p>
          </div>
          <Inputs
            setShowMap={setShowMap}
            targetLocations={targetLocations}
            invalidFormData={invalidFormData}
            setInvalidFormData={setInvalidFormData}
          />
        </div>
        {/* Map */}
        <Map
          targetLocations={targetLocations}
          setTargetLocations={setTargetLocations}
          showMap={showMap}
          setShowMap={setShowMap}
        />

        {/* Submit Button */}
        <div className="flex justify-center pt-6 px-4 pb-8">
          <Button type="submit" size="lg" className="w-full md:w-auto px-12">
            Send
          </Button>
        </div>
      </form>
    </>
  );
}
