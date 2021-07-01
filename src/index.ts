//Import core Node modules and dependencies
import * as Discord from 'discord.js';
import player from 'discord-player';
import fs from 'fs';
import dotEnv from 'dotenv';

// Import first-party dependencies and etc
import {eventHandler} from './EventHandler';
import CommandHandler from './CommandHandler';
import {CommandManager} from './CommandManager';

//Get the environment variables
dotEnv.config({path: "secret.env"});

export const bot: Discord.Client = new Discord.Client()

// Monitor discord WS events
bot.on("error", async function(error){
	return console.log(`[WS ERROR] ${bot.user.username} has encountered a websocket error! The error is: ${error.name} (Stack: ${error.stack})`);
});
bot.on('shardReconnecting', async function(){
	return console.log(`[WS RECONNECTING] ${bot.user.username} is attempting to reconnect to discord!`);
});
bot.on('shardResume', async function(replayed){
	return console.log(`[WS RECONNECTED] ${bot.user.username} has reconnected! Replays: ${replayed}`);
});

// Start the Event Handler
let EventHandler: eventHandler = new eventHandler(bot);
let CMDHandler: CommandHandler = new CommandHandler(bot);
export let CMDManager: CommandManager = new CommandManager();

bot.login(process.env.BOT_TOKEN)