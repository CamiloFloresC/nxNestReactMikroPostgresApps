import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Application } from '../../application/entities/application.entity';

@Entity()
export class Group {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  name: string;

  @Property()
  description: string;

  @Property({ type: 'date' })
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @OneToMany(() => Application, (a) => a.group, {
    cascade: [Cascade.ALL],
  })
  applications = new Collection<Application>(this);
}
