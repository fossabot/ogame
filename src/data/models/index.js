/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';
import Coordinates from './Coordinates';
import Defense from './Defense';
import DefenseTech from './DefenseTech';
import Planet from './Planet';
import Resources from './Resources';
import Ship from './Ship';
import ShipTech from './ShipTech';
import Technology from './Technology';
import TechnologyTech from './TechnologyTech';
import UnitTech from './UnitTech';
import User from './User';
import UserLogin from './UserLogin';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';

DefenseTech.belongsToMany(Planet, { through: Defense, foreignKey: 'techId' });
Planet.belongsToMany(DefenseTech, { as: 'defenses', through: Defense });

// TODO chapuza
Defense.belongsTo(DefenseTech, {
  foreignKey: 'techId',
  as: 'Tech',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

DefenseTech.hasOne(UnitTech, {
  foreignKey: 'techId',
  as: 'unit',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

// TODO chapuza
Ship.belongsTo(ShipTech, {
  foreignKey: 'techId',
  as: 'Tech',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

ShipTech.belongsToMany(Planet, { through: Ship, foreignKey: 'techId' });
Planet.belongsToMany(ShipTech, { as: 'ships', through: Ship });

ShipTech.hasOne(UnitTech, {
  foreignKey: 'techId',
  as: 'unit',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

TechnologyTech.belongsToMany(User, { through: Technology, foreignKey: 'techId' });
User.belongsToMany(TechnologyTech, { as: 'technologies', through: Technology });

// TODO chapuza
Technology.belongsTo(TechnologyTech, {
  foreignKey: 'techId',
  as: 'Tech',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

TechnologyTech.belongsTo(Resources, {
  foreignKey: 'basicCostsId',
  as: 'basicCosts',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

UnitTech.belongsTo(Resources, {
  foreignKey: 'costsId',
  as: 'costs',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

User.hasMany(Coordinates);

User.hasMany(UserLogin, {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(UserClaim, {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

function sync(...args) {
  return sequelize.sync(...args).then(async () => {
    /**********************
     **** Technologies ****
     **********************/
    TechnologyTech.create({
      techId: Technology.ENERGY_TECH_ID,
      basicCosts: {
        metal: 800,
        crystal: 400,
      },
    }, { include: [{ model: Resources, as: 'basicCosts' }] });
    TechnologyTech.create({
      techId: Technology.LASER_TECH_ID,
      basicCosts: {
        metal: 200,
        crystal: 100,
      },
    }, { include: [{ model: Resources, as: 'basicCosts' }] });
    TechnologyTech.create({
      techId: Technology.ION_TECH_ID,
      basicCosts: {
        metal: 1000,
        crystal: 300,
        deuterium: 100,
      },
    }, { include: [{ model: Resources, as: 'basicCosts' }] });
    TechnologyTech.create({
      techId: Technology.HYPERSPACE_TECH_ID,
      basicCosts: {
        metal: 4000,
        crystal: 2000,
      },
    }, { include: [{ model: Resources, as: 'basicCosts' }] });
    TechnologyTech.create({
      techId: Technology.PLASMA_TECH_ID,
      basicCosts: {
        metal: 2000,
        crystal: 4000,
        deuterium: 1000,
      },
    }, { include: [{ model: Resources, as: 'basicCosts' }] });
    TechnologyTech.create({
      techId: Technology.COMBUSTION_DRIVE_ID,
      basicCosts: {
        metal: 400,
        crystal: 600,
      },
    }, { include: [{ model: Resources, as: 'basicCosts' }] });
    TechnologyTech.create({
      techId: Technology.IMPULSE_DRIVE_ID,
      basicCosts: {
        metal: 2000,
        crystal: 4000,
        deuterium: 600,
      },
    }, { include: [{ model: Resources, as: 'basicCosts' }] });
    TechnologyTech.create({
      techId: Technology.HYPERSPACE_DRIVE_ID,
      basicCosts: {
        metal: 10000,
        crystal: 20000,
        deuterium: 6000,
      },
    }, { include: [{ model: Resources, as: 'basicCosts' }] });
    TechnologyTech.create({
      techId: Technology.ESPIONAGE_TECH_ID,
      basicCosts: {
        metal: 200,
        crystal: 1000,
        deuterium: 200,
      },
    }, { include: [{ model: Resources, as: 'basicCosts' }] });
    TechnologyTech.create({
      techId: Technology.COMPUTER_TECH_ID,
      basicCosts: {
        crystal: 400,
        deuterium: 600,
      },
    }, { include: [{ model: Resources, as: 'basicCosts' }] });
    TechnologyTech.create({
      techId: Technology.ASTROPHYSICS_ID,
      basicCosts: {
        metal: 4000,
        crystal: 8000,
        deuterium: 4000,
      },
      costFactor: 1.75,
    }, { include: [{ model: Resources, as: 'basicCosts' }] });
    TechnologyTech.create({
      techId: Technology.INTERGALACTIC_RESEARCH_NETWORK_ID,
      basicCosts: {
        metal: 240000,
        crystal: 400000,
        deuterium: 160000,
      },
    }, { include: [{ model: Resources, as: 'basicCosts' }] });
    TechnologyTech.create({
      techId: Technology.GRAVITON_TECH_ID,
      basicCosts: {
        energy: 300000,
      },
      costFactor: 3,
    }, { include: [{ model: Resources, as: 'basicCosts' }] });
    TechnologyTech.create({
      techId: Technology.WEAPONS_TECH_ID,
      basicCosts: {
        metal: 800,
        crystal: 200,
      },
    }, { include: [{ model: Resources, as: 'basicCosts' }] });
    TechnologyTech.create({
      techId: Technology.SHIELDING_TECH_ID,
      basicCosts: {
        metal: 200,
        crystal: 600,
      },
    }, { include: [{ model: Resources, as: 'basicCosts' }] });
    TechnologyTech.create({
      techId: Technology.ARMOUR_TECH_ID,
      basicCosts: {
        metal: 1000,
      },
    }, { include: [{ model: Resources, as: 'basicCosts' }] });

    /***************
     **** Ships ****
     ***************/
    const include = [
      { model: UnitTech, as: 'unit', include: [{ model: Resources, as: 'costs' }] },
    ];
    const SMALL_CARGO = await ShipTech.create({
      techId: Ship.SMALL_CARGO_ID,
      unit: {
        costs: {
          metal: 2000,
          crystal: 2000,
        },
        basicShield: 10,
        basicAttack: 5,
      },
      basicSpeed: 5000,
      cargoCapacity: 5000,
      fuelUsage: 10,
    }, { include });
    const LARGE_CARGO = await ShipTech.create({
      techId: Ship.LARGE_CARGO_ID,
      unit: {
        costs: {
          metal: 6000,
          crystal: 6000,
        },
        basicShield: 25,
        basicAttack: 5,
      },
      basicSpeed: 7500,
      cargoCapacity: 25000,
      fuelUsage: 50,
    }, { include });
    ShipTech.create({
      techId: Ship.LIGHT_FIGHTER_ID,
      unit: {
        costs: {
          metal: 3000,
          crystal: 1000,
        },
        basicShield: 10,
        basicAttack: 50,
      },
      basicSpeed: 12500,
      cargoCapacity: 50,
      fuelUsage: 20,
    }, { include });
    ShipTech.create({
      techId: Ship.HEAVY_FIGHTER_ID,
      unit: {
        costs: {
          metal: 6000,
          crystal: 4000,
        },
        basicShield: 25,
        basicAttack: 150,
      },
      basicSpeed: 10000,
      cargoCapacity: 100,
      fuelUsage: 75,
    }, { include });
    ShipTech.create({
      techId: Ship.CRUISER_ID,
      unit: {
        costs: {
          metal: 20000,
          crystal: 7000,
          deuterium: 2000,
        },
        basicShield: 50,
        basicAttack: 400,
      },
      basicSpeed: 15000,
      cargoCapacity: 800,
      fuelUsage: 300,
    }, { include });
    ShipTech.create({
      techId: Ship.BATTLESHIP_ID,
      unit: {
        costs: {
          metal: 45000,
          crystal: 15000,
        },
        basicShield: 200,
        basicAttack: 1000,
      },
      basicSpeed: 10000,
      cargoCapacity: 1500,
      fuelUsage: 500,
    }, { include });
    ShipTech.create({
      techId: Ship.COLONY_SHIP_ID,
      unit: {
        costs: {
          metal: 10000,
          crystal: 20000,
          deuterium: 10000,
        },
        basicShield: 100,
        basicAttack: 50,
      },
      basicSpeed: 2500,
      cargoCapacity: 7500,
      fuelUsage: 1000,
    }, { include });
    ShipTech.create({
      techId: Ship.RECYCLER_ID,
      unit: {
        costs: {
          metal: 10000,
          crystal: 6000,
          deuterium: 2000,
        },
        basicShield: 10,
        basicAttack: 1,
      },
      basicSpeed: 2000,
      cargoCapacity: 20000,
      fuelUsage: 300,
    }, { include });
    ShipTech.create({
      techId: Ship.ESPIONAGE_PROBE_ID,
      unit: {
        costs: {
          crystal: 1000,
        },
        basicShield: 0.01,
        basicAttack: 0.01,
      },
      basicSpeed: 100 * 10**6,
      cargoCapacity: 0,
      fuelUsage: 1,
    }, { include });
    ShipTech.create({
      techId: Ship.BOMBER_ID,
      unit: {
        costs: {
          metal: 50000,
          crystal: 25000,
          deuterium: 15000,
        },
        basicShield: 500,
        basicAttack: 1000,
      },
      basicSpeed: 4000,
      cargoCapacity: 500,
      fuelUsage: 1000,
    }, { include });
    ShipTech.create({
      techId: Ship.SOLAR_SATELLITE_ID,
      unit: {
        costs: {
          crystal: 2000,
          deuterium: 500,
        },
        basicShield: 1,
        basicAttack: 1,
      },
      basicSpeed: 0,
      cargoCapacity: 0,
      fuelUsage: 0,
    }, { include });
    ShipTech.create({
      techId: Ship.DESTROYER_ID,
      unit: {
        costs: {
          metal: 60000,
          crystal: 50000,
          deuterium: 15000,
        },
        basicShield: 500,
        basicAttack: 2000,
      },
      basicSpeed: 5000,
      cargoCapacity: 2000,
      fuelUsage: 1000,
    }, { include });
    const DEATH_STAR = await ShipTech.create({
      techId: Ship.DEATH_STAR_ID,
      unit: {
        costs: {
          metal: 5000000,
          crystal: 4000000,
          deuterium: 1000000,
        },
        basicShield: 50000,
        basicAttack: 200000,
      },
      basicSpeed: 100,
      cargoCapacity: 1000000,
      fuelUsage: 1,
    }, { include });
    ShipTech.create({
      techId: Ship.BATTLE_CRUISER_ID,
      unit: {
        costs: {
          metal: 30000,
          crystal: 40000,
          deuterium: 15000,
        },
        basicShield: 400,
        basicAttack: 700,
      },
      basicSpeed: 10000,
      cargoCapacity: 750,
      fuelUsage: 250,
    }, { include });

    /****************
     *** Defenses ***
     ****************/
    const ROCKET_LAUNCHER = await DefenseTech.create({
      techId: Defense.ROCKET_LAUNCHER_ID,
      unit: {
        costs: {
          metal: 2000,
        },
        basicShield: 20,
        basicAttack: 80,
      },
    }, { include });
    DefenseTech.create({
      techId: Defense.LIGHT_LASER_ID,
      unit: {
        costs: {
          metal: 1500,
          crystal: 500,
        },
        basicShield: 25,
        basicAttack: 100,
      },
    }, { include });
    DefenseTech.create({
      techId: Defense.HEAVY_LASER_ID,
      unit: {
        costs: {
          metal: 6000,
          crystal: 2000,
        },
        basicShield: 100,
        basicAttack: 250,
      },
    }, { include });
    DefenseTech.create({
      techId: Defense.GAUSS_CANNON_ID,
      unit: {
        costs: {
          metal: 20000,
          crystal: 15000,
          deuterium: 2000,
        },
        basicShield: 200,
        basicAttack: 1100,
      },
    }, { include });
    DefenseTech.create({
      techId: Defense.ION_CANNON_ID,
      unit: {
        costs: {
          metal: 2000,
          crystal: 6000,
        },
        basicShield: 500,
        basicAttack: 150,
      },
    }, { include });
    DefenseTech.create({
      techId: Defense.PLASMA_TURRET_ID,
      unit: {
        costs: {
          metal: 50000,
          crystal: 50000,
          deuterium: 30000,
        },
        basicShield: 300,
        basicAttack: 3000,
      },
    }, { include });
    DefenseTech.create({
      techId: Defense.SMALL_SHIELD_DOME_ID,
      unit: {
        costs: {
          metal: 10000,
          crystal: 10000,
        },
        basicShield: 2000,
        basicAttack: 1,
        maxQuantity: 1,
      },
    }, { include });
    DefenseTech.create({
      techId: Defense.LARGE_SHIELD_DOME_ID,
      unit: {
        costs: {
          metal: 50000,
          crystal: 50000,
        },
        basicShield: 10000,
        basicAttack: 1,
        maxQuantity: 1,
      },
    }, { include });

    /***********
     * arkeros *
     ***********/
    const hyperion = await Planet.create({
      name: 'Hyperion',
      diameter: 12800,
    });
    hyperion.addShip(SMALL_CARGO, { quantity: 4400 });
    hyperion.addShip(LARGE_CARGO, { quantity: 299 });
    hyperion.addShip(DEATH_STAR, { quantity: 2 });
    hyperion.addShip(ROCKET_LAUNCHER, { quantity: 300000 });
  });
}

export default { sync };
export { Defense, Ship, Technology, User, UserLogin, UserClaim, UserProfile };
