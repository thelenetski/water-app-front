import React from "react";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";

import css from "./UserSettingsModal";

const UserSettingsModal = () => {
  return (
    <div>
      <h3 className={css.title}>Settings</h3>
      <UserSettingsForm />
    </div>
  );
};

export default UserSettingsModal;
