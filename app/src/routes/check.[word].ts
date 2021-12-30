/** @type {import('@sveltejs/kit').RequestHandler} */

import fs from 'fs'
import { wordlist } from './word';

export async function get({params}) {

    const word = params['word'];

    // console.log(word)

    // const file = fs.readFileSync('fiveletterwords.json')

    // // parse JSON string to JSON object
    // const words = JSON.parse(file.toString());

    let match = false;

    for (const index in wordlist) {
        if (wordlist[index] === word) match = true;
    }

    return {
        status: match ? 200 : 400
    }
}