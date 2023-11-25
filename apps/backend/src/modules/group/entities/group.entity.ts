import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Application } from '../../application/entities/application.entity';
import { v4 } from 'uuid';

@Entity()
export class Group {
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

  @ManyToMany(() => Application, 'groups', {
    cascade: [Cascade.ALL],
    owner: true,
    eager: true,
  })
  applications = new Collection<Application>(this);
}
