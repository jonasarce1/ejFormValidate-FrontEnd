const GoHome = () => {
    return (
        <div>
            <h1>Fin</h1>
            <button onClick={() => globalThis.location.href = "/"}>Volver a la pagina principal</button>
        </div>
    );
}

export default GoHome;