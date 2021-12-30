/** @type {import('@sveltejs/kit').RequestHandler} */

import fs from 'fs'

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

export async function get() {

    const file = fs.readFileSync('./fiveletterwords.json')

    // parse JSON string to JSON object
    const words = JSON.parse(file.toString());

    const randomNumber = randomIntFromInterval(0, Object.keys(words).length)
    
    const randomWord = words[randomNumber]

    return {
        body: {
            index: randomNumber,
            word: randomWord
        }
    }
}