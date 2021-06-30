import * as Discord from 'discord.js';
import player from 'discord-player';
import dotEnv from 'dotenv';

dotEnv.config();

const bot = new Discord.Client()

bot.login(process.env.BOT_TOKEN)