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

export const cleanNumber = (value: string) => value.replace(/\D/g, '');

export const cleanName = (value: string) =>
  value
    .replace(/[^a-zA-Z\s]/g, '')
    .replace(/\s+/g, ' ')
    .trimStart()
    .slice(0, 50);

export const validateName = (value: string) =>
  /^[a-zA-Z\s]+$/.test(value.trim());

export const validateHeight = (
  heightUnit: string,
  heightCm: string,
  feet: string,
  inches: string,
) => {
  return heightUnit === 'CM'
    ? heightCm !== '' && Number(heightCm) > 0
    : feet !== '' &&
        Number(feet) > 0 &&
        inches !== '' &&
        Number(inches) >= 0 &&
        Number(inches) < 12;
};

export const validatePersonalInformation = (
  fullName: string,
  dob: Date | null,
  validateHeight: boolean,
  weight: string,
) => {
  return (
    fullName.trim() !== '' &&
    dob !== null &&
    validateHeight &&
    weight !== '' &&
    Number(weight) > 0
  );
};

export const validatePersonalInfoState = (
  fullName: string,
  dob: Date | null,
  heightUnit: string,
  heightCm: string,
  feet: string,
  inches: string,
  weight: string,
  hasAttemptedNext: boolean,
) => {
  const validHeight = validateHeight(heightUnit, heightCm, feet, inches);

  const isFormValid = validatePersonalInformation(
    fullName,
    dob,
    validHeight,
    weight,
  );

  const hasAnyInput =
    fullName !== '' ||
    dob !== null ||
    heightCm !== '' ||
    feet !== '' ||
    inches !== '' ||
    weight !== '';

  const areAllFieldsFilled =
    fullName.trim() !== '' &&
    dob !== null &&
    (heightUnit === 'CM' ? heightCm !== '' : feet !== '' && inches !== '') &&
    weight !== '';

  const isNextDisabled = hasAttemptedNext ? !areAllFieldsFilled : !hasAnyInput;

  return {
    validHeight,
    isFormValid,
    hasAnyInput,
    areAllFieldsFilled,
    isNextDisabled,
  };
};

export const getPersonalInfoErrors = (
  fullName: string,
  dob: Date | null,
  heightUnit: string,
  heightCm: string,
  feet: string,
  inches: string,
  weight: string,
  hasAttemptedNext: boolean,
) => {
  if (!hasAttemptedNext) {
    return {};
  }

  return {
    name: !fullName.trim() ? 'nameRequired' : '',

    dob: !dob ? 'dobRequired' : '',

    height:
      heightUnit === 'CM'
        ? !heightCm
          ? 'heightRequired'
          : Number(heightCm) <= 0
          ? 'invalidHeight'
          : ''
        : !feet || !inches
        ? 'feetInchesRequired'
        : Number(feet) <= 0 || Number(inches) < 0 || Number(inches) >= 12
        ? 'invalidHeight'
        : '',

    weight: !weight
      ? 'weightRequired'
      : Number(weight) <= 0
      ? 'invalidWeight'
      : '',
  };
};

export const validateCyclesState = (
  lactating: string,
  contraceptive: string,
  bleedTimeline: string,
  lastMenstruationDate: Date | null,
  cycleLength: string,
) =>
  !!(
    lactating &&
    contraceptive &&
    bleedTimeline &&
    lastMenstruationDate &&
    cycleLength
  );

export const validateTemperature = (value: string): string => {
  let numericValue = value.replace(/[^0-9.]/g, '');

  const parts = numericValue.split('.');
  numericValue = parts[0].slice(0, 3);

  if (parts.length > 1) {
    numericValue += `.${parts[1].slice(0, 2)}`;
  }

  return numericValue;
};

export const validateChangePassword = (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
) => {
  const isNewPasswordValid = validatePassword(newPassword);
  const isNewPasswordSameAsOld =
    oldPassword !== '' && newPassword === oldPassword;
  const passwordsMatch = newPassword === confirmPassword;

  return {
    isNewPasswordValid,
    isNewPasswordSameAsOld,
    passwordsMatch,
    oldPasswordError: !oldPassword ? 'oldRequired' : '',
    newPasswordError: !newPassword
      ? 'newRequired'
      : isNewPasswordSameAsOld
      ? 'sameAsOld'
      : !isNewPasswordValid
      ? 'invalidNew'
      : '',
    confirmPasswordError: !confirmPassword
      ? 'confirmRequired'
      : !passwordsMatch
      ? 'passwordMismatch'
      : '',
  };
};

export const cleanHormoneValue = (value: string): string => {
  let cleaned = value.replace(/[^0-9.]/g, '');

  const parts = cleaned.split('.');
  const integerPart = parts[0].slice(0, 3);

  if (parts.length > 1) {
    return `${integerPart}.${parts.slice(1).join('').slice(0, 2)}`;
  }

  return integerPart;
};

export const validateHormoneValue = (value: string): boolean => {
  return /^\d{1,3}(\.\d{1,2})?$/.test(value);
};

export const validateConsecutiveSpaces = (value: string): boolean => {
  return !/ {2}/.test(value);
};
