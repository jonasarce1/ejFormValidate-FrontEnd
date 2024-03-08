import { EmailModel, EmailModelType } from "../../../db/Email.tsx";
import { FunctionComponent } from "preact";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Data = {
    email: EmailModelType
}

//handler que devuelve true o false si el email ya está en la base de datos
export const handler: Handlers<Data> = {
    GET: async (req: Request, ctx: FreshContext<unknown, Data>) => {
        const { mail } = ctx.params;
        const emailAux = await EmailModel.findOne({mail: mail});

        return new Response(JSON.stringify({exists: emailAux !== null}), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }     
}
