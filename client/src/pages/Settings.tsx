import { useState } from "react";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    cycleReminders: true,
    productDelivery: true,
    promotions: false,
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      return newSettings;
    });
    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: t("settings"),
      description: t("languageUpdated"),
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{t("settings")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("appearance")}</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="theme">{t("theme")}</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("selectTheme")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">{t("light")}</SelectItem>
                  <SelectItem value="dark">{t("dark")}</SelectItem>
                  <SelectItem value="system">{t("system")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Language Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("language")}</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="language">{t("displayLanguage")}</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("selectLanguage")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Notification Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("notifications")}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cycleReminders">{t("cycleReminders")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("cycleRemindersDescription")}
                  </p>
                </div>
                <Switch
                  id="cycleReminders"
                  checked={notifications.cycleReminders}
                  onCheckedChange={() => handleNotificationChange("cycleReminders")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="productDelivery">{t("productDelivery")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("productDeliveryDescription")}
                  </p>
                </div>
                <Switch
                  id="productDelivery"
                  checked={notifications.productDelivery}
                  onCheckedChange={() => handleNotificationChange("productDelivery")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="promotions">{t("promotions")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("promotionsDescription")}
                  </p>
                </div>
                <Switch
                  id="promotions"
                  checked={notifications.promotions}
                  onCheckedChange={() => handleNotificationChange("promotions")}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 