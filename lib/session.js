//creates a session for accessing userinfo in other pages

import { withIronSession } from 'next-iron-session'

export default function withSession(handler){
    return withIronSession(handler,{ 
        password: '2gyZ3GDw3LHZQKDhPmPDL3sjREVRXPr8',
        cookieName: 'cookie',
        cookieOptions:{
            maxAge: 60 * 60 * 24 * 30, // 30 days
            secure: process.env.NODE_ENV === 'production' ? true : false,
        }
    })
}