import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const options = {
    providers: [
        GitHubProvider({
            profile(profile) {
                console.log("Profile Github: ", profile);
                let userRole = "Github User";

                if(profile?.email == "robert.624@hotmail.com")
                {
                    userRole = "Admin";
                }

                return  {
                    ...profile,
                    role: userRole,
                }
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            profile(profile) {
                console.log("Profile Google: ", profile);

                return  {
                    ...profile,
                    id: profile.sub,
                }
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            if(user) {
                token.role = user.role;
            }
            return token;
        },
        async session({session, token}) {
            if(session?.user) {
                session.user.role = token.role;
            }
            return session;
        },
    },

    pages: {
        signIn: '/auth/signin',
    },
    session: {
        jwt: true,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
}