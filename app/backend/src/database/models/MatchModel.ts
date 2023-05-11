import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

import TeamModel from './TeamModel';

class MatchModel extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

MatchModel.belongsTo(TeamModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default MatchModel;
