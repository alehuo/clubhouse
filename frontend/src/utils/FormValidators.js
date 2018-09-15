import validator from "validator";

export const checked = message => val => (val === true ? undefined : message);

export const isEmpty = name => val =>
  val ? undefined : name + " cannot be empty";

export const validEmail = val =>
  validator.isEmail(val) ? undefined : "E-mail address is invalid";

export const passwd = length => val =>
  val && val.length >= length
    ? undefined
    : "Password cannot be empty or shorter than " + length + " characters";

export const validatePasswords = (value, values) => {
  if (!values.passwordAgain) {
    return "Please type your password again";
  }
  if (values.passwordAgain !== values.password) {
    return "Passwords do not match";
  }
  return undefined;
};
