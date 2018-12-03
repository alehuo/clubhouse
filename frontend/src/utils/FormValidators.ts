import validator from "validator";

export const checked = (message: string) => (val: any) => (val === true ? undefined : message);

export const isEmpty = (name: string) => (val: any) =>
  val ? undefined : name + " cannot be empty";

export const validEmail = (val: string) =>
  validator.isEmail(val) ? undefined : "E-mail address is invalid";

export const passwd = (length: number) => (val: string) =>
  val && val.length >= length
    ? undefined
    : "Password cannot be empty or shorter than " + length + " characters";

export const validatePasswords = (value: any, values: any) => {
  if (!values.passwordAgain) {
    return "Please type your password again";
  }
  if (values.passwordAgain !== values.password) {
    return "Passwords do not match";
  }
  return undefined;
};
