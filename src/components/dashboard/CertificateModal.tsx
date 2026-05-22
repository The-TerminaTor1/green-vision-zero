import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, Download, Share2, Leaf, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CertificateModalProps {
  open: boolean;
  onClose: () => void;
  contribution: {
    id: number;
    project: string;
    amount: number;
    date: string;
  } | null;
  userName: string;
}

const CertificateModal = ({ open, onClose, contribution, userName }: CertificateModalProps) => {
  const { toast } = useToast();
  if (!contribution) return null;

  const certId = `NC-${new Date(contribution.date).getFullYear()}-${String(contribution.id).padStart(6, "0")}`;
  const co2 = (contribution.amount / 10).toFixed(1);
  const credits = Math.round(contribution.amount / 2);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden border-0 bg-transparent shadow-none">
        {/* Certificate */}
        <div className="relative bg-gradient-to-br from-background via-background to-success/5 rounded-2xl shadow-2xl overflow-hidden">
          {/* Decorative corner ornaments */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-success/40 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-success/40 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-success/40 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-success/40 rounded-br-2xl" />

          {/* Subtle pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, hsl(var(--success)) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative px-10 md:px-16 py-12 text-center">
            {/* Seal */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-success/20 blur-2xl rounded-full" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-success to-primary flex items-center justify-center shadow-lg">
                  <Award className="h-10 w-10 text-success-foreground" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-success animate-pulse" />
              </div>
            </div>

            {/* Title */}
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
              Nirmal Carbon
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-1">
              Certificate of Contribution
            </h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="h-px w-12 bg-success/40" />
              <Leaf className="h-4 w-4 text-success" />
              <div className="h-px w-12 bg-success/40" />
            </div>

            {/* Recipient */}
            <p className="text-sm text-muted-foreground mb-2">This certifies that</p>
            <p className="text-2xl md:text-3xl font-serif italic text-primary mb-6">
              {userName}
            </p>

            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
              has made a verified contribution toward a sustainable future through participation in
            </p>

            <p className="text-xl md:text-2xl font-semibold text-foreground mb-8">
              "{contribution.project}"
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8 py-6 border-y border-border/60">
              <div>
                <div className="text-2xl font-bold text-success">{co2}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  kg CO₂ Offset
                </div>
              </div>
              <div className="border-x border-border/60">
                <div className="text-2xl font-bold text-primary">{credits}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  Credits Earned
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">₹{contribution.amount}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  Contributed
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-end justify-between text-left mt-10">
              <div>
                <p className="font-serif italic text-lg text-foreground border-b border-foreground/30 pb-1 inline-block">
                  Nirmal Carbon
                </p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  Authorized Signature
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Certificate ID
                </p>
                <p className="font-mono text-xs text-foreground mt-1">{certId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  {new Date(contribution.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  Date of Issue
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-4 justify-center">
          <Button
            onClick={() =>
              toast({ title: "Download started", description: "Your certificate is being prepared." })
            }
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard?.writeText(`${window.location.origin}/certificate/${certId}`);
              toast({ title: "Link copied", description: "Share your impact with the world." });
            }}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;
