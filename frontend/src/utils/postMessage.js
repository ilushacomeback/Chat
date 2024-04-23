import routes from "../routes";

const postMessage = async (httpClient, token, data) => {
  try {
    const response = await httpClient.post(routes.addMessage(), data, {
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

export default postMessage;
