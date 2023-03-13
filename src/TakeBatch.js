import Resource from './Resource';
import TakesIndex from './TakesIndex';

/**
 * @class TakeBatch
 * @see {@link Resource}
 */
class TakeBatch extends Resource {
  /**
   * @see {@link Resource#pathName}
   */
  static pathName = 'take_batches';

  /**
   * @see {@link Resource#resourceName}
   */
  static resourceName = 'take_batch';

  /**
   * Retrieve the takes of that batch.
   *
   * @return {TakesIndex}
   */
  takes() {
    return new TakesIndex(this.project).where({ take_batch_id_eq: this.attributes.id });
  }
}

export default TakeBatch;
