import React from "react";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";

import css from "./UserSettingsModal.module.css";

const UserSettingsModal = () => {
  return (
    <div className={css.container}>
      <h3 className={css.title}>Settings</h3>
      <UserSettingsForm />
    </div>
  );
};

export default UserSettingsModal;
