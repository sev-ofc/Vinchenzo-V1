import { Message } from "discord.js";
import {bot, uptimeInt, calculateUptime} from '../index';

export let commandProps = {
	'name': 'stats',
	'usage': '[prefix]stats',
	'aliases': ['statistics']
}

export async function cmd(message: Message, args: string[]){
	const m = await message.channel.send(`:hourglass: Please wait...`) as Message;
	let newUptime = await calculateUptime(uptimeInt);
	let timeInBetween = m.createdTimestamp - message.createdTimestamp
	let uptimeInMinutes = Math.floor(Math.floor(newUptime / 1000) / 60)
	return m.edit(`:information_source: **Bot Stats**\n\n:globe_with_meridians: Server Count: **${bot.guilds.cache.size}**\n:ping_pong: Bot Ping: **${timeInBetween} MS**\n:clock1: Uptime: **${uptimeInMinutes} Minutes**`);
}