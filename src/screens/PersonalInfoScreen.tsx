import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, User, Phone, Mail, MapPin, Calendar, Briefcase, Edit2, Save } from "lucide-react";
import MobileShell from "@/components/layout/MobileShell";
import ScreenHeader from "@/components/layout/ScreenHeader";
import logo from "@/assets/logo.jpg";

const PersonalInfoScreen = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Alisher Karimov",
    phone: "+998 90 123 45 67",
    email: "alisher.karimov@example.com",
    dateOfBirth: "15.03.1985",
    address: "Toshkent shahri, Yunusobod tumani, Amir Temur ko'chasi, 123-uy",
    passportSeries: "AA 1234567",
    inn: "123456789",
    driverLicense: "AB 0123456",
    licenseExpiry: "15.03.2028",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const renderField = (icon: any, label: string, value: string, fieldName: keyof typeof formData) => {
    const Icon = icon;
    return (
      <div className="p-4 bg-card rounded-2xl shadow-card">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            {isEditing ? (
              <input
                type="text"
                value={formData[fieldName]}
                onChange={(e) => setFormData({ ...formData, [fieldName]: e.target.value })}
                className="w-full font-medium text-foreground bg-transparent border-b border-border focus:border-primary outline-none pb-1"
              />
            ) : (
              <p className="font-medium text-foreground">{value}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <MobileShell>
      <div className="safe-area-top">
        <ScreenHeader
          title="Shaxsiy ma'lumotlar"
          showBack={true}
          onBack={() => navigate("/profile")}
          rightAction={
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-primary-foreground"
            >
              {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
            </button>
          }
        />

        {/* Profile Photo */}
        <div className="px-4 py-6">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={logo}
                alt="Profile"
                className="w-32 h-32 rounded-3xl object-cover shadow-card"
              />
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                  <Camera size={20} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="px-4 pb-4">
          <h2 className="section-title mb-3">Asosiy ma'lumotlar</h2>
          <div className="space-y-3">
            {renderField(User, "To'liq ismi", formData.fullName, "fullName")}
            {renderField(Phone, "Telefon raqami", formData.phone, "phone")}
            {renderField(Mail, "Email manzili", formData.email, "email")}
            {renderField(Calendar, "Tug'ilgan sanasi", formData.dateOfBirth, "dateOfBirth")}
            {renderField(MapPin, "Yashash manzili", formData.address, "address")}
          </div>
        </div>

        {/* Document Information */}
        <div className="px-4 pb-4">
          <h2 className="section-title mb-3">Hujjat ma'lumotlari</h2>
          <div className="space-y-3">
            {renderField(Briefcase, "Pasport seriyasi va raqami", formData.passportSeries, "passportSeries")}
            {renderField(Briefcase, "INN (JSHSHIR)", formData.inn, "inn")}
            {renderField(Briefcase, "Haydovchilik guvohnomasi", formData.driverLicense, "driverLicense")}
            {renderField(Calendar, "Guvohnoma amal qilish muddati", formData.licenseExpiry, "licenseExpiry")}
          </div>
        </div>

        {/* Verification Status */}
        <div className="px-4 pb-6">
          <div className="bg-success/10 border border-success/20 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-success" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-1">Profil tasdiqlangan</h3>
                <p className="text-sm text-muted-foreground">
                  Barcha ma'lumotlar tekshirilgan va tasdiqlangan
                </p>
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="px-4 pb-6">
            <button
              onClick={handleSave}
              className="btn-primary w-full py-4 rounded-2xl font-semibold"
            >
              O'zgarishlarni saqlash
            </button>
          </div>
        )}
      </div>
    </MobileShell>
  );
};

export default PersonalInfoScreen;
