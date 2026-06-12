import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, Save, Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ProfileSettings = () => {
  const { user, profile, role, refreshProfile, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? "");
      setBio(profile.bio ?? "");
      setPhone(profile.phone ?? "");
      setOrganization(profile.organization ?? "");
      setAvatarUrl(profile.avatar_url ?? "");
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, bio, phone, organization, avatar_url: avatarUrl })
      .eq("id", user.id);
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated", description: "Your changes are saved." });
      await refreshProfile();
    }
  };

  const initials = (fullName || user?.email || "U").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h1>
          <p className="text-muted-foreground mb-8">Manage how you appear across Nirmal Carbon.</p>

          <Card className="p-6 mb-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-primary/10">
                  <AvatarImage src={avatarUrl} alt={fullName} />
                  <AvatarFallback className="text-xl">{initials}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1.5">
                  <Camera className="h-3.5 w-3.5" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold">{fullName || "Your name"}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                {role && <Badge className="mt-2 capitalize">{role}</Badge>}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <form onSubmit={handleSave} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input id="avatar" placeholder="https://..." value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
                <p className="text-xs text-muted-foreground">Paste a link to any image to use as your profile picture.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="org">Organization</Label>
                <Input id="org" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Company / NGO / Personal" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 ..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A short description about you or your organization." />
              </div>
              <Button type="submit" disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Save changes
              </Button>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileSettings;
