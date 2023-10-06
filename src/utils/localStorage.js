import axios from "axios";


export const afterLoginStorage = async () => {
  const URL = process.env.REACT_APP_PROD_API;

  try {
    const user = localStorage.getItem("user");

    if (user) {
      const url = `${URL}/api/affiliates`;

      try {
        const userData = JSON.parse(user);
        const accessToken = userData.data.access_token;

        const res = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });

        localStorage.setItem("res", JSON.stringify(res));
        return res.data;
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null; // Return an appropriate value in case of an error
      }
    } else {
      console.log("User data not found in local storage.");
      return null; // Return an appropriate value when user data is not found
    }
  } catch (error) {
    console.log("Error while making the GET request:", error);
    return null; // Return an appropriate value when there's an error
  }
}


export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));

};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("res");


};

export const getUserFromLocalStorage = () => {
  const userData = localStorage.getItem("user");
  
  // const result = localStorage.getItem("user");
  const user = JSON.parse(userData); // Parse the JSON data

  
  return user;
};

export const getResFromLocalStorage = () => {
  const resData = localStorage.getItem("res");
  
  // const result = localStorage.getItem("user");
  const res = JSON.parse(resData); // Parse the JSON data

  
  return res;
};
