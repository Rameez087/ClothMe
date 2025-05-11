import {connectToDB} from '../../lib/mongodb';


export default async function getHistory(req, res){
    try{
        const db = await connectToDB();
        userHistory = await db.collection('history').find({}).toArray();

        

    }catch(err){
        console.error(err)
    }
}