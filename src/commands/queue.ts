import { Player } from "discord-player";
import { Message, MessageEmbed } from "discord.js";
import {bot, MusicPlayer} from '../index';

export let commandProps = {
	'name': 'queue',
	'usage': '[prefix]queue',
	'aliases': ['songlists', 'listtracks', 'alltracks', 'q']
}

export async function cmd(message: Message, args: string[]){
	let thisQueue = await MusicPlayer.getQueue(message);
	let msg = `:book: **Bot Queue [First 10 Items]**\nCurrently Playing: ${MusicPlayer.nowPlaying(message).title}`
	let i = 1
	thisQueue.tracks.forEach(async track => {
		if(thisQueue.tracks[0] !== track){
			msg = msg.concat(`\n${i}: ${track.title} [${track.duration}]`);
			i++
		}
		if(i == 10) return;
	})
	return message.reply(msg)

}