import { useTranslation } from "react-i18next";
import css from "./ToggleLang.module.css";
import { useEffect, useState } from "react";

const LanguageSwitcher = () => {
  const [active, setActive] = useState("en");
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setActive(lng);
  };

  useEffect(() => {
    setActive(i18n.language.slice(0, 2));
  }, [i18n.language]);

  return (
    <div className={css.toggleLangWrap}>
      <button
        className={active === "en" ? css.active : undefined}
        onClick={() => changeLanguage("en")}
      >
        EN
      </button>
      <button
        className={active === "uk" ? css.active : undefined}
        onClick={() => changeLanguage("uk")}
      >
        UA
      </button>
    </div>
  );
};

export default LanguageSwitcher;
