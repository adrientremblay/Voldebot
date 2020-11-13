require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

const COMMAND_IDENTIFIER = "voldemort ";

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
  }
};

let silence = (receivedMessage, args) => {
  if (!args[0]) return;
  receivedMessage.channel.send("Shut up " + args[0]);
};

client.login(process.env.BOT_TOKEN);
