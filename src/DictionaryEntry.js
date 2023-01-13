import Resource from './Resource';

/**
 * @class DictionaryEntry
 * @see {@link Resource}
 */
class DictionaryEntry extends Resource {
  /**
   * @see {@link Resource#pathName}
   */
  static pathName = 'dictionary_entries';

  /**
   * @see {@link Resource#resourceName}
   */
  static resourceName = 'dictionary_entry';
}

export default DictionaryEntry;
