import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import images from "../../types/images";
import { FaFacebook, FaWhatsapp, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

// ---------------- Translations ----------------
const translations = {
  English: {
    slogan: "Your trusted market place",
    description1: "MboaKako is an international innovative community aimed at providing",
    description2: "excellent service, fast delivery, and secure shopping every time you visit.",
    customerServices: "Customer Services",
    helpCenter: "Help Center",
    transaction: "Transaction Services",
    notification: "Notification",
    consumers: "Mboa Consumers",
    orders: "Orders",
    orderInfo: "Find out when purchase will arrive,",
    orderSchedule: "or schedule a delivery",
    track: "Track Order",
    schedule: "Schedule Delivery",
    stayConnected: "Stay Connected",
    categories: "Popular Categories",
    clothing: "Clothings",
    accessories: "Accessories",
    electronics: "Electronics",
    shoes: "Shoes",
    office: "Office accessories",
    kitchen: "Kitchen Utensils",
    getToUs: "Get to us",
    contact: "Contact Us",
    careers: "Joining Us. Careers",
    partner: "Partner With",
    copyright: "© 2024 - 2025 MboaKako.com Your trusted market place",
  },
  French: {
    slogan: "Votre marché de confiance",
    description1: "MboaKako est une communauté internationale innovante visant à offrir",
    description2: "un service excellent, une livraison rapide et un shopping sécurisé à chaque visite.",
    customerServices: "Service Client",
    helpCenter: "Centre d'aide",
    transaction: "Services de Transaction",
    notification: "Notification",
    consumers: "Consommateurs Mboa",
    orders: "Commandes",
    orderInfo: "Découvrez quand votre achat arrivera,",
    orderSchedule: "ou planifiez une livraison",
    track: "Suivre la commande",
    schedule: "Planifier la livraison",
    stayConnected: "Restez Connecté",
    categories: "Catégories Populaires",
    clothing: "Vêtements",
    accessories: "Accessoires",
    electronics: "Électronique",
    shoes: "Chaussures",
    office: "Accessoires de bureau",
    kitchen: "Ustensiles de cuisine",
    getToUs: "Nous contacter",
    contact: "Contactez-nous",
    careers: "Rejoignez-nous. Carrières",
    partner: "Partenaire avec",
    copyright: "© 2024 - 2025 MboaKako.com Votre marché de confiance",
  },
  Spanish: {
    slogan: "Tu mercado de confianza",
    description1: "MboaKako es una comunidad internacional innovadora destinada a brindar",
    description2: "un servicio excelente, entrega rápida y compras seguras cada vez que visitas.",
    customerServices: "Atención al Cliente",
    helpCenter: "Centro de Ayuda",
    transaction: "Servicios de Transacción",
    notification: "Notificación",
    consumers: "Consumidores de Mboa",
    orders: "Pedidos",
    orderInfo: "Descubre cuándo llegará tu compra,",
    orderSchedule: "o programa una entrega",
    track: "Rastrear Pedido",
    schedule: "Programar Entrega",
    stayConnected: "Mantente Conectado",
    categories: "Categorías Populares",
    clothing: "Ropa",
    accessories: "Accesorios",
    electronics: "Electrónica",
    shoes: "Zapatos",
    office: "Accesorios de oficina",
    kitchen: "Utensilios de cocina",
    getToUs: "Contáctanos",
    contact: "Contáctenos",
    careers: "Únete a nosotros. Carreras",
    partner: "Asociarse con",
    copyright: "© 2024 - 2025 MboaKako.com Tu mercado de confianza",
  },
  German: {
    slogan: "Ihr vertrauenswürdiger Marktplatz",
    description1: "MboaKako ist eine internationale innovative Community, die darauf abzielt,",
    description2: "exzellenten Service, schnelle Lieferung und sicheres Einkaufen bei jedem Besuch zu bieten.",
    customerServices: "Kundendienst",
    helpCenter: "Hilfezentrum",
    transaction: "Transaktionsdienste",
    notification: "Benachrichtigung",
    consumers: "Mboa Verbraucher",
    orders: "Bestellungen",
    orderInfo: "Erfahren Sie, wann Ihr Kauf ankommt,",
    orderSchedule: "oder planen Sie eine Lieferung",
    track: "Bestellung verfolgen",
    schedule: "Lieferung planen",
    stayConnected: "Bleiben Sie Verbunden",
    categories: "Beliebte Kategorien",
    clothing: "Kleidung",
    accessories: "Zubehör",
    electronics: "Elektronik",
    shoes: "Schuhe",
    office: "Bürozubehör",
    kitchen: "Küchenutensilien",
    getToUs: "Kontaktieren Sie uns",
    contact: "Kontaktieren Sie uns",
    careers: "Treten Sie uns bei. Karriere",
    partner: "Partner mit",
    copyright: "© 2024 - 2025 MboaKako.com Ihr vertrauenswürdiger Marktplatz",
  },
} as const;
type Language = keyof typeof translations;

function Footer() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("English");
  const languages = Object.keys(translations) as Language[];
  const t = translations[language];

  return (
    <footer className="bg-black/90 text-white p-6 sm:p-10">
      {/* Logo & Slogan */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0 mb-6">
        <div>
          <h1 className="font-bold text-2xl">
            <span className="text-primary">Mboa</span>
            <span className="text-secondary">Kako</span>: {t.slogan}
          </h1>
          <p className="text-sm sm:text-base">{t.description1}</p>
          <p className="text-sm sm:text-base">{t.description2}</p>
        </div>

        {/* Language Selector */}
        <div className="mt-4 sm:mt-0 flex items-center gap-2">
          <img src={images.logo} alt="Logo" className="w-16 h-auto" />
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg text-white"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">{language}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {open && (
              <div className="absolute mt-2 w-40 bg-black rounded-lg shadow-lg border border-gray-700 z-10">
                {languages.map((lang) => (
                  <div
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm"
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 border-t border-gray-600 pt-6">
        {/* Customer Services */}
        <div>
          <h2 className="font-bold text-lg">{t.customerServices}</h2>
          <p className="text-sm">{t.helpCenter}</p>
          <p className="text-sm">{t.transaction}</p>
          <p className="text-sm">{t.notification}</p>
          <p className="text-sm">{t.consumers}</p>
        </div>

        {/* Orders */}
        <div>
          <h2 className="font-bold text-lg">{t.orders}</h2>
          <p className="text-sm">{t.orderInfo}</p>
          <p className="text-sm">{t.orderSchedule}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <a href="#" className="text-secondary text-sm hover:text-primary">{t.track}</a>
            <a href="#" className="text-secondary text-sm hover:text-primary">{t.schedule}</a>
          </div>
        </div>

        {/* Stay Connected */}
        <div>
          <h2 className="font-bold text-lg">{t.stayConnected}</h2>
          <div className="flex gap-4 mt-2">
            <NavLink to="/Instagram" className="hover:text-secondary"><AiFillInstagram size={25} /></NavLink>
            <NavLink to="/Facebook" className="hover:text-secondary"><FaFacebook size={25} /></NavLink>
            <NavLink to="/WhatsApp" className="hover:text-secondary"><FaWhatsapp size={25} /></NavLink>
            <NavLink to="/Twitter" className="hover:text-secondary"><FaTwitter size={25} /></NavLink>
          </div>
        </div>
        <Link to ="/portfolio">
        <h2 className="font-bold text-lg">Portfolio</h2>
        </Link>
        
      </div>

      {/* Categories & Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <div>
          <h2 className="font-bold text-lg">{t.categories}</h2>
          <p className="text-sm">{t.clothing}</p>
          <p className="text-sm">{t.accessories}</p>
          <p className="text-sm">{t.electronics}</p>
          <p className="text-sm">{t.shoes}</p>
          <p className="text-sm">{t.office}</p>
          <p className="text-sm">{t.kitchen}</p>
        </div>

        <div>
          <h2 className="font-bold text-lg">{t.getToUs}</h2>
          <p className="text-sm">{t.contact}</p>
          <p className="text-sm">{t.careers}</p>
        </div>
      </div>

      {/* Partner Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 border-t border-gray-600 pt-4 gap-4">
        <h2 className="font-bold text-lg">{t.partner}</h2>
        <img src={images.logo} alt="Logo" className="w-24 h-auto" />
      </div>

      {/* Copyright */}
      <div className="text-center mt-4">
        <p className="text-xs text-secondary">{t.copyright}</p>
      </div>
    </footer>
  );
}

export default Footer;
