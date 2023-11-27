import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { Group } from './group.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Application extends BaseEntity {
  @Property({ unique: true })
  name: string;

  @Property()
  description: string;

  @ManyToMany(() => Group, 'applications')
  groups = new Collection<Group>(this);
}
