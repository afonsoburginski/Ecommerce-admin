"use client";

import {
  ChevronLeft,
  CreditCard,
  MoreVertical,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DataTable from "@/components/dataTable/DataTable"; // Import the DataTable component

// Dados de exemplo simulando informações do Stripe
const stripeAccount = {
  email: "merchant@example.com",
  paymentMethods: [
    {
      id: "pm_1",
      type: "Credit Card",
      last4: "4242",
      expiry: "12/24",
      status: "Active",
    },
    {
      id: "pm_2",
      type: "Bank Transfer",
      last4: "6789",
      expiry: "N/A",
      status: "Active",
    },
  ],
};

// Utilize DataTable para transações
export default function Payments() {
  return (
    <div className="flex h-full w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="flex-1 p-4 sm:px-6 sm:py-0">
          <div className="mx-auto w-full max-w-screen-xl space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Payments Dashboard
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                Stripe Connected
              </Badge>
            </div>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Your Stripe account: {stripeAccount.email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Last 4</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stripeAccount.paymentMethods.map((method) => (
                      <TableRow key={method.id}>
                        <TableCell>
                          <CreditCard className="mr-2 h-4 w-4" />
                          {method.type}
                        </TableCell>
                        <TableCell>**** {method.last4}</TableCell>
                        <TableCell>{method.expiry}</TableCell>
                        <TableCell>
                          <Badge variant="success">{method.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="icon" variant="ghost">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Overview of your latest transactions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <DataTable /> {/* Use the DataTable component here */}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
