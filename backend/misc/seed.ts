import "../src/helpers/load_env.js";

import { connectDb, db } from "../src/database/db.js";
import {
  gendersTable,
  jobPostStatusesTable,
  languagesTable,
  rolesTable,
} from "../src/database/schema.js";
import { customLog } from "../src/helpers/utils.js";

connectDb();

try {
  await db
    .insert(rolesTable)
    .values([
      { id: 1, roleName: "user" },
      { id: 2, roleName: "admin" },
    ])
    .onConflictDoNothing();

  customLog("database", "Roles seeded successfully");
} catch (error) {
  customLog("database", `Seeding roles failed: ${error}`);
  customLog("database", "Seeding process will be terminated");
  process.exit(1);
}

try {
  await db
    .insert(jobPostStatusesTable)
    .values([
      { id: 1, statusName: "pending" },
      { id: 2, statusName: "accepted" },
      { id: 3, statusName: "cancelled" },
      { id: 4, statusName: "done" },
    ])
    .onConflictDoNothing();

  customLog("database", "Statuses seeded successfully");
} catch (error) {
  customLog("database", `Seeding statuses failed: ${error}`);
  customLog("database", "Seeding process will be terminated");
  process.exit(1);
}

try {
  await db
    .insert(gendersTable)
    .values([
      { id: 1, genderName: "N" },
      { id: 2, genderName: "M" },
      { id: 3, genderName: "F" },
    ])
    .onConflictDoNothing();

  customLog("database", "Genders seeded successfully");
} catch (error) {
  customLog("database", `Seeding genders failed: ${error}`);
  customLog("database", "Seeding process will be terminated");
  process.exit(1);
}

try {
  await db
    .insert(languagesTable)
    .values([
      { code: "en", languageName: "English", languageNameFa: "انگلیسی" },
      { code: "fa", languageName: "Persian", languageNameFa: "فارسی" },
      { code: "tr", languageName: "Turkish", languageNameFa: "ترکی" },
      { code: "ar", languageName: "Arabic", languageNameFa: "عربی" },
      { code: "zh", languageName: "Chinese", languageNameFa: "چینی" },
      { code: "he", languageName: "Hebrew", languageNameFa: "عبری" },
      { code: "es", languageName: "Spanish", languageNameFa: "اسپانیایی" },
      { code: "ru", languageName: "Russian", languageNameFa: "روسی" },
      { code: "de", languageName: "German", languageNameFa: "آلمانی" },
      { code: "fr", languageName: "French", languageNameFa: "فرانسوی" },
      { code: "it", languageName: "Italian", languageNameFa: "ایتالیایی" },
      { code: "pl", languageName: "Polish", languageNameFa: "لهستانی" },
      { code: "pt", languageName: "Portuguese", languageNameFa: "پرتغالی" },
      { code: "ja", languageName: "Japanese", languageNameFa: "ژاپنی" },
      { code: "ko", languageName: "Korean", languageNameFa: "کره ای" },
      { code: "ur", languageName: "Urdu", languageNameFa: "اردو" },
      { code: "sv", languageName: "Swedish", languageNameFa: "سوئدی" },
      { code: "no", languageName: "Norwegian", languageNameFa: "نروژی" },
      { code: "fi", languageName: "Finnish", languageNameFa: "فنلاندی" },
      { code: "cy", languageName: "Welsh", languageNameFa: "ولزی" },
      { code: "hy", languageName: "Armenian", languageNameFa: "ارمنی" },
      { code: "el", languageName: "Greek", languageNameFa: "یونانی" },
      { code: "da", languageName: "Danish", languageNameFa: "دانمارکی" },
      { code: "ku", languageName: "Kurdish", languageNameFa: "کوردی" },
      { code: "hi", languageName: "Hindi", languageNameFa: "هندی" },
      { code: "az", languageName: "Azerbaijani", languageNameFa: "آذری" },
      { code: "eo", languageName: "Esperanto", languageNameFa: "اسپرانتو" },
      { code: "nl", languageName: "Dutch", languageNameFa: "هلندی" },
      { code: "uk", languageName: "Ukrainian", languageNameFa: "اوکراینی" },
      { code: "ro", languageName: "Romanian", languageNameFa: "رومانیایی" },
      { code: "cs", languageName: "Czech", languageNameFa: "چکی" },
      { code: "hu", languageName: "Hungarian", languageNameFa: "مجارستانی" },
      { code: "vi", languageName: "Vietnamese", languageNameFa: "ویتنامی" },
      { code: "th", languageName: "Thai", languageNameFa: "تایلندی" },
      { code: "id", languageName: "Indonesian", languageNameFa: "اندونزیایی" },
      { code: "ms", languageName: "Malay", languageNameFa: "مالزیایی" },
      { code: "tl", languageName: "Tagalog", languageNameFa: "فیلیپینی" },
      { code: "bn", languageName: "Bengali", languageNameFa: "بنگالی" },
      { code: "pa", languageName: "Punjabi", languageNameFa: "پنجابی" },
      { code: "mr", languageName: "Marathi", languageNameFa: "مراتی" },
      { code: "gu", languageName: "Gujarati", languageNameFa: "گجراتی" },
      { code: "ta", languageName: "Tamil", languageNameFa: "تامیلی" },
      { code: "te", languageName: "Telugu", languageNameFa: "تلوگو" },
      { code: "kn", languageName: "Kannada", languageNameFa: "کانادا" },
      { code: "ml", languageName: "Malayalam", languageNameFa: "مالایالام" },
      { code: "my", languageName: "Burmese", languageNameFa: "برمهای" },
      { code: "si", languageName: "Sinhala", languageNameFa: "سینهالی" },
      { code: "ne", languageName: "Nepali", languageNameFa: "نپالی" },
      { code: "sa", languageName: "Sanskrit", languageNameFa: "سانسکریت" },
      { code: "am", languageName: "Amharic", languageNameFa: "امهری" },
      { code: "sw", languageName: "Swahili", languageNameFa: "سواحیلی" },
      { code: "yo", languageName: "Yoruba", languageNameFa: "یوروبایی" },
      { code: "ig", languageName: "Igbo", languageNameFa: "ایگبویی" },
      { code: "ha", languageName: "Hausa", languageNameFa: "هوسایی" },
      { code: "so", languageName: "Somali", languageNameFa: "سومالیایی" },
      { code: "zu", languageName: "Zulu", languageNameFa: "زولو" },
      { code: "xh", languageName: "Xhosa", languageNameFa: "خوسایی" },
      { code: "af", languageName: "Afrikaans", languageNameFa: "آفریکانس" },
      { code: "sq", languageName: "Albanian", languageNameFa: "آلبانیایی" },
      { code: "eu", languageName: "Basque", languageNameFa: "باسکی" },
      { code: "be", languageName: "Belarusian", languageNameFa: "بلاروسی" },
      { code: "bs", languageName: "Bosnian", languageNameFa: "بوسنیایی" },
      { code: "bg", languageName: "Bulgarian", languageNameFa: "بلغاری" },
      { code: "ca", languageName: "Catalan", languageNameFa: "کاتالان" },
      { code: "hr", languageName: "Croatian", languageNameFa: "کرواتی" },
      { code: "et", languageName: "Estonian", languageNameFa: "استونیایی" },
      { code: "ka", languageName: "Georgian", languageNameFa: "گرجی" },
      { code: "is", languageName: "Icelandic", languageNameFa: "ایسلندی" },
      { code: "ga", languageName: "Irish", languageNameFa: "ایرلندی" },
      { code: "kk", languageName: "Kazakh", languageNameFa: "قزاقی" },
      { code: "ky", languageName: "Kyrgyz", languageNameFa: "قرقیزی" },
      { code: "lv", languageName: "Latvian", languageNameFa: "لتونیایی" },
      { code: "lt", languageName: "Lithuanian", languageNameFa: "لیتوانیایی" },
      { code: "mk", languageName: "Macedonian", languageNameFa: "مقدونی" },
      { code: "mt", languageName: "Maltese", languageNameFa: "مالتی" },
      { code: "mn", languageName: "Mongolian", languageNameFa: "مغولی" },
      { code: "ps", languageName: "Pashto", languageNameFa: "پشتو" },
      { code: "sr", languageName: "Serbian", languageNameFa: "صربی" },
      { code: "sk", languageName: "Slovak", languageNameFa: "اسلواکی" },
      { code: "sl", languageName: "Slovenian", languageNameFa: "اسلوونیایی" },
      { code: "tg", languageName: "Tajik", languageNameFa: "تاجیکی" },
      { code: "tk", languageName: "Turkmen", languageNameFa: "ترکمنی" },
      { code: "ug", languageName: "Uyghur", languageNameFa: "اویغوری" },
      { code: "uz", languageName: "Uzbek", languageNameFa: "ازبکی" },
      { code: "lo", languageName: "Lao", languageNameFa: "لائوسی" },
      { code: "km", languageName: "Khmer", languageNameFa: "خمری" },
      { code: "bo", languageName: "Tibetan", languageNameFa: "تبتی" },
      { code: "zh", languageName: "Cantonese", languageNameFa: "کانتونی" },
      { code: "qu", languageName: "Quechua", languageNameFa: "کچوایی" },
      { code: "gn", languageName: "Guarani", languageNameFa: "گوارانی" },
      { code: "mi", languageName: "Maori", languageNameFa: "مائوری" },
      { code: "sm", languageName: "Samoan", languageNameFa: "ساموآیی" },
      { code: "to", languageName: "Tongan", languageNameFa: "تونگایی" },
      { code: "fj", languageName: "Fijian", languageNameFa: "فیجیایی" },
      { code: "haw", languageName: "Hawaiian", languageNameFa: "هاوایی" },
      { code: "la", languageName: "Latin", languageNameFa: "لاتین" },
      {
        code: "grc",
        languageName: "Ancient Greek",
        languageNameFa: "یونانی باستان",
      },
    ])
    .onConflictDoNothing();

  customLog("database", "Languages seeded successfully");
  process.exit(0);
} catch (error) {
  customLog("database", `Seeding languages failed: ${error}`);
  customLog("database", "Seeding process will be terminated");
  process.exit(1);
}
