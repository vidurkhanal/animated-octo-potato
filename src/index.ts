import { MikroORM } from "@mikro-orm/core"
import "reflect-metadata"
import mikroOrmConfig from "./mikro-orm.config"
import express from 'express'
import { PORT } from "./constants"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { BookResolver } from "./resolvers/book"

const main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig)
    await orm.getMigrator().up()

    const app = express()

    const apolloServer = new ApolloServer({
        schema:await buildSchema({
            resolvers:[BookResolver],
            validate:false
        }),
        context:()=>({em:orm.em}),
    })

    apolloServer.applyMiddleware({app})

    app.get("/",(_req,res)=>{
        res.send("Hello World")
    })

    app.listen(PORT,()=>{
        console.log("Server is now running on http://localhost:"+PORT)
    })

}

main().catch((err)=>console.log(err.message))