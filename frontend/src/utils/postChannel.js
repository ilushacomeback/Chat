import routes from "../routes";

const postChannel = async (httpClient, token, data) => {
  try {
    const response = await httpClient.post(routes.channels(), data, {
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

export default postChannel;