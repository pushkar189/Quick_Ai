//middleware to check userid and has premiuimplan

import { clerkClient } from "@clerk/express";//get user details from clerk

export const auth=async(req,res,next)=>{ //fuction to check if user has premium or not
    try {
        const { userId,has} = await req.auth();
        const hasPremiumPlan = await has({plan:'premium'});
        const user=await clerkClient.users.getUser(userId);  //user deatil from clerk
        if (!hasPremiumPlan&&user.privateMetadata.free_usage){
            req.free_usage=user.privateMetadata.free_usage
         } 
         else{
            await clerkClient.users.updateUser(userId, {
                privateMetadata: {
                    free_usage:0
         }
        })
        req.free_usage=0;
    }
    req.plan=hasPremiumPlan ? 'premium' : 'free'; //set plan to premium or free
    next();

    } catch (error) {
        res.json({success:false,message:error.message});
        
    }
}