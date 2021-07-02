import { Player } from "discord-player";
import { Message } from "discord.js";
import {bot, MusicPlayer} from '../index';

export let commandProps = {
	'name': 'play',
	'usage': '[prefix]play',
	'aliases': ['play', 'playmusic', 'playsong', 'p']
}

export async function cmd(message: Message, args: string[]){
	if(!message.member.voice.channel) return message.reply(`:x: You must be in a voice channel to do this command!`);
	if(!args.join(" ")) return message.reply(`:x: Invalid track name!`)
	
	if(MusicPlayer.isPlaying(message)){
		await MusicPlayer.play(message, args.join(" "), true);
		return message.reply(`:bookmark: Added to queue - First result of ${args.join(" ")}`)
	}
	await MusicPlayer.play(message, args.join(" "), true);
	message.reply(':musical_note: Playing ' + MusicPlayer.nowPlaying(message).title + ` (Duration: ${MusicPlayer.nowPlaying(message).duration}) ` + ' [URL: ' + MusicPlayer.nowPlaying(message).url + ']');
}