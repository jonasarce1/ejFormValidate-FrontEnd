import { EmailModel, EmailModelType } from "../../../db/Email.tsx";
import { FunctionComponent } from "preact";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Data = {
    email: string
}

//handler que anyade un email a la base de datos
export const handler: Handlers<Data> = {
    POST: async (req: Request, ctx: FreshContext<unknown, Data>) => {
        try{
            const { mail } = ctx.params;
            const newEmail = new EmailModel({mail: mail});

            await newEmail.save();

            return new Response(JSON.stringify({message: "Email added"}), {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }catch(e){
            return new Response(JSON.stringify({message: "Error adding email"}), {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

    }     
}
