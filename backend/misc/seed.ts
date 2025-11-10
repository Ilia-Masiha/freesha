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
      { id: 1, code: "en", languageName: "English", languageNameFa: "انگلیسی" },
      { id: 2, code: "fa", languageName: "Persian", languageNameFa: "فارسی" },
      { id: 3, code: "tr", languageName: "Turkish", languageNameFa: "ترکی" },
      { id: 4, code: "ar", languageName: "Arabic", languageNameFa: "عربی" },
      { id: 5, code: "zh", languageName: "Chinese", languageNameFa: "چینی" },
      { id: 6, code: "he", languageName: "Hebrew", languageNameFa: "عبری" },
      {
        id: 7,
        code: "es",
        languageName: "Spanish",
        languageNameFa: "اسپانیایی",
      },
      { id: 8, code: "ru", languageName: "Russian", languageNameFa: "روسی" },
      { id: 9, code: "de", languageName: "German", languageNameFa: "آلمانی" },
      { id: 10, code: "fr", languageName: "French", languageNameFa: "فرانسوی" },
      {
        id: 11,
        code: "it",
        languageName: "Italian",
        languageNameFa: "ایتالیایی",
      },
      { id: 12, code: "pl", languageName: "Polish", languageNameFa: "لهستانی" },
      {
        id: 13,
        code: "pt",
        languageName: "Portuguese",
        languageNameFa: "پرتغالی",
      },
      { id: 14, code: "ja", languageName: "Japanese", languageNameFa: "ژاپنی" },
      { id: 15, code: "ko", languageName: "Korean", languageNameFa: "کره ای" },
      { id: 16, code: "ur", languageName: "Urdu", languageNameFa: "اردو" },
      { id: 17, code: "sv", languageName: "Swedish", languageNameFa: "سوئدی" },
      {
        id: 18,
        code: "no",
        languageName: "Norwegian",
        languageNameFa: "نروژی",
      },
      {
        id: 19,
        code: "fi",
        languageName: "Finnish",
        languageNameFa: "فنلاندی",
      },
      { id: 20, code: "cy", languageName: "Welsh", languageNameFa: "ولزی" },
      { id: 21, code: "hy", languageName: "Armenian", languageNameFa: "ارمنی" },
      { id: 22, code: "el", languageName: "Greek", languageNameFa: "یونانی" },
      {
        id: 23,
        code: "da",
        languageName: "Danish",
        languageNameFa: "دانمارکی",
      },
      { id: 24, code: "ku", languageName: "Kurdish", languageNameFa: "کوردی" },
      { id: 25, code: "hi", languageName: "Hindi", languageNameFa: "هندی" },
      {
        id: 26,
        code: "az",
        languageName: "Azerbaijani",
        languageNameFa: "آذری",
      },
      {
        id: 27,
        code: "eo",
        languageName: "Esperanto",
        languageNameFa: "اسپرانتو",
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
