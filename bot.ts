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
  c.user.setActivity("Hey people");
});

client.login(TOKEN);
