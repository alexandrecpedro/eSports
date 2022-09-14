/** Import libraries **/
import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

/** CREATE APPLICATION **/
// Express connection
const app = express();
// Make express 'understand' that we use json
app.use(express.json());
// Protection for non-desirable access (Allow some frontends access)
app.use(cors({
    // origin: url
}));
// Link with Prisma
const prisma = new PrismaClient({
    // Logs that Prisma will do
    log: ['query']
});

/** ROUTES **/
// HTTP Methods / API RESTful / HTTP Codes

// Listing of games with ad count
app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        // including ads (quantity)
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    });
    return response.json(games);
});

// Generate new ad
// Ps.1: every resource is used as a plural inside routes
app.post('/games/:id/ads', async (request, response) => {
    // Get gameId from params
    const gameId = request.params.id;
    // Get game body
    const body: any = request.body;

    // Registering a game
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name, 
            yearsPlaying: body.yearsPlaying, 
            discord: body.discord,
            weekDays: body.weekDays.join(','), 
            hourStart: convertHourStringToMinutes(body.hourStart), 
            hourEnd: convertHourStringToMinutes(body.hourEnd), 
            useVoiceChannel: body.useVoiceChannel
        }
    });

    return response.status(201).json(ad);
});

// List ads per game
/* Ps.2: Params (available at url)
    => Query Params = define states (comes after "?"), everytime named
    => Route Params = known as we look at url
    => Body Params
*/
app.get('/games/:id/ads', async (request, response) => {
    // Search gameId from a the database
    const gameId = request.params.id;
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            yearsPlaying: true,
            weekDays: true,
            hourStart: true,
            hourEnd: true,
            useVoiceChannel: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc',
        }
    });

    // Format each ad before return
    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd)
        }
    }));
});

// Search the Discord based on adId
app.get('/ads/:id/discord', async (request, response) => {
    // Search gameId from a the database
    const adId = request.params.id;
    // Search discord
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    });

    return response.json({
        discord: ad.discord,
    });
});

/** PORT **/
// Port where the previous route is running
app.listen(3333);