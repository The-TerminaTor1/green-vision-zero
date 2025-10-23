import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X, Image as ImageIcon, FileCheck, TrendingUp, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProjectManagementModalProps {
  project: any;
  open: boolean;
  onClose: () => void;
}

const ProjectManagementModal = ({ project, open, onClose }: ProjectManagementModalProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...imageFiles]);
      toast({
        title: "Files uploaded",
        description: `${imageFiles.length} image(s) added successfully`,
      });
    }
  }, [toast]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...files]);
      toast({
        title: "Files uploaded",
        description: `${files.length} file(s) added successfully`,
      });
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Manage Project: {project.title}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Project Details</TabsTrigger>
            <TabsTrigger value="uploads">Proof & Documents</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid gap-6">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" defaultValue={project.title} className="mt-2" />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  defaultValue={project.description || "Detailed project description"} 
                  rows={4}
                  className="mt-2"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue={project.location} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="type">Project Type</Label>
                  <Input id="type" defaultValue={project.type} className="mt-2" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="credits">Total Credits Available</Label>
                  <Input 
                    id="credits" 
                    type="number" 
                    defaultValue={project.creditsAvailable} 
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price per Credit ($)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    defaultValue={project.pricePerCredit} 
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="impact">Annual Impact</Label>
                <Input id="impact" defaultValue={project.impact} className="mt-2" />
              </div>

              <Button className="w-full">
                <FileCheck className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="uploads" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Upload Proof Documents & Photos</Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload verification photos, certificates, and documentation
                </p>
              </div>

              <div
                className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${
                  dragActive 
                    ? "border-primary bg-primary/5" 
                    : "border-border bg-secondary/20"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-semibold mb-2">
                    Drag & Drop files here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse (Images, PDF, DOC)
                  </p>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div>
                  <Label className="mb-3 block">Uploaded Files ({uploadedFiles.length})</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedFiles.map((file, index) => (
                      <Card key={index} className="relative p-3">
                        <button
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <div className="aspect-square bg-muted rounded-md flex items-center justify-center mb-2">
                          {file.type.startsWith('image/') ? (
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt={file.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-xs truncate">{file.name}</p>
                      </Card>
                    ))}
                  </div>
                  <Button className="w-full mt-4">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload {uploadedFiles.length} File(s)
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Credits Sold</p>
                    <p className="text-2xl font-bold">
                      {(project.creditsAvailable * 0.3).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-success">+15% this month</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-success/10 rounded-lg">
                    <DollarSign className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue Generated</p>
                    <p className="text-2xl font-bold">
                      ${(project.creditsAvailable * 0.3 * project.pricePerCredit).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-success">+22% this month</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <FileCheck className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Verification Status</p>
                    <Badge className="mt-1">Verified</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Last verified: 2 days ago</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Project Rating</p>
                    <p className="text-2xl font-bold">{project.rating || 4.8}/5.0</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Based on 234 reviews</p>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div>
                      <p className="font-medium">Corporate Buyer {i}</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">1,000 credits</p>
                      <p className="text-sm text-success">${project.pricePerCredit * 1000}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectManagementModal;
