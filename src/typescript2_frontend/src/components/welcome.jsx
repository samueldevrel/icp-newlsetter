import AuthButton from "../auth/authbutton";
import NavBar from "./navbar";

const Welcome = () => {
  return (
    <div className="">
      <NavBar />
      <div className="welcome">
        <div className="">
          <h1 className="">Your one time newltter dapp build on icp chain</h1>
        <AuthButton/>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
