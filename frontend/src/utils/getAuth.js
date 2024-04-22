import routes from "../routes";

const getAuth = async (httpClient, data) => {
  try {
    const response = await httpClient.post(routes.getToken(), data);
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error('ww')
  }
};

export default getAuth;
