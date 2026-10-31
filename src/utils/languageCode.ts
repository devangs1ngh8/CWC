enum LanguageCode {
  ENGLISH = 'en',
  SPANISH = 'es',
}

export default LanguageCode;

const STORAGE_KEY = {
  IsVISITED: 'visitedLanguage',
  IsSELECTED: 'selectedLanguage',
} as const;

export { STORAGE_KEY };
