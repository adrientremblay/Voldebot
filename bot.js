require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

const avada_kedavra = new Discord.MessageAttachment(
  "https://thumbs.gfycat.com/AcademicIllustriousGallowaycow-max-1mb.gif"
);

client.on("ready", () => {
  console.log("Connected as: " + client.user.tag);
  client.user.setActivity("The Dark Arts", { type: "STUDYING" });

  //   client.guilds.cache.forEach((guild) => {
  //     guild.channels.cache.forEach((channel) => {
  //       console.log(`${channel.name} ${channel.type} ${channel.id}`);
  //     });
  //   });
  //   let generalChannel = client.channels.cache.get("757781007784083551");
});

client.on("message", (receivedMessage) => {
  if (receivedMessage.author == client.user) {
    return;
  }
  receivedMessage.channel.send("shut up you PLEB");
});

client.login(process.env.BOT_TOKEN);
