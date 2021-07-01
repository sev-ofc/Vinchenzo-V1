import * as fs from 'fs';
import * as Discord from 'discord.js';
import glob from 'glob';
import Pair from './util/Pair';

export class CommandManager {
	
	// Map<CommandName, Pair<Aliases, commandDir>>
	commands: Map<string, Pair<String[], string>>
	aliasMap: Map<string, String[]>

	constructor(){
		this.commands = new Map;
		this.aliasMap = new Map;
	}

	async registerCommand(commandName: string, aliases: string[], commandDir: string){
		this.commands.set(commandName, new Pair(aliases, commandDir));
		this.aliasMap.set(commandName, aliases);
		console.log('Registered new command! ' + commandName);
	}

	async findCommand(commandToSearch: string): Promise<string> {
		let finalCommandsName: string;
		this.aliasMap.forEach(async (aliases, commandName) => {
			if(aliases.includes(commandToSearch) || commandToSearch == commandName) finalCommandsName = commandName;
		})

		if(finalCommandsName) return finalCommandsName
		else return null;
	}

	async getCommandDir(commandToSearch: string): Promise<string> {
		if(!this.findCommand(commandToSearch.toLowerCase())) return null;
		let CommandPair = this.commands.get(commandToSearch.toLowerCase())
		if(!CommandPair) return null;
		let cmdDir = CommandPair.getElemTwo()
		return cmdDir;
	}

	async runCommand(commandName: string, message: Discord.Message, args: string[]){
		if(!commandName) return;
		if(!this.findCommand(commandName.toLowerCase())) return false;
		let cmdObj = require(await this.getCommandDir(commandName.toLowerCase()));
		cmdObj.cmd(message, args);
	}

}