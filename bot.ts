import { 
  Client, GatewayIntentBits, EmbedBuilder, Partials, 
  Message, Events, ActivityType, TextChannel 
} from 'discord.js';
import { Database } from 'bun:sqlite';

const db = new Database("message_cache.sqlite", { create: true });
db.run("CREATE TABLE IF NOT EXISTS messages (id TEXT PRIMARY KEY, content TEXT, authorTag TEXT, authorId TEXT, channelId TEXT, timestamp INTEGER)");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Message, Partials.Channel],
});

client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);