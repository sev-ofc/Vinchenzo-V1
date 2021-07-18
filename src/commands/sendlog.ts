import { Player } from "discord-player";
import { Message } from "discord.js";
import {bot, MusicPlayer} from '../index';

export let commandProps = {
	'name': 'sendlog',
	'usage': '[prefix]sendlog [thing to say in console]',
	'aliases': ['log', 'consolesay', 'devlog']
}

export async function cmd(message: Message, args: string[]){
	if(message.author.id == process.env.BOT_OWNERID){
		console.log(args.join(" "));
	}
	else null;
}