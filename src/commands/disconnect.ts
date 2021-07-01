import { Player } from "discord-player";
import { Message } from "discord.js";
import {bot, MusicPlayer} from '../index';

export let commandProps = {
	'name': 'disconnect',
	'usage': '[prefix]disconnect',
	'aliases': ['leave', 'dc', 'vanquish']
}

export async function cmd(message: Message, args: string[]){
	if(!message.member.voice.channel) return message.reply(`:x: You must be in a voice channel to do this command!`);
	if(MusicPlayer.isPlaying(message)){
		let currentChannelInstance = await Array.from( await bot.voice.connections.filter(voiceConnection => voiceConnection.channel.guild.id == message.guild.id).values());
		if(currentChannelInstance.length < 1) return message.reply(`:x: This bot is not inside a voice channel!`);
		else currentChannelInstance[0].disconnect();
	}
	
}