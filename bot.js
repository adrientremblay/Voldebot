require("dotenv").config();

const { sandybrown } = require("color-name");
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const client = new Discord.Client();
const COMMAND_IDENTIFIER = "voldemort ";

let gifs = require("./gifs");

client.on("ready", () => {
  console.log("Connected as: " + client.user.tag);
  client.user.setActivity("The Dark Arts", { type: "STUDYING" });

  // client.guilds.cache.forEach((guild) => {
  //   guild.channels.cache.forEach((channel) => {
  //     console.log(`${channel.name} ${channel.type} ${channel.id}`);
  //   });
  // });
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
    case "say":
      say(receivedMessage, args);
      break;
    case "breakdance":
      breakdance(receivedMessage, args);
      break;
    case "banish":
      stopBreakdance(receivedMessage, args);
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

let say = (receivedMessage, args) => {
  if (!args[0]) return;
  receivedMessage.channel.send(
    "*a snakelike slytherin whispher fills your ears...*"
  );
  receivedMessage.channel.send("*it says:*");
  receivedMessage.channel.send('"' + args.join(" ") + '"');
  receivedMessage.channel.send(gifs.happy);
};

let stopBreakdance = (receivedMessage, args) => {
  client.guilds.cache.forEach((guild) => {
    guild.channels.cache
      .filter((channel) => channel.name == "General" && channel.type == "voice")
      .forEach((channel) => {
        channel.leave();
      });
  });
};

let breakdance = (receivedMessage, args) => {
  // initial messages
  if (args.length != 0) {
    if (!Number.isInteger(parseInt(args[0]))) return;
    receivedMessage.channel.send(
      `@everyone REMINDER: Meeting in ${args[0]} minutes!`
    );
    receivedMessage.channel.send(
      "Join the epic harry potter dubstep dance party in VOICE GENERAL while waiting!"
    );
  } else {
    receivedMessage.channel.send("Lets get this party started...");
    receivedMessage.channel.send(
      "@everyone JOIN GENERAL VOICE AND MOVE YOUR FEET FOR THE DARK LORD!"
    );
  }
  receivedMessage.channel.send(gifs.dance);
  // finding general voice channels and playing dank music
  receivedMessage.guild.channels.cache
    .filter((channel) => channel.name == "General" && channel.type == "voice")
    .forEach((channel) => {
      channel
        .join()
        .then((connection) => {
          // playing dank music
          connection.play("./song.mp3");
        })
        .catch((err) => console.log(err));
    });
};

client.login(process.env.BOT_TOKEN);
