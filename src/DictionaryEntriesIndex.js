import DictionaryEntry from './DictionaryEntry';
import ResourcesIndex from './ResourcesIndex';

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
