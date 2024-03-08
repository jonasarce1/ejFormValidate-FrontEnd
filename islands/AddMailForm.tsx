import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { JSX } from "preact";

type Error = {
  error: boolean;
  message: string;
};

//la diferencia entre onInput y onChange es que onInput se dispara cada vez que se escribe algo en el input, y onChange se dispara cuando el valor 

export const addMailForm: FunctionComponent = () => {
    const [error, setError] = useState<Error>({
        error: false,
        message: "",
    });
    
    const [email, setEmail] = useState<string>("");

    const addEmail = async (e:JSX.TargetedEvent<HTMLFormElement, Event>, mail: string) => {
        e.preventDefault();

        //llamada a post para añadir el email
        const response = await fetch(`/api/post/${mail}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mail: mail})
        });

        const data = await response.json();  
        
        if(data.message === "Email added"){
            globalThis.alert("Email anyadido correctamente!");
            setEmail(""); //limpia el input
        }else{
            globalThis.alert("Error anyadiendo email! Assegurate de que el email no esta ya en la base de datos.");
            setEmail(""); 
        }
        //e.currentTarget.submit(); //no hace falta porque no hay action en el form
    }
    
    return (
        <div class="form">
        <h1>Introduce to email</h1>
        <form method="POST" onSubmit = {(e) => addEmail(e, email)}>
            <div>
            <label for="email">Email</label>
            </div>
            <div>
            <input type="email" id="email" name="email" value = {email}
                onInput={(e) => setEmail(e.currentTarget.value)} 
                onFocus={() => setError({error: false, message: ""})} 
            />
            </div>
            <div>
            {error.error && <p>{error.message}</p>}
            </div>
            <div>
            <button type="submit">Submit email</button>
            </div>
        </form>
        </div>
    );
    }

    export default addMailForm;