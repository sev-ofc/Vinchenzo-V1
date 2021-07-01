import { Message } from "discord.js";
import {bot, MusicPlayer} from '../index';

export let commandProps = {
	'name': 'play',
	'usage': '[prefix]play',
	'aliases': ['play', 'playmusic', 'playsong']
}

export async function cmd(message: Message, args: string[]){
	if(!message.member.voice.channel) return message.reply(`:x: You must be in a voice channel to do this command!`);
	if(!args.join(" ")) return message.reply(`:x: Invalid track name!`)
	await MusicPlayer.play(message, args.join(" "), true);
}