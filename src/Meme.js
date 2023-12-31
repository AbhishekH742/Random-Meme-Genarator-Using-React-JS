import React from "react";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    imageURL: "./images/memeImg.png"
  });

  const [allMemes, setAllMemes] = React.useState([])

  React.useEffect( ()=>{
   fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes))

  },[])

  function handleOnChange(event) {
    const { name, value } = event.target;
    setMeme((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }
  function handleClick() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevData) =>{
      return {
        ...prevData,
        imageURL : url
      }
    })
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleOnChange}
        />

        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleOnChange}
        />
        <button className="form--button" onClick={handleClick}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
       
        <img src={meme.imageURL} className="meme--image" alt="img"/>
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
