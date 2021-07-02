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
	let msg = `:book: **Bot Queue**\nCurrently Playing: ${MusicPlayer.nowPlaying(message).title}`
	
	let i = 1
	thisQueue.tracks.forEach(async track => {
		if(i - 1 == thisQueue.tracks.length) return message.reply(msg)
		msg.concat(`\n${i}: ${track.title} [${track.duration}]`)
		i++
	})

}