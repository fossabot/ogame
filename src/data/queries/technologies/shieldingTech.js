import { ShieldingTechType } from '../../types/technologies';
import { Technology } from '../../models';

const shieldingTech = {
  type: ShieldingTechType,
  async resolve({ user }) {
    const where = { UserId: 1, techId: Technology.SHIELDING_TECH_ID };
    let technology = await Technology.findOne({ where });
    if (!technology) {
      technology = Technology.build(where);
    }
    return Object.assign(technology, {
      name: 'Shielding Technology',
      description: 'Shielding technology makes the shields on ships and defensive facilities ' +
      'more efficient. ' +
      'Each level of shield technology increases the strength of the shields by 10% of ' +
      'the base value.',
      longDescription: 'With the invention of the magnetosphere generator, scientists learned ' +
      'that an artificial shield could be produced to protect the crew in space ships not only ' +
      'from the harsh solar radiation environment in deep space, ' +
      'but also provide protection from enemy fire during an attack. ' +
      'Once scientists finally perfected the technology, a magnetosphere generator was installed ' +
      'on all ships and defence systems. ' +
      '' + // TODO check newline
      'As the technology is advanced to each level, ' +
      'the magnetosphere generator is upgraded which provides an additional 10% strength to ' +
      'the shields base value.',
    });
  },
};

export default shieldingTech;
