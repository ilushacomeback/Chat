import routes from "../routes";

const getMessages = async (httpClient, token) => {
  try {
    const response = await httpClient.get(routes.getMessages(), {
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

export default getMessages