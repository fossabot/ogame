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

import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  // https://medium.com/@tarkus/validation-and-user-errors-in-graphql-mutations-39ca79cd00bf
  GraphQLError,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import Planet from '../models/Planet';
import PlanetType from '../types/PlanetType';


const cancelConstruction = mutationWithClientMutationId({
  name: 'CancelConstruction',
  inputFields: {
    planetId: {
      type: new NonNull(StringType),
    },
  },
  outputFields: {
    planet: {
      type: PlanetType,
      // TODO check null?
      // TODO check anythin else is ok?
      resolve: ({ planet }) => planet,
    },
  },
  async mutateAndGetPayload({ planetId }, context, { rootValue }) {
    // TODO fetch from req.user
    // const player = req.user;
    const { req, player } = rootValue;
    const planet = new Planet(planetId, player);
    if (!await player.hasPlanet(planet)) {
      throw new GraphQLError('This is not your planet!');
    }
    await planet.cancelConstruction();
    return { planet };
  },
});

export default cancelConstruction;
