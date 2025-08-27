import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Send, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Header from "./Header";
import { getUser } from "@/lib/user";
import { getSenderShipments } from "@/lib/shipment";
import ShipmentCard from "./ShipmentCard";

const Dashboard = async () => {
  const user = await getUser(true);

  const recentShipments = await getSenderShipments(user._id);

  const quickActions = [
    {
      title: "Send a New Package",
      description: "Create a new shipment",
      icon: Send,
      href: "/send",
      color: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
    {
      title: "Track a Package",
      description: "Enter tracking number",
      icon: Search,
      href: "/track",
      color: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    },
  ];

  return (
    <div className="min-h-screen bg-background lg:flex">
      {/* Header */}
      <Header userName={user.name} />
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6">
        {/* Welcome Section */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-muted-foreground text-sm lg:text-base">
            Manage your shipments, track packages, and more.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Shipments */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
              <Package className="h-5 w-5 text-primary" />
              <span>Recent Shipments</span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            {recentShipments.length ? (
              <>
                <div className="space-y-3 lg:space-y-4">
                  {recentShipments.map((shipment) => (
                    <ShipmentCard
                      key={shipment._id}
                      shipmentId={shipment._id}
                      packageType={shipment.package.type}
                      routes={shipment.routes}
                      pickupDate={shipment.pickup.date}
                    />
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    asChild
                    className="w-full lg:w-auto"
                  >
                    <Link href="/dashboard">View All Shipments</Link>
                  </Button>
                </div>
              </>
            ) : (
              <p className="tetx">
                Nothing to show!
                <br />
                Make a new shipment by sending a package
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
