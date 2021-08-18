//Import core Node modules and dependencies
import * as Discord from 'discord.js';
import { Player } from "discord-player";
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
	return console.log(`[WS ERROR] ${bot.user.tag} has encountered a websocket error! The error is: ${error.name} (Stack: ${error.stack})`);
});
bot.on('shardReconnecting', async function(){
	return console.log(`[WS RECONNECTING] ${bot.user.tag} is attempting to reconnect to discord!`);
});
bot.on('shardResume', async function(replayed){
	return console.log(`[WS RECONNECTED] ${bot.user.tag} has reconnected! Replays: ${replayed}`);
});

// Start the Handlers
let EventHandler: eventHandler = new eventHandler(bot);
let CMDHandler: CommandHandler = new CommandHandler(bot);
export let CMDManager: CommandManager = new CommandManager();
export let MusicPlayer = new Player(bot);

// Handle Music Player Events
// MusicPlayer.on("trackStart", (message, track) => message.channel.send(`:musical_note: Now playing ${track.title}...`))

// Start Uptime
export let uptimeInt = Date.now();
export async function calculateUptime(theInt){
	return Date.now() - theInt;
}

bot.login(process.env.BOT_TOKEN);