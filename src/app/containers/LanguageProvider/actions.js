/*
 *
 * LanguageProvider actions
 *
 */

import { CHANGE_LOCALE } from 'app/containers/LanguageProvider/constants';

export function changeLocale(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}
