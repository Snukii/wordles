/** @type {import('@sveltejs/kit').RequestHandler} */

import fs from 'fs'

export async function get({params}) {

    const word = params['word'];

    // console.log(word)

    const file = fs.readFileSync('fiveletterwords.json')

    // parse JSON string to JSON object
    const words = JSON.parse(file.toString());

    let match = false;

    for (const index in words) {
        if (words[index] === word) match = true;
    }

    return {
        status: match ? 200 : 400
    }
}