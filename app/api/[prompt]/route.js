import { connectToDB } from "@util/database";
import Prompt from '@models/prompt';

export const GET = async (req) => {

    try {
        await connectToDB();
        console.log("Posts are being fetched...");
        const prompts = await Prompt.find({}).populate('creator');
        console.log("Posts have been fetched,", prompts);
        return new Response(JSON.stringify(prompts), {status: 200} )
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch all prompts", {status: 500})
    }
}

export const revalidate = 10