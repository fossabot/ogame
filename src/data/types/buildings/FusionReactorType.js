import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyType, { TechnologyMixin } from '../TechnologyType';
import BuildingType, { BuildingMixin } from '../BuildingType';

const FusionReactorType = new ObjectType({
  name: 'FusionReactor',
  interfaces: [TechnologyType, BuildingType],
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
    ...BuildingMixin,
    productionFactor: { type: FloatType }, // 0.00 to 1.00
  },
  isTypeOf: (value) => true, // TODO
});

export default FusionReactorType;