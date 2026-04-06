import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | undefined> {
    try {
        // Ensure role column exists for older databases
        await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'customer'`;
        const user = await sql<User[]>`SELECT id, name, email, password, role FROM users WHERE email=${email}`;
        return user[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const isBcryptHash =
                        user.password.startsWith('$2a$') ||
                        user.password.startsWith('$2b$') ||
                        user.password.startsWith('$2y$');
                    let passwordsMatch = false;
                    if (isBcryptHash) {
                        passwordsMatch = await bcrypt.compare(password, user.password);
                    } else {
                        // Legacy plaintext password fallback: migrate to bcrypt on successful login
                        passwordsMatch = password === user.password;
                        if (passwordsMatch) {
                            const newHash = await bcrypt.hash(password, 10);
                            await sql`UPDATE users SET password = ${newHash} WHERE id = ${user.id}`;
                        }
                    }
                    if (passwordsMatch) {
                        const { password: _password, ...userWithoutPassword } = user;
                        return userWithoutPassword;
                    }
                }
                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});
