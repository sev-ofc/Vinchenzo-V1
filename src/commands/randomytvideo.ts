import { Player } from "discord-player";
import { Message } from "discord.js";
import {bot, MusicPlayer} from '../index';
import youtube from 'youtube-random-video';

export let commandProps = {
	'name': 'randomytvideo',
	'usage': '[prefix]randomytvideo',
	'aliases': ['randomyoutubevid', 'randomyoutubevideo','randomvid', 'randomyt', 'randomytvid']
}

export async function cmd(message: Message, args: string[]){
    let apikey = process.env.YOUTUBE_API_KEY;
    youtube.getRandomVid(apikey, function(err , data){
        if(err){ 
            message.reply(":x: An error occured!");
            console.log(err);
            return;
        }
        console.log(data);
    })
}