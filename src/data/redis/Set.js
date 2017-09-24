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

import redis from './redis';

class Set<T> {
  constructor(key: string) {
    this.key = key;
  }

  add(item: T): Promise {
    return redis.saddAsync(this.key, item);
  }

  values(): Promise<List<T>> {
    return redis.smembersAsync(this.key);
  }

  has(item: T): Promise<boolean> {
    return redis.sismemberAsync(this.key, item);
  }
}

export default Set;
