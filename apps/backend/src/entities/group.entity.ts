import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { Application } from './application.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Group extends BaseEntity {
  @Property({ unique: true })
  name: string;

  @Property()
  description: string;

  @ManyToMany(() => Application, 'groups', {
    owner: true,
  })
  applications = new Collection<Application>(this);
}
