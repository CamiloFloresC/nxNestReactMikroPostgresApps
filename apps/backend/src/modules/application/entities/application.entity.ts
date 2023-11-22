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

  @Property({ unique: true })
  name: string;

  @Property()
  description: string;

  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date;

  @Property({
    type: 'date',
    onUpdate: () => new Date(),
    onCreate: () => new Date(),
  })
  updatedAt: Date;

  @Property()
  client_id: string;

  @ManyToOne(() => Group, {
    cascade: [Cascade.ALL],
  })
  group?: Group;
}
