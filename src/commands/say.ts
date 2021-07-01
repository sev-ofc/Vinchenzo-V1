import { Player } from "discord-player";
import { Message } from "discord.js";
import {bot, MusicPlayer} from '../index';

export let commandProps = {
	'name': 'say',
	'usage': '[prefix]say',
	'aliases': ['repeat']
}

export async function cmd(message: Message, args: string[]){
	if(message.member.hasPermission('ADMINISTRATOR')){
		message.channel.send(args.join(" "));
		message.delete()
	}
	else null;
}