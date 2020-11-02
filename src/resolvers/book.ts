import { Book } from "../entities/Book";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {MyContext} from "../types";


@Resolver()
export class BookResolver {
    @Query(()=>[Book])
    books(@Ctx() {em}:MyContext):Promise<Book[]>{
        return em.find(Book,{})
    }

    @Query(()=>Book,{nullable:true})
    book(@Arg("id") id:number,@Ctx() {em}:MyContext):Promise<Book | null>{
        return em.findOne(Book,{id})
    }

    @Mutation(()=>Book)
    async createBook(@Arg("title") title:string , @Ctx() {em}:MyContext):Promise<Book>{
        const newBook = em.create(Book,{title})
        await em.persistAndFlush(newBook)
        return newBook
    }

}