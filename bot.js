require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();
const COMMAND_IDENTIFIER = "voldemort ";

let gifs = require("./gifs");

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

  if (receivedMessage.content.startsWith(COMMAND_IDENTIFIER)) {
    processCommand(receivedMessage);
  }
});

let processCommand = (receivedMessage) => {
  let commandContent = receivedMessage.content.substr(
    COMMAND_IDENTIFIER.length
  );
  let commandWords = commandContent.split(" ");
  let primaryCommand = commandWords[0];
  let args = commandWords.slice(1);

  switch (primaryCommand) {
    case "silence":
      silence(receivedMessage, args);
      break;
    case "kill":
      kill(receivedMessage, args);
      break;
  }
};

let silence = (receivedMessage, args) => {
  if (!args[0]) return;
  receivedMessage.channel.send("Shut up " + args[0] + "!");
  receivedMessage.channel.send(gifs.angry);
};

let kill = (receivedMessage, args) => {
  if (!args[0]) return;
  receivedMessage.channel.send("Your time has come " + args[0] + "...");
  receivedMessage.channel.send("AVADA KEDAVRA !");
  receivedMessage.channel.send(gifs.avada_kedavra);
};

client.login(process.env.BOT_TOKEN);
