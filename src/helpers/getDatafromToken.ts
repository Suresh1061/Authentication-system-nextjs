import { NextRequest } from 'next/server'
import jwt from "jsonwebtoken"

export const getDataFromToken = (req: NextRequest) => {
try {
        console.log(req.cookies)
        const token = req.cookies.get('token')?.value || ""
    
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!)
        console.log(decodedToken);
    
        return decodedToken.id
} catch (error:any) {
    throw new Error(error.message)
}
}