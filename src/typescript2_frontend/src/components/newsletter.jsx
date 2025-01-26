import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import { typescript2_backend } from 'declarations/typescript2_backend';
import { useEffect, useState } from "react";
const NewsLetter = () => {
  const [data,setData]=useState([])
  useEffect(()=>{
    typescript2_backend.get_newsletters().then((result)=>{
      
      setData(result);
    })
  },[]);
  const router=useNavigate();

  return (
    <div className="">
      <NavBar />
      <div className="newsletter">
        {data.length == 0 ? (
          <div className="no">no newslettter available at the moment</div>
        ) : (
          <div className="main">
            {data.map((val, _index) => (
              <div className="maincard" key={_index}>
                <div className="card">
                  <h1 className="">{val.heading}</h1>
                  <img src={val.image} />
                </div>
                <div className="read">
                  <button onClick={()=>router(`/details/${val.id}`)}>Read More</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsLetter;
