import {
  Cascade,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Group } from '../../group/entities/group.entity';

@Entity()
export class Application {
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

  @Property()
  client_id: string;

  @ManyToOne(() => Group, {
    cascade: [Cascade.ALL],
  })
  group?: Group;
}
