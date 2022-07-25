import axios from "axios";

export const getHello = async () => {
  // const response = await fetch('/api/hello', {
  //   method: 'get',
  //   headers: { 'Content-Type': 'application/json' }
  // });

  // if (response.ok) {
  //   console.log('test1', response);
  //   return response;
  // } else {
  //   alert(response.statusText);
  // }

  try {
    const response = await axios.get('/api/hello');

    console.log('success', response)
    return response
  } catch (error) {
    console.log(error);
  }
};