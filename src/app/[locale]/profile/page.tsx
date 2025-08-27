"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, MapPin, User, Shield, Bell } from "lucide-react";

export default function Profile() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
  });

  const [addresses] = useState([
    {
      id: 1,
      type: "Home",
      address: "123 Main St, New York, NY 10001",
    },
    {
      id: 2,
      type: "Office",
      address: "456 Business Ave, New York, NY 10002",
    },
  ]);

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    smsUpdates: false,
    trackingUpdates: true,
  });

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Account Settings
          </h1>
          <p className="text-muted-foreground">
            Update your personal information and preferences.
          </p>
        </div>

        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your basic account details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={personalInfo.fullName}
                    onChange={(e) =>
                      handlePersonalInfoChange("fullName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) =>
                      handlePersonalInfoChange("phone", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) =>
                    handlePersonalInfoChange("email", e.target.value)
                  }
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Saved Addresses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Saved Addresses
              </CardTitle>
              <CardDescription>
                Manage your pickup and delivery addresses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {addresses.map((address, index) => (
                  <div key={address.id}>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">
                          {address.type}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {address.address}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {index < addresses.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Address
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your password and security preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Password</div>
                  <div className="text-sm text-muted-foreground">
                    Last changed 30 days ago
                  </div>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">
                    Two-Factor Authentication
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Add an extra layer of security
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
              <CardDescription>
                Choose how you want to receive updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">
                    Email Updates
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Receive general updates via email
                  </div>
                </div>
                <Switch
                  checked={notifications.emailUpdates}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("emailUpdates", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">SMS Updates</div>
                  <div className="text-sm text-muted-foreground">
                    Receive updates via text message
                  </div>
                </div>
                <Switch
                  checked={notifications.smsUpdates}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("smsUpdates", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">
                    Tracking Updates
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Get notified about package status changes
                  </div>
                </div>
                <Switch
                  checked={notifications.trackingUpdates}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("trackingUpdates", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
