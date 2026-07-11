
import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import {v2 as cloudinary} from 'cloudinary';
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import pdf from 'pdf-parse/lib/pdf-parse.js'; 


const AI = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

export const generateArticle=async(req,res)=>{
    try {
        
        const {userId}=await req.auth(); //Clerk confirms which user is making the request.
        const {prompt,length}= req.body;
        const plan=req.plan;
        const free_usage=req.free_usage;
if(plan!=='premium'&& free_usage>=10){
            return res.json({success:false,message:'You have reached your free usage limit. Please upgrade to premium.'});
        }

   const response = await AI.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
        {
            role: "user",
            content: prompt,
        },

    ],
    temperature:0.7,
    max_tokens:length,
    
});

const content=response.choices[0].message.content;

await sql `INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId},${prompt}, ${content}, 'article')`;
if(plan!=='premium'){
    await clerkClient.users.updateUserMetadata(userId,{
        privateMetadata:{
            free_usage:free_usage+1
        }
    })
}
res.json({success:true,content});

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }

}


export const generateblogtitle=async(req,res)=>{
    try {
        
        const {userId}=await req.auth(); //Clerk confirms which user is making the request.
        const {prompt}= req.body;
        const plan=req.plan;  
        const free_usage=req.free_usage;
if(plan!=='premium'&& free_usage>=10){
            return res.json({success:false,message:'You have reached your free usage limit. Please upgrade to premium.'});
        }

const response = await AI.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
        {
            role: "user",
            content: prompt,
        },

    ],
    temperature:0.7,
    max_tokens:100,
    
});

const content=response.choices[0].message.content;

await sql `INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId},${prompt}, ${content}, 'blog-title')`;
if(plan!=='premium'){
    await clerkClient.users.updateUserMetadata(userId,{
        privateMetadata:{
            free_usage:free_usage+1
        }
    })
}
res.json({success:true,content});

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }

}

export const generateImage=async(req,res)=>{
    try {
        
        const {userId}=await req.auth(); //Clerk confirms which user is making the request.
        const {prompt,publish}= req.body;
        const plan=req.plan;
        
 if(plan!=='premium'){
            return res.json({success:false,message:'This feature is only available for premium subscribers'});
        }

const formData = new FormData()
formData.append('prompt', prompt)

const {data}= await axios.post("https://clipdrop-api.co/text-to-image/v1",formData,{
    headers:{'x-api-key':process.env.CLIPDROP_API_KEY},
    responseType: 'arraybuffer'
})

const base64image=`data:image/png;base64,${Buffer.from(data,'binary').
    toString('base64')}`;                     //Converts the binary image to a base64 data URL.

    //cloudinary config
   const {secure_url}= await cloudinary.uploader.upload(base64image)
      

//You’re sending a prompt to an AI API, getting an image back, converting it into a 
// format that Cloudinary accepts, and then uploading it to get a public URL.


await sql `INSERT INTO creations (user_id, prompt, content, type,publish) VALUES (${userId},${prompt}, ${secure_url}, 'image',${publish ?? false})`;

res.json({success:true,content:secure_url});

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }

}

export const removeimagebackground=async(req,res)=>{
    
    try {
        
        const {userId}=req.auth(); //Clerk confirms which user is making the request.
       
        const image = req.file;
        const plan=req.plan;
        
         if(plan!=='premium'){
        return res.json({success:false,message:
        'This feature is only available for premium subscribers'});
        }

   
      const{secure_url}=await cloudinary.uploader.upload(image.path,{
        transformation:[{
            resource_type:'image',
            effect:'background_removal'
            
        }]
      })
console.log(secure_url);
//placeholder variable is ${...}
await sql `INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId},'Remove background from image', ${secure_url}, 'image')`;

res.json({success:true,content:secure_url});

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }

}

export const removeimageobject=async(req,res)=>{
    try {
        
        const {userId}=await req.auth(); //Clerk confirms which user is making the request.
       const {object}=await req.body;
        const image= req.file;
        const plan=req.plan;
        
        if(plan!=='premium'){
        return res.json({success:false,message:
        'This feature is only available for premium subscribers'});
        }

   
   const {public_id}= await cloudinary.uploader.upload(image.path)

   const imageurl=cloudinary.url(public_id,{
    transformation:[{effect:`gen_remove:${object}`}],
    resource_type:'image'
   })




await sql `INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId},${`Removed ${object} from image`}, ${imageurl}, 'image')`;

res.json({success:true,content:imageurl});

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }

}

export const resumereview=async(req,res)=>{
    try {
        
        const {userId}=await req.auth(); //Clerk confirms which user is making the request.
        const resume= req.file;
        const plan=req.plan;
        
        if(plan!=='premium'){
        return res.json({success:false,message:
        'This feature is only available for premium subscribers'});
        }

   
  if(resume.size>5*1024*1024){
    return res.json({success:false,message:'Resume size exceeds 5MB limit. Please upload a smaller file.'});
  }
      
  const databuffer=fs.readFileSync(resume.path);
  const pdfData=await pdf (databuffer);

  const prompt=`Review the resume and provide constructive feedback on its strengths,weakness ,
   and areas for improvement.Resume Content:\n\n${pdfData.text}`;


 const response = await AI.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
        {
            role: "user",
            content: prompt,
        },

    ],
    temperature:0.7,
    max_tokens:1000,
    
});

const content=response.choices[0].message.content;

await sql `INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId},'Review the uploaded resume', ${content}, 'resume-review')`;

res.json({success:true,content});

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }
}
