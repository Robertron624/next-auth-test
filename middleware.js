import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware (req, ev) {

        let pathName = req.nextUrl.pathname;
        let role = req.nextauth.token.role;

        console.log(pathName)
        console.log(role);
        
        if(pathName.startsWith("/CreateUser") && role != "admin"){
            return NextResponse.rewrite(new URL("/Denied", req.url));
        }
    },
    {callbacks: {
        authorized: ({token}) => !!token,
    }}
);

export const config = {
    matcher: ["/CreateUser"]
};