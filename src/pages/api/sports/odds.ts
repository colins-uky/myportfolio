import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

const apiKey = process.env.ODDS_API_KEY;

const regions = 'us'; // uk | us | eu | au. 
                     //  Multiple can be specified if comma delimited

const markets = 'h2h'; // h2h | spreads | totals.

const oddsFormat = 'decimal'; // decimal | american

const dateFormat = 'iso'; // iso | unix

const sportKey = 'upcoming';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    
    axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
    params: {
        apiKey,
        regions,
        markets,
        oddsFormat,
        dateFormat,
    }
})
.then(response => {
    // response.data.data contains a list of live and 
    //   upcoming events and odds for different bookmakers.
    // Events are ordered by start time (live events are first)
    console.log(JSON.stringify(response.data));

    // Check your usage
    console.log('Remaining requests',response.headers['x-requests-remaining']);
    console.log('Used requests',response.headers['x-requests-used']);

    res.status(200).json(response.data);

})
.catch(error => {
    if (error.response) {
        console.log('Error status', error.response.status);
        console.log(error.response.data);
    }
    else {
        console.log('ERROR', error.message);
    }
    
})


}