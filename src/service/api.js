import axios from 'axios';


import { getUserFromLocalStorage } from "./localStorage"
// const URL1="http://localhost:5000"
// const URL1="https://affworld-chakra-api.onrender.com"

const URL = process.env.REACT_APP_PROD_ADMIN_API;
const URL2 = process.env.REACT_APP_PROD_API;
// const URL = "process.env.REACT_APP_BASE_URL;"
const KEY = "key";
const user = getUserFromLocalStorage();
// const navigate = useNavigate();




export const getData = async () => {
  
  try {
  
    const url = `${URL}/campaign/?api_key=${KEY}`;
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return   response.data;
  } catch (error) {
    console.log('error is-->', error);
    throw error; // Add this line to rethrow the error

  }
};



export const addCampagin = async (data) => {
  try {

    const url = `${URL}/campaign/?api_key=${KEY}`;

    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.log("error while posting: ", error.message);
    throw error; // Add this line to rethrow the error

  }
};


export const deleteCampagin = async (id) => {
  try {
    const url = `${URL}/campaign/${id}?api_key=${KEY}`;

    const response = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',

      }
    });
    const result = response.data;
    return result;

  } catch (error) {
    console.log("Error while deleting -->", error);
    throw error; // Add this line to rethrow the error

  }
};


export const fetchAdvitisors = async () => {

  try {
    const url = `${URL}/api/advitisor/?api_key=${KEY}`;
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.log("Error while Fetching Advitisors -->", error.message);
    throw error; // Add this line to rethrow the error

  }
}

export const addNewAdvitisors = async (data) => {

  try {
    const url = `${URL}/api/advitisor/?api_key=${KEY}`

    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.log("Error while Adding New Advitisors-->", error.message)
    throw error; // Add this line to rethrow the error

  }
}

export const deleteAdvitisorsData = async (id) => {

  try {
    const url = `${URL}/api/advitisor/${id}/?api_key=${KEY} `
    const response = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    console.log(response.status);

    return response.status;



  } catch (error) {
    console.log("Error while Deleting Advitisors DAta --> ", error.message)
    throw error; // Add this line to rethrow the error

  }




}

export const getPaymentDetails=async(id)=>{
  try{
    const result=await axios.get(`${URL}/getPaymentDetails/${id}`);
    // console.log("====",result.data);
    return result.data;
  }
  catch(error){
    console.log("error while getting projects ", error.message);
    throw error; // Add this line to rethrow the error

  }
}

export const getPaymentInfo = async()=>{
  const url = `${URL2}/api/affiliates/payment_info`;
  const accessToken = user.data.access_token;


  try{
    const response= await axios.get(url , {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }
    );
    // console.log("====",result.data);
    return response.data;
  }
  catch(error){
    console.log("error while getting payment info in apis js ", error);
    throw error; // Add this line to rethrow the error

  }
}


// ++++++++++++++++++++++++++++++++++++++Click conversion +++++++++++++++++++++++++++++++++++++++++++++


// export const fetchDataClick = async () => {
//   const accessToken = user.data.access_token;
//   console.log("access token is from apis   -->:", accessToken)
//   try {
//     const url = `${URL2}/api/analytics/clicks`;
//     console.log("URL is in apis -->", url)

//     const response = await axios.get(url , {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`

//       },}
//     );
//     return response.data;
//   }
//     catch (error) {
//       console.log(error)
//     }

// }

// export const postDataClick = async (item) => {
//   const accessToken = user.data.access_token;
//   const campageinId = item.campaign_id;
//   try {
//     const url = `${URL2}/api/analytics/postback?campaign_id=${campageinId}`;
//     const response = await axios.get(url, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`
//       }
//     });
//     return response.data;
//   }
//   catch (error) {
//     console.log("this is error while getting data in apis data----->",error);

//   } 
// }