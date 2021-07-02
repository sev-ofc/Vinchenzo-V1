import { Player } from "discord-player";
import { Message, MessageEmbed } from "discord.js";
import {bot, MusicPlayer} from '../index';

export let commandProps = {
	'name': 'removeitem',
	'usage': '[prefix]removeitem',
	'aliases': ['remove', 'canceltrack', 'deltrack', 'deleteitem']
}

export async function cmd(message: Message, args: string[]){
	function remove(array, element) {
		const index = array.indexOf(element);
		array.splice(index, 1);
	  }

	let thisQueue = await MusicPlayer.getQueue(message);
	if(!args[0] ||! parseInt(args[0])) return message.reply(`:x: Invalid number item to remove!`);
	let trackToRemove = parseInt(args[0]) - 1;
	let trRemove = MusicPlayer.getQueue(message).tracks[trackToRemove]
	if(!trRemove) return message.reply(`:x: Invalid index!`);
	MusicPlayer.getQueue(message).tracks.splice(trackToRemove, 1);
	return message.reply(`:white_check_mark: Removed item #${trackToRemove + 1} - **${trRemove.title} (${trRemove.duration})** from queue`);

}