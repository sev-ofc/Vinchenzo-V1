import * as Discord from 'discord.js';
import {bot} from '../index';
import fs from 'fs';

export interface GuildConfigFile {
	sussyUsers: object,
	autoResponder: boolean,
	randomDMs: boolean
}

export class GuildConfigManager {
	defaultConfiguration: GuildConfigFile;

	constructor(){
		this.defaultConfiguration = {
			sussyUsers: [],
			autoResponder: false,
			randomDMs: false
		}
		console.log(`[GUILD CONFIGURER] Starting guild config manager`);
		
		if(!fs.existsSync(`./data/guilds`)){
			console.log("[GUILD CONFIGURER] Creating guild directory"); 
			fs.mkdir(`./data/guilds`, { recursive: true }, (err) => {
				if (err) throw err;
		  }); 
		}
	}

	async generateConfig(guildID): Promise<void>{
		let guild = await bot.guilds.cache.get(guildID);
		if(!guild) return null;
		let configPath = `./data/guilds/${guildID}`;

		if(!fs.existsSync(`${configPath}`)){ 
			fs.mkdir(`${configPath}`, { recursive: true }, (err) => {
				if (err) throw err;
		  }); 
		  console.log(`[GUILD CONFIGURER] Creating guild directory for ${guild.name} [${guild.id}]`)
		}
		let toWrite = JSON.stringify(this.defaultConfiguration, null, 4);
		if(!fs.existsSync(`${configPath}/config.json`)){
			console.log(`[GUILD CONFIGURER] Creating guild config file for ${guild.name} [${guild.id}]`)
			fs.writeFileSync(`${configPath}/config.json`, toWrite);
		}

		return;
	}

	async configExists(guildID): Promise<boolean> {
		let configPath = `./data/guilds/${guildID}`;
		if(!fs.existsSync(`${configPath}/config.json`)){
			return false
		}
		else return true;
	}

	async updateConfig(guildID: string, newConfig: GuildConfigFile): Promise<GuildConfigFile>{
		let configPath = `./data/guilds/${guildID}`;
		let guild = await bot.guilds.cache.get(guildID);
		if(!guild) return null;
		if(!this.configExists(guildID)) await this.generateConfig(guildID)
		let toWrite = JSON.stringify(newConfig, null, 4);
		fs.writeFileSync(`${configPath}/config.json`, toWrite);
		return newConfig;
	}

	async getConfig(guildID: string): Promise<GuildConfigFile>{
		let configPath = `./data/guilds/${guildID}`;
		let config: GuildConfigFile = await JSON.parse(fs.readFileSync(`${configPath}/config.json`).toString());
		if(!config) return null;
		else return config
	}
} 