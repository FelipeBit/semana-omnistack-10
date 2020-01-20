const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");
// index(lista), show(um registro), update, destroy

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },
  async store(request, response) {
    const { github_username, techs, longitude, latitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = apiResponse.data; // desetruturaçao
      // name = login, ou seja se não tiver name, recebe o valor do login

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      console.log(location);

      dev = await Dev.create({
        name,
        github_username,
        bio,
        avatar_url,
        techs: techsArray,
        location
      });

      // filtrar conexoes que estao ano max 10m e que possuem pelo menos 1 tech

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return response.json(dev);
  },
  async update() {},
  async destroy() {}
};
