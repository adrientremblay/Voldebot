require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("Connected as: " + client.user.tag);
  client.user.setActivity("The Dark Arts", { type: "STUDYING" });

  client.guilds.cache.forEach((guild) => {
    guild.channels.cache.forEach((channel) => {
      console.log(`${channel.name} ${channel.type} ${channel.id}`);
    });
  });

  let generalChannel = client.channels.cache.get("757781007784083551");
  generalChannel.send("Hello Mudbloods");
});

client.login(process.env.BOT_TOKEN);
