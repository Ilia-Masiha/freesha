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
    ])
    .onConflictDoNothing();

  customLog("database", "Languages seeded successfully");
  process.exit(0);
} catch (error) {
  customLog("database", `Seeding languages failed: ${error}`);
  customLog("database", "Seeding process will be terminated");
  process.exit(1);
}
