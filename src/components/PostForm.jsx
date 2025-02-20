// Hook di React per gestire lo stato del componente
import { useState, useEffect } from "react";
import axios from "axios";

const initialFormData = {
    title: "",
    autore: "",
    contenuto: "",
    categoria: "",
    published: false,
};

const PostForm = () => {

    // utilizzo dello useState per la gestione dei data (array di oggetti post)
    const [posts, setPosts] = useState([]);
    // state per la gestione delle informazioni raccolte dai campi del form
    const [formData, setFormData] = useState(initialFormData)

    // funzione di gestione chiamata all'API
    function fetchPosts() {
        axios.get("http://localhost:3000/posts")
            .then((res) => {
                setPosts(res.data);
            })
            .catch(function (error) {
                console.log(error);

            }
            )
    }

    // richiamo la funzione di richiesta dati al caricamento del componente
    // Solo al primo rendering
    useEffect(fetchPosts, []);

    // funzione di gestione delle info dei campi
    function handleFormData(e) {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setFormData((currentFormData) => ({
            ...currentFormData,
            [e.target.name]: value,
        }));
    }

    // funzione di gestione dell'invio dell'intero form 
    function handleSubmit(e) {
        e.preventDefault();

        // aggiungo il nuovo post alla lista      possiamo usare id: Date.now() per un id univoco
        setPosts((currentPosts) => [...currentPosts, { id: currentPosts[currentPosts.length - 1].id + 1, ...formData }]);

        // resetto il form
        setFormData(initialFormData);

    }

    // contenuto della pagina
    return (
        <>
            <h1>questo è il form delle pizze</h1>


            <form id="formPost" action="#" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={handleFormData}
                    value={formData.title}
                    placeholder="Inserisci titolo post"
                />

                <input
                    type="text"
                    name="autore"
                    onChange={handleFormData}
                    value={formData.autore}
                    placeholder="Nome autore"
                />

                <textarea
                    name="contenuto"
                    onChange={handleFormData}
                    value={formData.contenuto}
                    placeholder="Contenuto post"
                ></textarea>

                <input
                    type="text"
                    name="categoria"
                    onChange={handleFormData}
                    value={formData.categoria}
                    placeholder="Categoria post"
                />

                <label htmlFor="published">pubblicato</label>
                <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleFormData}
                    id="published"
                />

                {/* bottone di invio */}
                <button>Aggiungi</button>

            </form>



            {posts.map((post) => (
                <div className="postItem" key={post.id}>
                    <h2>{post.title}</h2>
                    {/* <h3>{post.autore}</h3> */}
                    <p>{post.content}</p>
                    <img src={post.image} alt={post.title} />
                    <p>{post.tags.join(', ')}</p>
                    {/* <span>{post.published ? "post pubblicato" : "post non pubblicato"}</span> */}

                </div>
            ))
            }
        </>
    )
}

export default PostForm