import { useState } from "react";
import React from "react";
import { useAppAuth } from "@/contexts/AppProviders";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AVATAR_STYLES = [
  { 
    value: "bottts", 
    label: "Energetic",
    description: "For those high-energy, productive days",
    options: "backgroundColor=ff6961&primaryColorLevel=600&secondaryColorLevel=400&mouthColor=ff6b6b&eyes=happy"
  },
  { 
    value: "bottts", 
    label: "Calm",
    description: "Representing peaceful, balanced moments",
    options: "backgroundColor=fdfd96&primaryColorLevel=400&secondaryColorLevel=200&mouthColor=4a9eff&eyes=happy"
  },
  {
    value: "bottts", 
    label: "Cozy",
    description: "For those days when you need comfort",
    options: "backgroundColor=c7a2ff&primaryColorLevel=400&secondaryColorLevel=200&mouthColor=4a9eff&eyes=happy"
  },
  { 
    value: "bottts", 
    label: "Strong",
    description: "Embodying inner strength and resilience",
    options: "backgroundColor=5ac9ff&primaryColorLevel=700&secondaryColorLevel=500&mouthColor=4a5568&eyes=happy"
  },
  {
    value: "bottts", 
    label: "Creative",
    description: "When your creative energy is flowing",
    options: "backgroundColor=ffb347&primaryColorLevel=400&secondaryColorLevel=200&mouthColor=4a9eff&eyes=happy"
  },
  { 
    value: "bottts", 
    label: "Relaxed",
    description: "For your peaceful, self-care moments",
    options: "backgroundColor=77dd77&primaryColorLevel=300&secondaryColorLevel=100&mouthColor=38b2ac&eyes=happy"
  }
];

export default function Profile() {
  const { user, updateUser } = useAppAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarStyle, setAvatarStyle] = useState("bottts");
  const [avatarOptions, setAvatarOptions] = useState("backgroundColor=b6e3f4&primaryColorLevel=600&secondaryColorLevel=400&mouthColor=ff6b6b&eyes=happy");
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    avatarStyle: user?.avatarStyle || "bottts",
    avatarOptions: user?.avatarOptions || "backgroundColor=b6e3f4&primaryColorLevel=600&secondaryColorLevel=400&mouthColor=ff6b6b&eyes=happy"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarStyleChange = (style: string, options: string) => {
    setAvatarStyle(style);
    setAvatarOptions(options);
    setFormData(prev => ({
      ...prev,
      avatarStyle: style,
      avatarOptions: options
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({ ...formData, avatarStyle, avatarOptions });
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getAvatarUrl = (style: string, options: string, seed: string) => {
    const url = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&${options}`;
    console.log('Avatar URL:', url); // Debug log
    return url;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{t("profile")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <div className={`relative group ${!isEditing ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}>
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage 
                      src={getAvatarUrl(formData.avatarStyle, formData.avatarOptions, user?.email || '')}
                      alt="Avatar"
                    />
                    <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm">{t("changeAvatar")}</span>
                    </div>
                  )}
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]" onOpenAutoFocus={(e) => {
                if (!isEditing) {
                  e.preventDefault();
                }
              }}>
                {isEditing ? (
                  <>
                    <DialogHeader>
                      <DialogTitle>{t("chooseMoodAvatar")}</DialogTitle>
                      <p className="text-sm text-muted-foreground">
                        {t("chooseMoodAvatarDescription")}
                      </p>
                    </DialogHeader>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
                      {AVATAR_STYLES.map((style) => (
                        <div
                          key={style.value + style.options}
                          className={`p-4 rounded-lg cursor-pointer transition-all ${
                            formData.avatarStyle === style.value && formData.avatarOptions === style.options
                              ? "bg-primary/10 border-2 border-primary"
                              : "border-2 border-transparent hover:bg-accent"
                          }`}
                          onClick={() => handleAvatarStyleChange(style.value, style.options)}
                        >
                          <Avatar className="h-16 w-16 mx-auto mb-2">
                            <AvatarImage 
                              src={getAvatarUrl(style.value, style.options, user?.email || '')}
                              alt={style.label}
                            />
                            <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
                          </Avatar>
                          <div className="text-center">
                            <p className="font-medium">{t(style.label.toLowerCase())}</p>
                            <p className="text-xs text-muted-foreground mt-1">{t(style.description.toLowerCase())}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-muted-foreground">{t("editProfileToChangeAvatar")}</p>
                  </div>
                )}
              </DialogContent>
            </Dialog>
            <h2 className="text-xl font-semibold">{user?.firstName} {user?.lastName}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </>
              ) : (
                <Button type="button" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 