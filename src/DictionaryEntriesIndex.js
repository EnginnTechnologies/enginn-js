import DictionaryEntry from './DictionaryEntry.js';
import ResourcesIndex from './ResourcesIndex.js';

/**
 * @class DictionaryEntriesIndex
 * @see {@link ResourcesIndex}
 */
class DictionaryEntriesIndex extends ResourcesIndex {
  /**
   * @see {@link ResourcesIndex#resource}
   */
  static resource = DictionaryEntry;
}

export default DictionaryEntriesIndex;
