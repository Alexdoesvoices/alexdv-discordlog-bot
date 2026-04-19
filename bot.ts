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


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Message, Partials.Channel],
});




client.login(process.env.DISCORD_TOKEN);
