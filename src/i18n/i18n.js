import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";

import en from "./translation/en.json";
// import uk from "./translation/uk.json";

i18n
  .use(Backend) // Завантаження перекладів через HTTP
//   .use(LanguageDetector) // Автоматичне визначення мови
  .use(initReactI18next) // Інтеграція з React
 .init({
    resources: {
      en: { translation: en },
    //   uk: { translation: uk },
    },
    fallbackLng: "en", // Мова за замовчуванням
    ns:[`translation`],
    defaultNS: `translation`,
  });
  
export default i18n;
