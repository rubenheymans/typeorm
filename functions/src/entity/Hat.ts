import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column, BeforeInsert } from 'typeorm';
import { Hippo } from './Hippo'

@Entity()
export class Hat extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  color: string;

  @Column()
  createdAt: Date;

  @BeforeInsert()
  addTimestamp() {
    this.createdAt = new Date();
  }

  @ManyToOne(type => Hippo, hippo => hippo.hats)
  owner: Hippo;
}