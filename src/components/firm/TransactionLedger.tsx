import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Download, Search, ArrowUpRight, ArrowDownRight, Filter } from "lucide-react";
import { useState } from "react";

const TransactionLedger = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const transactions = [
    {
      id: "TXN-2024-001234",
      type: "sale",
      buyer: "Global Industries Corp",
      project: "Amazon Rainforest Restoration",
      credits: 10000,
      amount: 120000,
      date: "2024-01-15T10:30:00",
      status: "completed",
      certificate: "CERT-2024-001234",
    },
    {
      id: "TXN-2024-001233",
      type: "sale",
      buyer: "EcoTech Solutions",
      project: "Coastal Mangrove Protection",
      credits: 5000,
      amount: 55000,
      date: "2024-01-14T14:22:00",
      status: "completed",
      certificate: "CERT-2024-001233",
    },
    {
      id: "TXN-2024-001232",
      type: "issuance",
      buyer: "Self",
      project: "Amazon Rainforest Restoration",
      credits: 50000,
      amount: 0,
      date: "2024-01-10T09:15:00",
      status: "completed",
      certificate: "CERT-2024-001232",
    },
    {
      id: "TXN-2024-001231",
      type: "sale",
      buyer: "Green Energy Inc",
      project: "Urban Reforestation Program",
      credits: 8000,
      amount: 88000,
      date: "2024-01-08T16:45:00",
      status: "completed",
      certificate: "CERT-2024-001231",
    },
    {
      id: "TXN-2024-001230",
      type: "verification",
      buyer: "ISO Verification Body",
      project: "Coastal Mangrove Protection",
      credits: 40000,
      amount: 0,
      date: "2024-01-05T11:00:00",
      status: "completed",
      certificate: "CERT-2024-001230",
    },
  ];

  const filteredTransactions = transactions.filter(
    (txn) =>
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Transaction Ledger</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Complete blockchain-verified transaction history
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Ledger
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions, buyers, or projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Transaction ID
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Type</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Buyer/Entity
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Project</th>
                <th className="text-right p-4 text-sm font-semibold text-foreground">Credits</th>
                <th className="text-right p-4 text-sm font-semibold text-foreground">Amount</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Date</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Status</th>
                <th className="text-center p-4 text-sm font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    <code className="text-xs font-mono text-primary">{txn.id}</code>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {txn.type === "sale" ? (
                        <ArrowUpRight className="h-4 w-4 text-success" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-primary" />
                      )}
                      <span className="text-sm capitalize">{txn.type}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{txn.buyer}</td>
                  <td className="p-4 text-sm text-muted-foreground max-w-xs truncate">
                    {txn.project}
                  </td>
                  <td className="p-4 text-right font-semibold text-sm">
                    {txn.credits.toLocaleString()}
                  </td>
                  <td className="p-4 text-right font-semibold text-sm">
                    {txn.amount > 0 ? `$${txn.amount.toLocaleString()}` : "-"}
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(txn.date).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <Badge className="bg-success/10 text-success border-success/20">
                      {txn.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-center">
                    <Button variant="ghost" size="sm">
                      <Download className="h-3 w-3" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No transactions found matching your search criteria
        </div>
      )}
    </div>
  );
};

export default TransactionLedger;
