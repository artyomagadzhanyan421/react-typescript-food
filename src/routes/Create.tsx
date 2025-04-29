import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// Components
import Navbar from "../components/Navbar";

// CSS
import "../styles/Create.css";

// .env
const apiUrl = import.meta.env.VITE_API_URL;
// const local = import.meta.env.VITE_LOCALHOST_API_URL;

function Create() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [tags, setTags] = useState("");
  const [cuisine, setCuisine] = useState('');
  const [picture, setPicture] = useState<File | null>(null);
  const [instructions, setInstructions] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  document.title = "BiteBook | Create recipe";

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate({ editor }) {
      setInstructions(editor.getHTML());
    },
  });

  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPicture(e.target.files[0]);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!picture) {
      setError("Please upload a picture!");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", desc);
      formData.append("time", time);
      formData.append("ingredients", ingredients);
      formData.append("tags", tags);
      formData.append("cuisine", cuisine);
      formData.append("picture", picture);
      formData.append("instructions", instructions);

      const res = await fetch(`${apiUrl}operation`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setLoading(false);
      } else {
        alert(data.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
      setLoading(false);
    }
  }

  return (
    <div className="Home">
      <Navbar />
      <div className="Recipe">
        <div className="recipe-data">
          <form className="formBlock createForm" onSubmit={handleCreate}>
            <center><h2>Create recipe</h2></center>
            <div className="error" style={{ display: error ? "" : "none" }}>
              <i className='bx bx-error-circle'></i>
              <p>{error}</p>
            </div>
            <div className="inputBox">
              <i className='bx bx-image-alt'></i>
              <input type="file" placeholder="Picture*" onChange={handlePictureChange} required />
            </div>
            <div className="inputBox">
              <i className='bx bx-bowl-rice'></i>
              <input type="text" placeholder="Title*" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="inputBox">
              <i className='bx bx-message-square-dots'></i>
              <input type="text" placeholder="Description*" value={desc} onChange={e => setDesc(e.target.value)} required />
            </div>
            <div className="inputBox">
              <i className='bx bx-time-five'></i>
              <input type="number" placeholder="Time (in minutes)*" value={time} onChange={e => setTime(e.target.value)} required />
            </div>
            <div className="inputBox">
              <i className='bx bx-food-menu'></i>
              <input type="text" placeholder="Ingredients (with a comma)*" value={ingredients} onChange={e => setIngredients(e.target.value)} required />
            </div>
            <div className="inputBox">
              <i className='bx bx-hash'></i>
              <input type="text" placeholder="Tags (with a comma)*" value={tags} onChange={e => setTags(e.target.value)} required />
            </div>
            <div className="inputBox">
              <i className='bx bx-map'></i>
              <input type="text" placeholder="Cuisine*" value={cuisine} onChange={e => setCuisine(e.target.value)} required />
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
              <button className="enterBtn" disabled={loading}>
                <i className={loading ? "bx bx-refresh bx-spin" : "bx bx-plus-circle"} style={{ color: "black" }}></i>
                <span>{loading ? "Loading..." : "Create recipe"}</span>
              </button>
              <button
                className="enterBtn reset"
                type="reset"
                disabled={loading}
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
                <span>Reset recipe</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Create