import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";

// Simple MongoDB connection
async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/clothme");
  return client;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Connect to database
        const client = await connectToDatabase();
        const db = client.db();
        const usersCollection = db.collection("users");

        // Find user by email (simple version - no password hashing)
        const user = await usersCollection.findOne({ 
          email: credentials.email,
          password: credentials.password // Plain text comparison
        });
        
        // Close database connection
        client.close();

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
  // Use JWT but with minimal security
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    // No additional encryption, using default
  },
  // Skip using a strong secret
  secret: "any-string-will-work-in-development",
  // No custom pages required
  pages: {
    signIn: '/login'
  },
  // Debug mode for development
  debug: true
});