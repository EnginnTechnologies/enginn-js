import SynthesisExport from './SynthesisExport';
import ResourcesIndex from './ResourcesIndex';

/**
 * @class SynthesisExportsIndex
 * @see {@link ResourcesIndex}
 */
class SynthesisExportsIndex extends ResourcesIndex {
  /**
   * @see {@link ResourcesIndex#resource}
   */
  static resource = SynthesisExport;
}

export default SynthesisExportsIndex;
