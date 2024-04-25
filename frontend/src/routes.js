const apiPath = "/api/v1";

const routes = {
  getToken: () => [apiPath, "login"].join("/"),
  channels: () => [apiPath, "channels"].join("/"),
  messages: () => [apiPath, "messages"].join("/"),
  addUser: () => [apiPath, "signup"].join("/"),
};

export default routes;
