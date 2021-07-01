import { Message } from "discord.js";
import {bot} from '../index';

export let commandProps = {
	'name': 'ping',
	'usage': '[prefix]ping',
	'aliases': ['debugping']
}

export async function cmd(message: Message, args: string[]){
	const m = await message.channel.send(`:hourglass: Please wait...`) as Message;
	let timeInBetween = m.createdTimestamp - message.createdTimestamp
	return m.edit(`:ping_pong: **PONG!** Command API Latency is ${timeInBetween} MS.`);
}