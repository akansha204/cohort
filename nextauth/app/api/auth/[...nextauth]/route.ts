import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "email",
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const username = credentials?.username;
            const password = credentials?.password;
            console.log(username);
            console.log(password);
            // Add logic here to look up the user from the credentials supplied
            const user = { name: "J Smith", id: "1", username: "jsmith@example.com" }
      
            if (user) {
              return user
            } else {
              return null
            }
          }
        }),

        GoogleProvider({
            clientId: "xmksm",
            clientSecret: "cdnknk"
          })
      ]
})

export { handler as GET, handler as POST }