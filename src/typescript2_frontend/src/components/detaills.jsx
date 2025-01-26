import { useEffect, useState } from "react";
import NavBar from "./navbar";
import { useParams } from "react-router-dom";
import { typescript2_backend } from 'declarations/typescript2_backend';
const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    typescript2_backend. get_newletter(id).then((result) => {
    console.log(result.ok,"f")
      setData(result.ok);
    });
  }, []);
  return (
    <div className="">
      <NavBar />
      {data ? (
        <div>
         
            <div className="">
             <div className="details">
                <div className="detail">
                  <img src={data.image} />
                  <div className="">
                    <h1 className="">{data.heading}</h1>
                    <p className="">
                     {data.letter}
                    </p>
                    
                  <div className="by">
                    <h1 className="">
                      by <span className="">samuel gichuki</span>
                    </h1>
                  </div>
                  </div>
                </div>
              </div>
            </div>
        
        </div>
      ) : (
        <div className="no">no data available</div>
      )}
    </div>
  );
};

export default Details;
