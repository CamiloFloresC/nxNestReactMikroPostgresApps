import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Application {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  name: string;

  @Property()
  description: string;

  @Property()
  client_id: string;
}
