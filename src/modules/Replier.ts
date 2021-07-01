import * as fs from 'fs';
import * as Discord from 'discord.js';
import glob from 'glob';
import Pair from '../util/Pair';

export class ReplierModule {
	dictionary: Map<string[], string>;
	dmDictionary: Map<string[], string>;

	constructor(dictionary: Map<string[], string>, dmDictionary: Map<string[], string>){
		this.dictionary = dictionary;
		this.dmDictionary = dmDictionary;
		console.log('[REPLIER] Replier Module Initiated')
	}

	async checkReply(message: string){
		let replyMSG;
		this.dictionary.forEach(async (response, emitters) => {
			emitters.forEach(emitter => {
				if(message.toLowerCase().includes(emitter.toLowerCase())) replyMSG = response;
			})
		})
		return replyMSG;
	}

	async checkDMReply(message){
		let replyMSG;
		this.dmDictionary.forEach(async (response, emitters) => {
			if(emitters.includes(message.toLowerCase())) replyMSG = response;
		})
		return replyMSG;
	}
}