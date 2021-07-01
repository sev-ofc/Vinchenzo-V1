import { DiscordAPIError } from 'discord.js';
import * as fs from 'fs';
import * as Discord from 'discord.js';
import glob from 'glob';

import {CMDManager} from './index';

// Loading in all of the Commands

export default class CommandHandler {
	private bot:Discord.Client;

	constructor(bot: Discord.Client){
	console.log(`[COMMANDS] Command loader started!`)
	glob(__dirname + '/commands/*', {absolute: false}, (error, files) => {
		files = files.filter(f => f.endsWith(`.js`) || f.endsWith(`.ts`));
		if (files.length < 1) return console.log(`[WARNING] There are no events to load...`);
		let fileRegexTS = new RegExp(/\/{0}([A-z-/\d]){1,100}([^A-z.ts]){1}/g); // converts the whole url path to just fileName
		let fileRegexJS = new RegExp(/\/{0}([A-z-/\d]){1,100}([^A-z.js]){1}/g); // converts the whole url path to just fileName
		let i = 0
		console.log(`[COMMANDS] Loading ${files.length - 1} Commands...`)
		files.forEach(async f => {
			let formattedEvent:string = f.replace(fileRegexTS, '').replace(fileRegexJS, '');
			if(f.includes(`CommandLoader`)) return; // Dont load the event loaded lmao
			let cmdObj = require(`${f}`);
			console.log(`[COMMANDS] ${i + 1}: ${cmdObj.commandProps.name} loaded!`);
			CMDManager.registerCommand(cmdObj.commandProps.name, cmdObj.commandProps.aliases, f);
			i++
		});

	})
	}

}