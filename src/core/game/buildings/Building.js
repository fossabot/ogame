/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * Xnova OGame is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Xnova OGame is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Xnova OGame.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @flow
 */

import Technology from '../technologies/Technology';


function Building(level) {
  this.level = level;
}
Building.prototype = {
  ...Technology.prototype,

  name: 'Unnamed Building',

  dismantlable: true,

  getDescription(): string {
    let description = this.description;
    if (!this.dismantlable) {
      description = `${description}

      Once built, the ${this.name} cannot be dismantled.`
    }

    return description;
  },

  /**
   * http://ogame.wikia.com/wiki/Buildings#Buildings_construction_time
   * Returns the construction time of this building on the given planet in seconds.
   */
  getDuration(planet) {
    const cost = this.getCost();
    const baseDuration = (cost.metal + cost.crystal) * 3600 / 2500;

    const roboticsFactor = 1 + planet.buildings.roboticsFactory.level;
    const naniteFactor = 2 ** planet.buildings.naniteFactory.level;
    return baseDuration / (roboticsFactor * naniteFactor);
  }

}

export default Building;
