export const validateEmail = (email: string) =>
  /^[A-Za-z][A-Za-z0-9.+]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);

export const validatePassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,15}$/.test(
    password,
  );

export const cleanEmail = (email: string) =>
  email.replace(/[^A-Za-z0-9.@+]/g, '').replace(/^[0-9]+/, '');

export const cleanPassword = (password: string) => password.replace(/\s/g, '');

export const validateOtp = (value: string) =>
  value.replace(/\D/g, '').slice(-1);
