// Components
import Navbar from "../components/Navbar";

function Create() {
  document.title = "Food Recipes | Create recipe"

  return (
    <div className="Home">
      <Navbar />
      <div className="Recipe">
        <div className="recipe-data">
          <form className="formBlock createForm">
            <center><h2>Create recipe</h2></center>
            <div className="inputBox">
              <i className='bx bx-image-alt'></i>
              <input type="file" placeholder="Title*" required />
            </div>
            <div className="inputBox">
              <i className='bx bx-bowl-rice'></i>
              <input type="text" placeholder="Title*" required />
            </div>
            <div className="inputBox">
              <i className='bx bx-message-square-dots'></i>
              <input type="text" placeholder="Description*" required />
            </div>
            <div className="inputBox">
              <i className='bx bx-time-five'></i>
              <input type="number" placeholder="Time (in minutes)*" required />
            </div>
            <div className="inputBox">
              <i className='bx bx-food-menu'></i>
              <input type="text" placeholder="Ingredients (with a comma)*" required />
            </div>
            <div className="inputBox">
              <i className='bx bx-hash'></i>
              <input type="text" placeholder="Tags (with a comma)*" required />
            </div>
            <div className="btnFlex">
              <button className="enterBtn">
                <i className="bx bx-plus-circle" style={{ color: "black" }}></i>
                <span>Create recipe</span>
              </button>
              <button className="enterBtn reset" type="reset">
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