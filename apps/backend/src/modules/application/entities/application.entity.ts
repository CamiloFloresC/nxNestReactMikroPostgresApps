import {
  Cascade,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Ref,
} from '@mikro-orm/core';
import { Group } from '../../group/entities/group.entity';
import { v4 } from 'uuid';

@Entity()
export class Application {
  @PrimaryKey()
  id: string = v4();

  @Property({ unique: true })
  name: string;

  @Property()
  description: string;

  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date;

  @Property({
    type: 'date',
    onCreate: () => new Date(),
  })
  updatedAt: Date;

  @Property()
  client_id: string;

  @ManyToOne(() => Group, {
    cascade: [Cascade.ALL],
  })
  group?: Ref<Group>;
}
