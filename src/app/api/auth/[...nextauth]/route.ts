
import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; 
import {User} from "@/models/User"
import {Papel} from "@/models/Papel";
import { sequelize } from "@/lib/sequelize";

interface CustomSession extends Session {
  user: {
    id: any;
    name: any;
    email: any;
    image: any;
    role:any,
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

        // verificação de authentication com db
        await sequelize.authenticate()
        await sequelize.sync()

        const user = await User.findOne({
          where: { email: credentials.email },
        });

        const papel = await Papel.findOne({
          where:{user_id:user?.id}
        })


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
          role:papel?.perfil
        };

       // console.log('users', users)
        return users;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3600, // Em segundos
  },
  jwt: {
    maxAge:3600, // Em segundos
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role 
      }
      return token;
    },
    async session({ session, token }) {
      let cus = session as CustomSession;
      if (token.role && session.user) {
        cus.user.id = token.id;
        cus.user.name = token.name;
        cus.user.email = token.email;
        cus.user.role = token.role as string
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
