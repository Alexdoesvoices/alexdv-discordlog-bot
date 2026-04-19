import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  Partials,
  Message,
  Events,
  ActivityType,
  PresenceUpdateStatus,
  TextChannel,
} from "discord.js";
import { Database } from "bun:sqlite";

const TOKEN = process.env.DISCORD_TOKEN;
const LOG_CHANNEL = process.env.LOG_CHANNEL;

const db = new Database("message_cache.sqlite", { create: true });
db.run("CREATE TABLE IF NOT EXISTS messages (id TEXT PRIMARY KEY, content TEXT, authorTag TEXT, authorId TEXT, channelId TEXT, timestamp INTEGER)");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel],
});

client.once(Events.ClientReady, async (c) => {
  console.log("Ready");
  console.log(LOG_CHANNEL)
  c.user.setActivity("Hey people");
});

client.login(TOKEN);
