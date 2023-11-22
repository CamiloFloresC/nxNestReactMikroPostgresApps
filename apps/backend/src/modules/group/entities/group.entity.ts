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

  @OneToMany(() => Application, (a) => a.group, {
    cascade: [Cascade.ALL],
  })
  applications = new Collection<Application>(this);
}
