import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getShipment } from "@/lib/shipment";
import Form from "./Form";
import Header from "@/components/Header";
import { formatTrackingNumberWithSpaces } from "@/lib/package";
import { Link } from "@/i18n/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ModifyShipment({ params }: Props) {
  const { id } = await params;

  const shipment = await getShipment(id, true);

  return (
    <div>
      <Header page={`/send/${shipment._id}`} />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon" className="h-10 w-10">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Edit Shipment
            </h1>
            <p className="text-muted-foreground mt-1">
              Tracking Number:{" "}
              <Link
                href={`/track/${shipment._id}`}
                className="font-mono text-primary"
              >
                {" "}
                FDX-
                {formatTrackingNumberWithSpaces(
                  shipment._id,
                  shipment.package.deliveryType
                ).replaceAll(" ", "-")}
              </Link>
            </p>
          </div>
        </div>
        <Form
          shipmentId={shipment._id}
          language={shipment.language}
          routes={shipment.routes}
          sender={shipment.sender}
          recipient={shipment.recipient}
          package={shipment.package}
          pickup={shipment.pickup}
        />
      </main>
    </div>
  );
}
