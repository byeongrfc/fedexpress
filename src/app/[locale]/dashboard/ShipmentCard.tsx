"use client";

import type { Routes } from "@/lib/validations/shipment";
import { Badge } from "@/components/ui/badge";
import { getCityCountry } from "@/lib/geocode";
import { formatShortDate } from "@/lib/date";
import { useRouter } from "@/i18n/navigation";

interface Props {
  shipmentId: string;
  packageType: string;
  routes: Routes;
  pickupDate: Date;
}

export default function ShipmentCard({
  shipmentId,
  packageType,
  routes,
  pickupDate,
}: Props) {
  const router = useRouter();

  return (
    <div
      role="button"
      onClick={() => router.push(`/send/${shipmentId}`)}
      className="hover:cursor-pointer flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors space-y-3 lg:space-y-0"
    >
      <div className="flex-1 min-w-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-3 mb-2 lg:mb-0">
          <h4 className="capitalize font-medium text-foreground truncate">
            {packageType}
          </h4>
          <Badge variant="secondary" className="text-xs w-fit lg:w-auto">
            {shipmentId}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {getCityCountry(routes.at(-1)!.address)}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-2 lg:space-y-0">
        <div className="flex justify-between lg:justify-center">
          <span className="text-sm font-medium text-foreground lg:hidden">
            Status:
          </span>
          <Badge className="bg-blue-500 text-white w-fit">In Transit</Badge>
        </div>

        <div className="flex justify-between lg:text-right">
          <span className="text-sm font-medium text-foreground lg:hidden">
            Est. Delivery:
          </span>
          <div className="lg:text-right">
            <p className="text-sm font-medium text-foreground hidden lg:block">
              Est. Delivery
            </p>
            <p className="text-sm text-muted-foreground">
              {formatShortDate(pickupDate, "en")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
