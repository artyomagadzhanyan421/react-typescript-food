import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// Components
import Navbar from "../components/Navbar";
import LoadingEdit from "../components/loading/LoadingEdit";

//Hooks 
import useFetch from "../hooks/useFetch";

// Types
import TypeRecipe from "../types/TypeRecipe";

// .env
const apiUrl = import.meta.env.VITE_API_URL;
// const local = import.meta.env.VITE_LOCALHOST_API_URL;

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [tags, setTags] = useState("");
  const [cuisine, setCuisine] = useState('');
  const [picture, setPicture] = useState<File | null>(null);
  const [instructions, setInstructions] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const { recipes: recipe, loading, error } = useFetch<TypeRecipe>(`${apiUrl}recipes/${id}`);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDesc(recipe.description);
      setTime(recipe.time.toString());
      setIngredients(recipe.ingredients.join(", "));
      setTags(recipe.tags.join(", "));
      setCuisine(recipe.cuisine);
      setInstructions(recipe.instructions || "");
      editor?.commands.setContent(recipe.instructions || "");
    }
  }, [recipe]);

  {
    loading ? (
      document.title = "Loading..."
    ) : error ? (
      document.title = `${error}`
    ) : !recipe ? (
      document.title = "Not Found!"
    ) : (
      document.title = `Edit ${recipe.title}`
    )
  }

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate({ editor }) {
      setInstructions(editor.getHTML());
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("time", time);
    formData.append("ingredients", ingredients);
    formData.append("tags", tags);
    formData.append("cuisine", cuisine);
    formData.append("instructions", instructions);
    if (picture) {
      formData.append("picture", picture);
    }

    try {
      const response = await fetch(`${apiUrl}operation/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.message);
      } else {
        alert(data.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setFormError("Something went wrong!");
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="Home">
      <Navbar />
      <div className="Recipe">
        {loading ? (
          <div className="recipe-data">
            <form className="formBlock createForm">
              <LoadingEdit />
            </form>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : !recipe ? (
          <p>Recipe not found!</p>
        ) : (
          <div className="recipe-data">
            <form className="formBlock createForm" onSubmit={handleSubmit}>
              <center><h2 style={{ width: "fit-content" }}>Edit recipe</h2></center>
              <div className="error" style={{ display: formError ? "" : "none" }}>
                <i className='bx bx-error-circle'></i>
                <p>{formError}</p>
              </div>
              <div className="inputBox">
                <i className='bx bx-image-alt'></i>
                <input
                  type="file"
                  onChange={(e) => setPicture(e.target.files?.[0] || null)}
                />
              </div>
              <div className="inputBox">
                <i className='bx bx-bowl-rice'></i>
                <input type="text" placeholder="Title*" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="inputBox">
                <i className='bx bx-message-square-dots'></i>
                <input type="text" placeholder="Description*" value={desc} onChange={(e) => setDesc(e.target.value)} required />
              </div>
              <div className="inputBox">
                <i className='bx bx-time-five'></i>
                <input type="number" placeholder="Time (in minutes)*" value={time} onChange={(e) => setTime(e.target.value)} required />
              </div>
              <div className="inputBox">
                <i className='bx bx-food-menu'></i>
                <input type="text" placeholder="Ingredients (with a comma)*" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
              </div>
              <div className="inputBox">
                <i className='bx bx-hash'></i>
                <input type="text" placeholder="Tags (with a comma)*" value={tags} onChange={(e) => setTags(e.target.value)} required />
              </div>
              <div className="inputBox">
                <i className='bx bx-map'></i>
                <input type="text" placeholder="Cuisine*" value={cuisine} onChange={(e) => setCuisine(e.target.value)} required />
              </div>

              {editor && (
                <div className="tiptap-toolbar">
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                  >
                    <i className='bx bx-heading' style={{ fontSize: 20 }}></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                  >
                    <i className='bx bx-italic' style={{ fontSize: 20 }} ></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                  >
                    <i className='bx bx-list-ul' style={{ fontSize: 20 }} ></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                  >
                    <i className='bx bx-list-ol' style={{ fontSize: 20 }} ></i>
                  </button>
                </div>
              )}

              <div className="tiptap-textarea">
                <EditorContent editor={editor} />
              </div>

              <div className="btnFlex">
                <button className="enterBtn" disabled={submitting}>
                  <i className={submitting ? "bx bx-refresh bx-spin" : "bx bx-edit"} style={{ color: "black" }}></i>
                  <span>{submitting ? "Loading..." : "Edit recipe"}</span>
                </button>
                <button
                  className="enterBtn reset"
                  type="reset"
                  disabled={submitting}
                  onClick={() => {
                    setTitle("");
                    setDesc("");
                    setTime("");
                    setIngredients("");
                    setTags("");
                    setCuisine("");
                    setPicture(null);
                    setInstructions("");
                    if (editor) {
                      editor.commands.setContent("");
                    }
                  }}
                >
                  <i className="bx bx-reset" style={{ color: "white" }}></i>
                  <span>Reset changes</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Edit