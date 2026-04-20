import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";

type ContentMap = Record<string, string>;

const SiteContentManager = () => {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const { data } = await (supabase.from("site_content") as any).select("*");
      const map: ContentMap = {};
      (data || []).forEach((row: any) => (map[row.key] = row.value));
      setContent(map);
      setLoading(false);
    })();
  }, []);

  const setField = (key: string, value: string) =>
    setContent((prev) => ({ ...prev, [key]: value }));

  const saveKeys = async (keys: string[], label: string) => {
    setSavingKey(label);
    const results = await Promise.all(
      keys.map((key) =>
        (supabase.from("site_content") as any)
          .upsert(
            { key, value: content[key] ?? "", updated_at: new Date().toISOString() },
            { onConflict: "key" }
          )
      )
    );
    const hasError = results.some((r: any) => r.error);
    toast({
      title: hasError ? "Error" : "Saved",
      description: hasError ? `Failed to save ${label}.` : `${label} updated.`,
      variant: hasError ? "destructive" : "default",
    });
    setSavingKey(null);
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading...</div>;
  }

  const Field = ({ label, k, multi = false, rows = 2 }: { label: string; k: string; multi?: boolean; rows?: number }) => (
    <div>
      <Label htmlFor={k}>{label}</Label>
      {multi ? (
        <Textarea id={k} rows={rows} value={content[k] || ""} onChange={(e) => setField(k, e.target.value)} />
      ) : (
        <Input id={k} value={content[k] || ""} onChange={(e) => setField(k, e.target.value)} />
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle>Homepage Hero</CardTitle>
          <p className="text-sm text-muted-foreground">
            Edit the main headline, subtext, and CTA buttons. Leave blank to use defaults.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="Headline" k="hero_headline" multi rows={2} />
          <Field label="Subheadline" k="hero_subhead" multi rows={3} />
          <div className="grid md:grid-cols-2 gap-3">
            <Field label="Primary CTA text" k="hero_cta_primary" />
            <Field label="Badge text (green pill)" k="hero_badge_text" />
          </div>
          <div className="space-y-3 border-t pt-4">
            <p className="text-sm font-semibold text-foreground">Trust Pills (4)</p>
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Pill 1" k="hero_trust_1" />
              <Field label="Pill 2" k="hero_trust_2" />
              <Field label="Pill 3" k="hero_trust_3" />
              <Field label="Pill 4" k="hero_trust_4" />
            </div>
          </div>
          <Button
            onClick={() => saveKeys([
              "hero_headline", "hero_subhead", "hero_cta_primary", "hero_badge_text",
              "hero_trust_1", "hero_trust_2", "hero_trust_3", "hero_trust_4",
            ], "Hero")}
            disabled={savingKey === "Hero"}
          >
            <Save className="w-4 h-4 mr-2" />
            {savingKey === "Hero" ? "Saving..." : "Save Hero"}
          </Button>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-3">
            <Field label="Phone number" k="contact_phone" />
            <Field label="Email" k="contact_email" />
          </div>
          <Field label="Service area text" k="contact_area" />
          <Field label="Hours" k="contact_hours" />
          <Button
            onClick={() => saveKeys(["contact_phone", "contact_email", "contact_area", "contact_hours"], "Contact")}
            disabled={savingKey === "Contact"}
          >
            <Save className="w-4 h-4 mr-2" />
            {savingKey === "Contact" ? "Saving..." : "Save Contact"}
          </Button>
        </CardContent>
      </Card>

      {/* Social Proof */}
      <Card>
        <CardHeader>
          <CardTitle>Social Proof / Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-3">
            <Field label="Star rating (e.g. 4.9)" k="social_rating" />
            <Field label="Review count text (e.g. 127+ Reviews)" k="social_review_count" />
          </div>
          <Field label="Google Reviews URL" k="google_reviews_url" />
          <Button
            onClick={() => saveKeys(["social_rating", "social_review_count", "google_reviews_url"], "Social Proof")}
            disabled={savingKey === "Social Proof"}
          >
            <Save className="w-4 h-4 mr-2" />
            {savingKey === "Social Proof" ? "Saving..." : "Save Social Proof"}
          </Button>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <Card>
        <CardHeader>
          <CardTitle>Testimonials (5)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border border-border rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-muted-foreground">Testimonial {i}</p>
              <Field label="Quote" k={`testimonial_${i}_text`} multi rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Name" k={`testimonial_${i}_name`} />
                <Field label="Location" k={`testimonial_${i}_location`} />
              </div>
            </div>
          ))}
          <Button
            onClick={() => saveKeys(
              [1, 2, 3, 4, 5].flatMap((i) => [
                `testimonial_${i}_text`, `testimonial_${i}_name`, `testimonial_${i}_location`,
              ]),
              "Testimonials"
            )}
            disabled={savingKey === "Testimonials"}
          >
            <Save className="w-4 h-4 mr-2" />
            {savingKey === "Testimonials" ? "Saving..." : "Save Testimonials"}
          </Button>
        </CardContent>
      </Card>

      {/* Service Pricing Display */}
      <Card>
        <CardHeader>
          <CardTitle>Service Card Pricing Labels</CardTitle>
          <p className="text-sm text-muted-foreground">
            These are the "starting from" prices shown on service cards. They don't affect the calculator.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {["standard", "deep", "moveinout", "carpet", "upholstery", "airbnb", "office", "postconstruction"].map((s) => (
            <div key={s} className="grid md:grid-cols-3 gap-3">
              <Field label={`${s} - Title`} k={`service_${s}_title`} />
              <Field label={`${s} - Price label`} k={`service_${s}_price`} />
              <Field label={`${s} - Short desc`} k={`service_${s}_desc`} />
            </div>
          ))}
          <Button
            onClick={() => saveKeys(
              ["standard", "deep", "moveinout", "carpet", "upholstery", "airbnb", "office", "postconstruction"].flatMap((s) => [
                `service_${s}_title`, `service_${s}_price`, `service_${s}_desc`,
              ]),
              "Service Cards"
            )}
            disabled={savingKey === "Service Cards"}
          >
            <Save className="w-4 h-4 mr-2" />
            {savingKey === "Service Cards" ? "Saving..." : "Save Service Cards"}
          </Button>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Homepage FAQ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => (
            <div key={i} className="space-y-2 border-b border-border pb-4 last:border-b-0 last:pb-0">
              <p className="text-sm font-semibold text-foreground">Question {i}</p>
              <Field label={`Q${i}`} k={`faq_q${i}`} />
              <Field label={`A${i}`} k={`faq_a${i}`} multi rows={3} />
            </div>
          ))}
          <Button
            onClick={() => saveKeys(
              Array.from({ length: 8 }, (_, i) => i + 1).flatMap((i) => [`faq_q${i}`, `faq_a${i}`]),
              "FAQ"
            )}
            disabled={savingKey === "FAQ"}
          >
            <Save className="w-4 h-4 mr-2" />
            {savingKey === "FAQ" ? "Saving..." : "Save FAQ"}
          </Button>
        </CardContent>
      </Card>

      {/* External Links */}
      <Card>
        <CardHeader>
          <CardTitle>External Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="Instagram URL" k="instagram_url" />
          <Field label="TikTok URL" k="tiktok_url" />
          <Field label="Facebook URL" k="facebook_url" />
          <Field label="Referral program URL" k="referral_url" />
          <Button
            onClick={() => saveKeys(["instagram_url", "tiktok_url", "facebook_url", "referral_url"], "Links")}
            disabled={savingKey === "Links"}
          >
            <Save className="w-4 h-4 mr-2" />
            {savingKey === "Links" ? "Saving..." : "Save Links"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteContentManager;
