// console.log(envAPI);
// // let envAPI = import.meta.env.VITE_DESHAL_LOCAL_ADMIN;

// export const getData = async (url) => {
  //   try {
    //     const access_token = window.localStorage.getItem('access_token');
//     const response = await fetch(`${envAPI}/${url}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${access_token}`
//       }
//     });
//     const status = response.status
//     console.log('response status', status)

//     if (status >= 200 && status < 300) {
  //       const data = await response.json();
//       // console.log(products.data[0].primary_category_name)
//       // console.log(products)
//       return data;
//     } else if (status >= 300 && status < 400) {
  //       console.log('Redirect Error:', response.statusText)
  //       return null;
  //     } else if (status > 400 && status < 500) {
    //       console.log('Client error response: ', response.statusText)
    //       return null;
    //     }
    //     else {
      //       console.error('Server Error:', response);
      //       return null;
      //     }
      //   } catch (error) {
        //     console.error('Error fetching data:', error);
        //     return null;
        //   }
        // };
        // export default getData
        

let envAPI = import.meta.env.VITE_API_GOBLIN_LOCAL;        
// let envAPI = import.meta.env.VITE_API_GOBLIN_PRODUCTION;
export async function _fetch_data(url) {
  console.log(url);
  try {
    // Get access token from local storage
    const access_token = window.localStorage.getItem('access_token');
    // Fetch data from the API
    const response = await fetch(`${envAPI}/${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      }
    });
    const status = response.status
    console.log('response status', status)

    if (status >= 200 && status < 300) {
      const data = await response.json();
      console.log('data==>', data)
      return data;
    } else if (status >= 300 && status < 400) {
      console.log('Redirect Error:', response.statusText)
      return [];
    } else if (status > 400 && status < 500) {
      console.log('Client error response: ', response.statusText)
      return [];
    }
    else {
      console.error('Server Error:', response);
      return [];
    }
  } catch (error) {
    // Log and handle any errors
    console.error('There has been a problem with your fetch operation:', error);
    return [];
  }
}