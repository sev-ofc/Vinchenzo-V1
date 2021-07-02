import { Player } from "discord-player";
import { Message, MessageEmbed } from "discord.js";
import {bot, MusicPlayer} from '../index';

export let commandProps = {
	'name': 'clear',
	'usage': '[prefix]clear',
	'aliases': ['clear', 'c', 'clearqueue', 'wipe']
}

export async function cmd(message: Message, args: string[]){
	await MusicPlayer.clearQueue(message);
	return message.reply(`:white_check_mark: Cleared!`);
}