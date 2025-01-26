import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import { typescript2_backend } from 'declarations/typescript2_backend';
import { useEffect, useState } from "react";
import { useAuth } from "../auth/authetication";
const Profile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { isAuthenticated, login, principal, logout } = useAuth()
  const router = useNavigate();
  useEffect(() => {
    typescript2_backend.get_profile().then((result) => {
     
      setData(result.ok.newsletter);
    });
  }, []);


  if (!isAuthenticated) {
    return (
      <div className="">
        <NavBar />
        <div className="no">not logged in please sign up to continue</div>
      </div>
    );
  }
const handleDelete=(id)=>{
  typescript2_backend.delete_new_letter(id).then((result) => {

  });
  typescript2_backend.get_profile().then((result) => {
     
    setData(result.ok.newsletter);
  });
}
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
                <div className="del">
                  <button onClick={() => router(`/details/${val.id}`)}>Read More</button>
              
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
