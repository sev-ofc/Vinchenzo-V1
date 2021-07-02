import { Player } from "discord-player";
import { Message } from "discord.js";
import {bot, MusicPlayer} from '../index';

export let commandProps = {
	'name': 'nowplaying',
	'usage': '[prefix]nowplaying',
	'aliases': ['playing', 'currenttrack']
}

export async function cmd(message: Message, args: string[]){
	if(!MusicPlayer.isPlaying(message)){
		return message.reply(`:x: Not currently playing anything!`)
	}
	message.reply(':musical_note: Currently Playing ' + MusicPlayer.nowPlaying(message).title + ` (Duration: ${MusicPlayer.nowPlaying(message).duration}) ` + ' [URL: ' + MusicPlayer.nowPlaying(message).url + ']');
}