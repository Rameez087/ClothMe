import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "../../../lib/mongodb";



export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {        
        const db = await connectToDB();
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ 
          email: credentials.email,
          password: credentials.password 
        });
        


        // Return user if found, null otherwise
        if (user) {
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || user.email.split("@")[0]
          };
        }
        
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    // No additional encryption, using default
  },
  // using a simple secret
  secret: "any-string-will-work-in-development",
  // no custom pages required
  pages: {
    signIn: '/login'
  },
  // Debug mode for development
  debug: true
});