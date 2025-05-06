import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    dashboard: "Dashboard",
    products: "Products",
    subscription: "Subscription",
    profile: "Profile",
    settings: "Settings",
    signOut: "Sign out",
    cycleReminders: "Cycle Reminders",
    productDelivery: "Product Delivery",
    promotions: "Promotions",
    appearance: "Appearance",
    language: "Language",
    notifications: "Notifications",
    theme: "Theme",
    displayLanguage: "Display Language",
    welcomeToFlowEase: "Welcome to FlowEase",
    enterCycleInfo: "Please enter your cycle information to get started.",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    editProfile: "Edit Profile",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
  },
  es: {
    dashboard: "Panel",
    products: "Productos",
    subscription: "Suscripción",
    profile: "Perfil",
    settings: "Ajustes",
    signOut: "Cerrar sesión",
    cycleReminders: "Recordatorios del ciclo",
    productDelivery: "Entrega de productos",
    promotions: "Promociones",
    appearance: "Apariencia",
    language: "Idioma",
    notifications: "Notificaciones",
    theme: "Tema",
    displayLanguage: "Idioma de visualización",
    welcomeToFlowEase: "Bienvenida a FlowEase",
    enterCycleInfo: "Por favor, ingresa la información de tu ciclo para comenzar.",
    saveChanges: "Guardar cambios",
    cancel: "Cancelar",
    editProfile: "Editar perfil",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo electrónico",
  },
  fr: {
    dashboard: "Tableau de bord",
    products: "Produits",
    subscription: "Abonnement",
    profile: "Profil",
    settings: "Paramètres",
    signOut: "Déconnexion",
    cycleReminders: "Rappels de cycle",
    productDelivery: "Livraison de produits",
    promotions: "Promotions",
    appearance: "Apparence",
    language: "Langue",
    notifications: "Notifications",
    theme: "Thème",
    displayLanguage: "Langue d'affichage",
    welcomeToFlowEase: "Bienvenue sur FlowEase",
    enterCycleInfo: "Veuillez saisir vos informations de cycle pour commencer.",
    saveChanges: "Enregistrer",
    cancel: "Annuler",
    editProfile: "Modifier le profil",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
  },
};

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem("FlowEase_language");
    return savedLang || "en";
  });

  useEffect(() => {
    localStorage.setItem("FlowEase_language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
} 