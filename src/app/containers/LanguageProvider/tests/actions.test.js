import { changeLocale } from 'app/containers/LanguageProvider/actions';

import { CHANGE_LOCALE } from 'app/containers/LanguageProvider/constants';

describe('LanguageProvider actions', () => {
  describe('Change Local Action', () => {
    it('has a type of CHANGE_LOCALE', () => {
      const expected = {
        type: CHANGE_LOCALE,
        locale: 'de',
      };
      expect(changeLocale('de')).toEqual(expected);
    });
  });
});
