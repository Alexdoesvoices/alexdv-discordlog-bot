import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  Partials,
  Message,
  Events,
  ActivityType,
  TextChannel,
} from "discord.js";
import { Database } from "bun:sqlite";

//* Declaring Databse to store message hisotry:
const db = new Database("message_cache.sqlite", { create: true });
db.run(
  "CREATE TABLE IF NOT EXISTS messages (id TEXT PRIMARY KEY, content TEXT, authorTag TEXT, authorId TEXT, channelId TEXT, timestamp INTEGER)",
);

//* Define client:
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel],
});

//* Log to terminal once bot is active:
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

//* Log live messages to the databse:
client.on(Events.MessageCreate, (message) => {
  if (message.author.bot || !message.guild) return;
  const insert = db.prepare(
    "INSERT OR REPLACE INTO messages VALUES (?, ?, ?, ?, ?, ?)",
  );
  insert.run(
    message.id,
    message.content,
    message.author.tag,
    message.author.id,
    message.channel.id,
    Date.now(),
  );
});

client.login(process.env.DISCORD_TOKEN);
