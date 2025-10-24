import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, Upload, FileCheck, Calendar, Award } from "lucide-react";

const CertificationManager = () => {
  const certifications = [
    {
      id: 1,
      name: "ISO 14064-2:2019",
      description: "Greenhouse gases - Part 2: Specification with guidance",
      issuer: "International Organization for Standardization",
      issueDate: "2023-01-15",
      expiryDate: "2025-12-31",
      status: "active",
      verified: true,
    },
    {
      id: 2,
      name: "VCS (Verified Carbon Standard)",
      description: "Project validation and verification standard",
      issuer: "Verra",
      issueDate: "2023-03-10",
      expiryDate: "2026-03-10",
      status: "active",
      verified: true,
    },
    {
      id: 3,
      name: "Gold Standard",
      description: "Premium carbon credit certification",
      issuer: "Gold Standard Foundation",
      issueDate: "2022-11-20",
      expiryDate: "2025-11-20",
      status: "active",
      verified: true,
    },
    {
      id: 4,
      name: "Climate Action Reserve",
      description: "Forest carbon sequestration protocol",
      issuer: "Climate Action Reserve",
      issueDate: "2023-06-01",
      expiryDate: "2024-12-31",
      status: "expiring",
      verified: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Certifications & Standards</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your project certifications and compliance documents
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload New Certificate
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {certifications.map((cert) => (
          <Card key={cert.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{cert.description}</p>
                  <p className="text-xs text-muted-foreground">Issued by: {cert.issuer}</p>
                </div>
              </div>
              {cert.verified && (
                <Badge className="bg-success text-success-foreground">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-secondary/50 rounded-lg">
              <div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <Calendar className="h-3 w-3" />
                  <span>Issue Date</span>
                </div>
                <p className="text-sm font-medium">
                  {new Date(cert.issueDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <Calendar className="h-3 w-3" />
                  <span>Expiry Date</span>
                </div>
                <p className="text-sm font-medium">
                  {new Date(cert.expiryDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {cert.status === "expiring" && (
              <div className="mb-4 p-2 bg-warning/10 border border-warning/30 rounded text-xs text-warning">
                ⚠️ Certificate expiring soon - renewal required
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Download className="h-3 w-3 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <FileCheck className="h-3 w-3 mr-2" />
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CertificationManager;
