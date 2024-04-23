import routes from "../routes";

const getChannels = async (httpClient, token) => {
  try {
    const response = await httpClient.get(routes.getChannels(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Network Error");
  }
};

export default getChannels
