import { Player } from "discord-player";
import { Message } from "discord.js";
import {bot, MusicPlayer} from '../index';

export let commandProps = {
	'name': 'skip',
	'usage': '[prefix]skip',
	'aliases': ['skipsong', 'next', 'fs', 'forceskip']
}

export async function cmd(message: Message, args: string[]){
	if(!message.member.voice.channel) return message.reply(`:x: You must be in a voice channel to do this command!`);
	await MusicPlayer.skip(message);
	message.reply(':track_next: Skipping Track');
}