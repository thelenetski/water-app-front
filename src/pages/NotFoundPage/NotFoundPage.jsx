import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className={css.main}>
      <Link
        style={{
          border: "1px solid #ccc",
          padding: "5px 10px",
          borderRadius: "15px",
        }}
        to={"/"}
      >
        {t("page.NotFoundPage.linkBack")}
      </Link>
      <h2>{t("page.NotFoundPage.oopsTitle")}</h2>
    </div>
  );
};

export default NotFound;
