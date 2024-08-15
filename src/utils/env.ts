
import { z } from 'zod';

const envSchema = z.object({
    DISCORD_TOKEN: z.string(),
    DISCORD_CLIENT_ID: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);