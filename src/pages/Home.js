import React from "react";
import { UserContext } from "../contexts/UserContexts";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const username = React.useRef(HTMLInputElement);
  const { setUserData } = React.useContext(UserContext);
  const history = useHistory();

  const handleGetUser = async () => {
    setIsLoading(true);
    const toBeFind = username.current?.value.trim();
    const user = await fetch(`https://api.github.com/users/${toBeFind}`, {
      method: "GET",
    });
    const dataJson = await user.json();
    if (dataJson.message !== "Not Found") {
      setUserData(dataJson);
      history.push(`/${username.current?.value}`);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-900">
      <div className="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0 flex flex-col h-screen">
        <div className="m-auto">
          <div className="bg-white rounded-lg p-10 justify-center items-center flex flex-col">
            <h1 className="text-gray-800 font-bold uppercase mb-2">Github User Card</h1>
            {isError && <h3 className="text-red-800 font-bold uppercase mb-2 text-sm">Profil tidak ditemukan!</h3>}
            <input type="text" name="username" id="username" placeholder="Input Username" className="bg-gray-300 rounded-lg p-2 border-0 focus:border-0 mb-2" ref={username} />
            <button onClick={() => handleGetUser()} disabled={isLoading} className="bg-blue-700 font-medium shadow rounded-lg p-2 text-gray-100 w-full hover:shadow-2xl hover:bg-blue-800">
              Generate!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
