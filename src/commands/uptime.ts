import { Message } from "discord.js";
import {bot, uptimeInt, calculateUptime} from '../index';

export let commandProps = {
	'name': 'uptime',
	'usage': '[prefix]uptime',
	'aliases': ['uptime']
}

export async function cmd(message: Message, args: string[]){
	const m = await message.channel.send(`:hourglass: Please wait...`) as Message;
	let newUptime = await calculateUptime(uptimeInt);
	return m.edit(`:clock1: The bot has been online for ${Math.floor(Math.floor(newUptime / 1000) / 60)} minutes.`);
}