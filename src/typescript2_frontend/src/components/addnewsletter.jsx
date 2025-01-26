import { useState } from "react";
import NavBar from "./navbar";
import { typescript2_backend } from 'declarations/typescript2_backend';
const AddNewsLetter = () => {
  const [title, setTitle] = useState("");
  const [letter, setLetter] = useState("");
  const [image, setImage] = useState("");
  const [message,setMessage]=useState("");
  const handleimage1 = (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => setImage(data.result));
    data.readAsDataURL(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    typescript2_backend 
      .add_nes_letter(
        letter,
        image,
        title
      )
      .then((result) => {
      
      setMessage("newsletter uploaded");
      });
  };
  return (
    <div className="">
      <NavBar />
      <div className="add">
        <h1 className="">Create news letter</h1>
        <div className="add1">
          <form className="form" onSubmit={handleSubmit}>
            <div className="add2">
              <label htmlFor="">Title of your newsletter</label>
              <input
                type="text"
                value={title}
                minLength={10}
                maxLength={50}
                required
                className=""
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="add2">
              <label htmlFor="">write your letter below</label>
              <textarea
                type="text"
                rows={8}
                value={letter}
                min={40}
                max={500}
                required
                className=""
                onChange={(e) => setLetter(e.target.value)}
              />
            </div>
            <div className="add2">
              <label htmlFor="">Image1 cover of your newsletter </label>
              <input type="file" required onChange={handleimage1} />
            </div>
            <div className="submit ">
              <button className="butt" type="submit">
                submit
              </button>
            </div>
          </form>
          <p className="red">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default AddNewsLetter;
