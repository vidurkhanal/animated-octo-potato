import { Entity } from "@mikro-orm/core/decorators/Entity";
import { PrimaryKey } from "@mikro-orm/core/decorators/PrimaryKey";
import { Property } from "@mikro-orm/core/decorators/Property";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Book {

  @Field(()=>Int)
  @PrimaryKey({unique:true})
  id!: number;

  @Field(()=>String)
  @Property({type:"date"})
  createdAt = new Date();

  @Field(()=>String)
  @Property({type:"date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(()=>String)
  @Property({type:'text'})
  title!: string;
}