"use client";

import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  Package,
  User,
  MapPin,
  Clock,
  Plane,
  Check,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { getCityCountry } from "@/lib/geocode";
import type {
  Routes,
  Shipment,
  ShippingFormEntry,
} from "@/lib/validations/shipment";
import { languages } from "@/components/LanguageSelector";
import Image from "next/image";

interface Props
  extends Pick<
    Shipment,
    "language" | "sender" | "recipient" | "package" | "pickup"
  > {
  targetLocations: Routes;
  setTargetLocations: Dispatch<SetStateAction<Routes>>;
  invalidFormData: {
    invalid: boolean;
    key: ShippingFormEntry | null;
  };
  setInvalidFormData: Dispatch<
    SetStateAction<{
      invalid: boolean;
      key: ShippingFormEntry | null;
    }>
  >;
}

export default function Inputs({
  language,
  targetLocations,
  setTargetLocations,
  invalidFormData,
  setInvalidFormData,
  sender,
  recipient,
  package: item,
  pickup,
}: Props) {
  const [pickupDate, setPickupDate] = useState<Date>(new Date(pickup.date));

  const handleEntry = () => {
    setInvalidFormData({ invalid: false, key: null });
  };

  const handleChangeRoute = (index: number) => {
    const newTargetLocations = targetLocations.map((target, i) => {
      if (i < index) {
        target.status = "completed";
      } else if (i > index) {
        target.status = "upcoming";
        delete target.timeStamp;
      } else {
        target.status = "current";
        if (!target.timeStamp) target.timeStamp = new Date();
      }
      return target;
    });

    setTargetLocations(newTargetLocations);
    setInvalidFormData({ invalid: false, key: null });
  };

  useEffect(() => {
    if (invalidFormData.invalid && invalidFormData.key) {
      const targetEl = document.getElementById(invalidFormData.key);
      targetEl?.focus();
    }
  }, [invalidFormData]);

  return (
    <div className="space-y-8">
      {/* Sender Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Sender Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sender-name">Full Name</Label>
              <Input
                id="sender-name"
                name="sender-name"
                placeholder="Enter your full name"
                defaultValue={sender.name}
                onChange={handleEntry}
              />
              <p
                className={cn(
                  "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
                  invalidFormData.invalid &&
                    invalidFormData.key === "sender-name"
                    ? "scale-100 h-full transition-all duration-150 ease-linear"
                    : "scale-0 h-0"
                )}
              >
                Enter your full name
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sender-email">Email</Label>
              <Input
                id="sender-email"
                name="sender-email"
                type="email"
                placeholder="your.email@example.com"
                defaultValue={sender.email}
                onChange={handleEntry}
              />
              <p
                className={cn(
                  "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
                  invalidFormData.invalid &&
                    invalidFormData.key === "sender-email"
                    ? "scale-100 h-full transition-all duration-150 ease-linear"
                    : "scale-0 h-0"
                )}
              >
                Invalid email address
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sender-phone">Phone Number</Label>
              <Input
                id="sender-phone"
                name="sender-phone"
                placeholder="(555) 123-4567"
                defaultValue={sender.phone}
                onChange={handleEntry}
              />
              <p
                className={cn(
                  "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
                  invalidFormData.invalid &&
                    invalidFormData.key === "sender-phone"
                    ? "scale-100 h-full transition-all duration-150 ease-linear"
                    : "scale-0 h-0"
                )}
              >
                Invalid phone number
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pickup-address">Pickup Address</Label>
            <Textarea
              id="pickup-address"
              name="pickup-address"
              placeholder="Enter complete pickup address with city, state, and ZIP code"
              className="min-h-[80px]"
              defaultValue={sender.address}
              onChange={handleEntry}
            />
            <p
              className={cn(
                "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
                invalidFormData.invalid &&
                  invalidFormData.key === "pickup-address"
                  ? "scale-100 h-full transition-all duration-150 ease-linear"
                  : "scale-0 h-0"
              )}
            >
              Enter a valid address
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recipient Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Recipient Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recipient-name">Full Name</Label>
              <Input
                id="recipient-name"
                name="recipient-name"
                placeholder="Recipient's full name"
                defaultValue={recipient.name}
                onChange={handleEntry}
              />
              <p
                className={cn(
                  "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
                  invalidFormData.invalid &&
                    invalidFormData.key === "recipient-name"
                    ? "scale-100 h-full transition-all duration-150 ease-linear"
                    : "scale-0 h-0"
                )}
              >
                Enter recipient's full name
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipient-email">Email</Label>
              <Input
                id="recipient-email"
                name="recipient-email"
                type="email"
                placeholder="recipient.email@example.com"
                defaultValue={recipient.email}
                onChange={handleEntry}
              />
              <p
                className={cn(
                  "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
                  invalidFormData.invalid &&
                    invalidFormData.key === "recipient-email"
                    ? "scale-100 h-full transition-all duration-150 ease-linear"
                    : "scale-0 h-0"
                )}
              >
                Invalid email address
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipient-phone">Phone Number</Label>
              <Input
                id="recipient-phone"
                name="recipient-phone"
                placeholder="(555) 123-4567"
                defaultValue={recipient.phone}
                onChange={handleEntry}
              />
              <p
                className={cn(
                  "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
                  invalidFormData.invalid &&
                    invalidFormData.key === "recipient-phone"
                    ? "scale-100 h-full transition-all duration-150 ease-linear"
                    : "scale-0 h-0"
                )}
              >
                Invalid phone number
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="delivery-address">Delivery Address</Label>
            <Textarea
              id="delivery-address"
              name="delivery-address"
              placeholder="Enter complete delivery address with city, state, and ZIP code"
              className="min-h-[80px]"
              defaultValue={recipient.address}
              onChange={handleEntry}
            />
            <p
              className={cn(
                "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
                invalidFormData.invalid &&
                  invalidFormData.key === "delivery-address"
                  ? "scale-100 h-full transition-all duration-150 ease-linear"
                  : "scale-0 h-0"
              )}
            >
              Enter a valid address
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              name="language"
              value={language}
              onValueChange={handleEntry}
            >
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem
                    className="flex gap-2"
                    key={lang.code}
                    value={lang.code}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p
              className={cn(
                "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
                invalidFormData.invalid && invalidFormData.key === "language"
                  ? "scale-100 h-full transition-all duration-150 ease-linear"
                  : "scale-0 h-0"
              )}
            >
              Select a language
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Package Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Package Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="package-type">Package Type</Label>
              <Select
                name="package-type"
                value={item.type}
                onValueChange={handleEntry}
              >
                <SelectTrigger id="package-type">
                  <SelectValue placeholder="Select package type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="box">Box</SelectItem>
                  <SelectItem value="envelope">Envelope</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <p
                className={cn(
                  "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
                  invalidFormData.invalid &&
                    invalidFormData.key === "package-type"
                    ? "scale-100 h-full transition-all duration-150 ease-linear"
                    : "scale-0 h-0"
                )}
              >
                Select a package type
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery-type">Delivery Type</Label>
              <Select
                name="delivery-type"
                value={item.deliveryType}
                onValueChange={handleEntry}
              >
                <SelectTrigger id="delivery-type">
                  <SelectValue placeholder="Select delivery type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="express">Express</SelectItem>
                  <SelectItem value="same-day">Same Day</SelectItem>
                </SelectContent>
              </Select>
              <p
                className={cn(
                  "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
                  invalidFormData.invalid &&
                    invalidFormData.key === "delivery-type"
                    ? "scale-100 h-full transition-all duration-150 ease-linear"
                    : "scale-0 h-0"
                )}
              >
                Select delivery type
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                placeholder="0.0"
                step="0.1"
                defaultValue={item.weight}
                onChange={handleEntry}
              />
              <p
                className={cn(
                  "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
                  invalidFormData.invalid && invalidFormData.key === "weight"
                    ? "scale-100 h-full transition-all duration-150 ease-linear"
                    : "scale-0 h-0"
                )}
              >
                Enter the package weight
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="length">Length (in)</Label>
              <Input
                id="length"
                name="length"
                type="number"
                placeholder="0"
                defaultValue={item.length}
                onChange={handleEntry}
              />
              <p
                className={cn(
                  "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
                  invalidFormData.invalid && invalidFormData.key === "length"
                    ? "scale-100 h-full transition-all duration-150 ease-linear"
                    : "scale-0 h-0"
                )}
              >
                Enter the package length
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">Width (in)</Label>
              <Input
                id="width"
                name="width"
                type="number"
                placeholder="0"
                defaultValue={item.width}
                onChange={handleEntry}
              />
              <p
                className={cn(
                  "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
                  invalidFormData.invalid && invalidFormData.key === "width"
                    ? "scale-100 h-full transition-all duration-150 ease-linear"
                    : "scale-0 h-0"
                )}
              >
                Enter the package width
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (in)</Label>
              <Input
                id="height"
                name="height"
                height="height"
                type="number"
                placeholder="0"
                defaultValue={item.height}
                onChange={handleEntry}
              />
              <p
                className={cn(
                  "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
                  invalidFormData.invalid && invalidFormData.key === "height"
                    ? "scale-100 h-full transition-all duration-150 ease-linear"
                    : "scale-0 h-0"
                )}
              >
                Enter the package height
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Image</Label>
              <Image
                src={item.image!}
                alt={item.type}
                width={500}
                height={500}
                className="w-30 h-auto"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Pickup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Schedule Pickup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickup-date">Pickup Date</Label>
              <input
                type="hidden"
                name="pickup-date"
                defaultValue={pickupDate && pickupDate.toString()}
              />
              <Popover>
                <PopoverTrigger id="pickup-date" asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !pickupDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {pickupDate ? (
                      format(pickupDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    required
                    mode="single"
                    selected={pickupDate}
                    onSelect={setPickupDate}
                    autoFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <p
                className={cn(
                  "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
                  invalidFormData.invalid &&
                    invalidFormData.key === "pickup-date"
                    ? "scale-100 h-full transition-all duration-150 ease-linear"
                    : "scale-0 h-0"
                )}
              >
                Enter a valid date
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickup-time">Time Window</Label>
              <Select
                name="pickup-time"
                value={pickup.time}
                onValueChange={handleEntry}
              >
                <SelectTrigger id="pickup-time">
                  <SelectValue placeholder="Select time window" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">
                    Morning (9 AM - 12 PM)
                  </SelectItem>
                  <SelectItem value="afternoon">
                    Afternoon (12 PM - 5 PM)
                  </SelectItem>
                  <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                </SelectContent>
              </Select>
              <p
                className={cn(
                  "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
                  invalidFormData.invalid &&
                    invalidFormData.key === "pickup-time"
                    ? "scale-100 h-full transition-all duration-150 ease-linear"
                    : "scale-0 h-0"
                )}
              >
                Select time
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Routes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-primary" />
            Tracking Routes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label>Select Current Route</Label>
          <ul className="relative space-y-2 before:content='' before:absolute before:top-0 before:left-0 before:w-0.5 before:h-full before:bg-amber-50">
            {targetLocations.map((target, i) => (
              <li
                key={i}
                role="button"
                onClick={() => handleChangeRoute(i)}
                className={cn(
                  target.status === "completed"
                    ? "before:bg-green-500"
                    : target.status == "upcoming"
                    ? "before:bg-blue-500"
                    : "before:bg-orange-500",
                  "cursor-pointer flex items-center justify-between before:block before:size-4 before:rounded-full before:-translate-x-1/2"
                )}
              >
                <span className="grow mr-2">
                  {target.address && getCityCountry(target.address)}
                </span>
                {target.status === "current" && (
                  <Check className="w-4 h-4 text-accent" />
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
