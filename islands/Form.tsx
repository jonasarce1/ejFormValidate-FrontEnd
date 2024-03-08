import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { JSX } from "preact";

type Error = {
  error: boolean;
  message: string;
};

//On blur es un evento que se dispara cuando el input pierde el foco, vease que haces clic en otro lado 

//Ej: en el onblur del email, llamar a una ruta (hacer fetch /api/checkmail/jonas@tal) que tenga un handler que compruebe si el email ya existe en la base de datos y devuelva true o false

export const Form: FunctionComponent = () => {
  const [error, setError] = useState<Error>({
    error: false,
    message: "",
  });

  //Otra manera es usar variables de estado para guardar los valores de los inputs
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [age, setAge] = useState<number | undefined>();

  const checkAge = (value: number) => {
    if (value < 18) {
      setError({
        error: true,
        message: "You must be older than 18",
      });
    } else {setError({
        error: false,
        message: "",
      });}
  };

  //si no hay nada en los campos, no deja hacer submit
  const isComplete = (e:JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    console.log(name, email, age);
    if (name === "" || email === "" || !age) {
      setError({
        error: true,
        message: "All fields are required",
      });
    } else {
      setError({
        error: false,
        message: "",
      });
      e.currentTarget.submit();
    }
  }

  const mailExists = async (mail: string) => {
    const response = await fetch(`/api/get/${mail}`);
    const data = await response.json();  
    const exists = data.exists;
    console.log(data);
    if(!exists){
      setError({error:true, message:"El email no esta en la BBDD"})
    }else{
      setError({error:false, message:""})
    }
  }

  return (
    <div class="form">
      <h1>Introduce tus datos</h1>
      <form action="/fin" method="GET" onSubmit = {(e) =>isComplete(e)}>
        <div>
          <label for="name">Name</label> 
        </div>
        <div>
          <input type="text" id="name" name="name" value={name}
          onInput={(e) => setName(e.currentTarget.value)} 
          onFocus={() => setError({error: false, message: ""})} 
          />
        </div>

        <div>
          <label for="email">Email</label>
        </div>
        <div>
          <input type="email" id="email" name="email" value = {email}
          onInput={(e) => setEmail(e.currentTarget.value)} 
          onFocus={() => setError({error: false, message: ""})} 
          onBlur = {(e) => mailExists(e.currentTarget.value)}
          />
        </div>

        <div>
          <label for="age">Age</label>
        </div>
        <div>
          <input
            type="number"
            id="age"
            name="age"
            value = {age}
            onBlur={(e) => checkAge(Number(e.currentTarget.value))}
            onInput={(e) => setAge(Number(e.currentTarget.value))} 
            onFocus={() => setError({error: false, message: ""})}
          />
        </div>
        <div>
          <button disabled={error.error} type="submit" class="btn">
            Submit
          </button>
        </div>
        <div>
          <button type="reset" class="reset">
            Reset
          </button>
        </div>
        {error.error && <div class="span-2 error">{error.message}</div>}
      </form>
    </div>
  );
};

export default Form;
