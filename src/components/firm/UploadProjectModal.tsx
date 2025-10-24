import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  MapPin, 
  Leaf, 
  DollarSign,
  FileCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const UploadProjectModal = ({ open, onClose }: UploadProjectModalProps) => {
  const [step, setStep] = useState(1);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

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

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    toast({
      title: "Project submitted!",
      description: "Your project is now under review. You'll be notified once approved.",
    });
    onClose();
    setStep(1);
    setUploadedFiles([]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
            Upload New Project
          </DialogTitle>
          <p className="text-muted-foreground mt-2">
            Create a verified carbon offset project and start selling credits
          </p>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Step {step} of {totalSteps}</span>
            <span className="text-primary font-semibold">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className={step === 1 ? "text-primary font-semibold" : ""}>Basic Info</span>
            <span className={step === 2 ? "text-primary font-semibold" : ""}>Project Details</span>
            <span className={step === 3 ? "text-primary font-semibold" : ""}>Proof & Media</span>
            <span className={step === 4 ? "text-primary font-semibold" : ""}>Review</span>
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-success/5 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Project Basics</h3>
                  <p className="text-sm text-muted-foreground">Tell us about your project</p>
                </div>
              </div>
            </Card>

            <div>
              <Label htmlFor="title" className="text-base font-semibold">Project Title *</Label>
              <Input 
                id="title" 
                placeholder="e.g., Amazon Rainforest Restoration" 
                className="mt-2 h-12 text-base"
              />
            </div>

            <div>
              <Label htmlFor="type" className="text-base font-semibold">Project Type *</Label>
              <select 
                id="type"
                className="w-full mt-2 h-12 px-3 rounded-lg border border-input bg-background text-base"
              >
                <option value="">Select project type</option>
                <option value="reforestation">Reforestation</option>
                <option value="renewable">Renewable Energy</option>
                <option value="conservation">Forest Conservation</option>
                <option value="restoration">Wetland Restoration</option>
                <option value="soil">Soil Carbon Sequestration</option>
              </select>
            </div>

            <div>
              <Label htmlFor="location" className="text-base font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location *
              </Label>
              <Input 
                id="location" 
                placeholder="Country, Region" 
                className="mt-2 h-12 text-base"
              />
            </div>
          </div>
        )}

        {/* Step 2: Project Details */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-success/5 to-accent/5 border-success/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-success/10 rounded-lg">
                  <FileCheck className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Project Details</h3>
                  <p className="text-sm text-muted-foreground">Provide detailed information</p>
                </div>
              </div>
            </Card>

            <div>
              <Label htmlFor="description" className="text-base font-semibold">Description *</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your project, its goals, and environmental impact..."
                rows={6}
                className="mt-2 text-base"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="credits" className="text-base font-semibold flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-success" />
                  Total Credits Available *
                </Label>
                <Input 
                  id="credits" 
                  type="number" 
                  placeholder="e.g., 50000"
                  className="mt-2 h-12 text-base"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Based on verified carbon sequestration potential
                </p>
              </div>
              <div>
                <Label htmlFor="price" className="text-base font-semibold flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  Price per Credit (USD) *
                </Label>
                <Input 
                  id="price" 
                  type="number" 
                  placeholder="e.g., 12"
                  className="mt-2 h-12 text-base"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Market average: $8-15 per credit
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="impact" className="text-base font-semibold">Annual Impact *</Label>
              <Input 
                id="impact" 
                placeholder="e.g., 5,000 tons CO₂ per year"
                className="mt-2 h-12 text-base"
              />
            </div>
          </div>
        )}

        {/* Step 3: Proof & Media */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <ImageIcon className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Proof & Media</h3>
                  <p className="text-sm text-muted-foreground">Upload verification documents and photos</p>
                </div>
              </div>
            </Card>

            <div
              className={`relative border-2 border-dashed rounded-xl p-16 transition-all duration-300 ${
                dragActive 
                  ? "border-primary bg-primary/10 scale-[1.02] shadow-lg" 
                  : "border-border bg-gradient-to-br from-secondary/40 via-accent/20 to-success/20 hover:border-primary/50 hover:shadow-md"
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
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="text-center pointer-events-none">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 transition-all duration-300 ${
                  dragActive ? "bg-primary/20 scale-110" : "bg-gradient-to-br from-primary/10 to-success/10"
                }`}>
                  <Upload className={`h-12 w-12 transition-all duration-300 ${
                    dragActive ? "text-primary animate-bounce" : "text-primary/70"
                  }`} />
                </div>
                <p className="text-2xl font-bold mb-3 text-foreground">
                  {dragActive ? "Drop your files here!" : "Drag & Drop files here"}
                </p>
                <p className="text-base text-muted-foreground mb-6">
                  or click anywhere to browse
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-lg">
                    <ImageIcon className="h-4 w-4" />
                    <span>Images</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-lg">
                    <FileCheck className="h-4 w-4" />
                    <span>PDF</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-lg">
                    <FileCheck className="h-4 w-4" />
                    <span>Documents</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Max file size: 10MB per file
                </p>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="animate-fade-in">
                <Label className="mb-4 block text-base font-semibold">
                  Uploaded Files ({uploadedFiles.length})
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedFiles.map((file, index) => (
                    <Card key={index} className="relative p-3 hover:shadow-lg transition-all duration-300 group">
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 hover:bg-destructive/90 transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100 z-10"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-2 overflow-hidden">
                        {file.type.startsWith('image/') ? (
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="h-10 w-10 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-xs truncate font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(0)} KB
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-success/10 to-primary/10 border-success/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-success/20 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Review & Submit</h3>
                  <p className="text-sm text-muted-foreground">Verify your project details</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground">Project Title</Label>
                <p className="text-lg font-semibold">Amazon Rainforest Restoration</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Type</Label>
                  <Badge className="mt-1">Reforestation</Badge>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Location</Label>
                  <p className="font-medium">Brazil, Amazon Basin</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Total Credits</Label>
                  <p className="text-xl font-bold text-success">50,000</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Price per Credit</Label>
                  <p className="text-xl font-bold text-primary">$12.00</p>
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Uploaded Files</Label>
                <p className="font-medium">{uploadedFiles.length} file(s)</p>
              </div>
            </Card>

            <Card className="p-6 bg-accent/5 border-accent/30">
              <div className="flex items-start gap-3">
                <FileCheck className="h-5 w-5 text-accent-foreground mt-0.5" />
                <div>
                  <p className="font-semibold text-accent-foreground mb-1">Verification Process</p>
                  <p className="text-sm text-muted-foreground">
                    Your project will be reviewed by our verification team within 48 hours. 
                    You'll receive email notifications about the status.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            className="min-w-[120px]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          {step < totalSteps ? (
            <Button onClick={handleNext} className="min-w-[120px]">
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="min-w-[120px] bg-success hover:bg-success/90">
              <CheckCircle className="h-4 w-4 mr-2" />
              Submit Project
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadProjectModal;
