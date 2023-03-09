import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../Store/Auth-Context";

import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const newPasswordInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCHRJDLjRV-TUbvJurRq8MLKiqBwWn4sfc",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => {
      history.replace("/");
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
