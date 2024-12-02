import React from "react";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import css from "./UserSettingsModal.module.css";

const UserSettingsModal = () => {
  return (
    <div className={css.container}>
      <SimpleBar style={{ maxHeight: "540px" }}>
        <h3 className={css.title}>Settings</h3>
        <UserSettingsForm />
      </SimpleBar>
    </div>
  );
};

export default UserSettingsModal;
