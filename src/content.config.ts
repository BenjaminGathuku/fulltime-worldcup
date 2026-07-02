import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(165), // meta description
    category: z.string(),
    pubDate: z.coerce.date(),
    readMins: z.number().default(5),
    excerpt: z.string(),
    author: z.string().default('Benjamin Gathuku'),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    heroCredit: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    faq: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .optional(),
    related: z
      .array(z.object({ text: z.string(), slug: z.string() }))
      .optional(),
  }),
});

export const collections = { articles };
