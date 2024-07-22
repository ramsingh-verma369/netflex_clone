
import { fetchFromTBDB } from "../services/tmdb.service.js"

export const getTrendingTv = async (req,res) =>{
    try {
        const data = await fetchFromTBDB('https://api.themoviedb.org/3/trending/tv/day?language=en-US');
        const randomMovie=data.results[Math.floor(Math.random() * data.results?.length)];

        res.json({
            success:true,
            content: randomMovie
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Internal Server Error"
        })
    }

}

export const getTvTrailers = async (req,res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTBDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.json({ success: true, trailers: data.results})
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
        
    }
}


export const getTvDetails = async (req,res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTBDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(400).send(null);
        }
        return res.status(500).json({ success: false, message: "Internal Server Error"})
    }
}

export const getSimilarTvs = async (req,res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTBDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
        res.status(200).json({ success: true, similar: data.results})
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}

export const getTvsByCategory = async (req,res) => {
    const { category } = req.params;
    try {
        const data = await fetchFromTBDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(200).json({success: true, content: data.results });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}