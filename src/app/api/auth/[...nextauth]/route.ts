
import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // Para criptografar senhas
import {sequelize} from '@/lib/sequelize'
import {setupAssociations} from "@/lib/associations"
import User from "@/models/User"

interface CustomSession extends Session {
  user: {
    id: any;
    name: any;
    email: any;
    image: any;
  };
  expires: any;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          console.log("credencials vazias");
          return null;
        }

        // Verificar se o usuário existe no banco de dados
        await sequelize.authenticate()
        await sequelize.sync()
        setupAssociations()
        const user = await User.findOne({
          where: { email: credentials.email },
        });


        if (!user) {
          console.log("usuario inexistente");
          return null;
        }

        // Verificar senha
        const senhaValida = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!senhaValida) {
          console.log("senha incorreta");
          return null;
        }

        const users = {
          id: user.id,
          name: `${user.primeiro_nome} ${user.segundo_nome}`,
          email: credentials.email,
        };
        return users;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 300, // Em segundos
  },
  jwt: {
    maxAge:300, // Em segundos
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      let cus = session as CustomSession;
      if (token) {
        cus.user.id = token.id;
        cus.user.name = token.name;
        cus.user.email = token.email;
      }
      return cus;
    },
  },
  pages: {
    signIn: "/",
    error: "/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
