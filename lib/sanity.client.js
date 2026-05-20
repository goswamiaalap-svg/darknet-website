import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
// Sanity project IDs must be alphanumeric plus dashes
const isValid = rawProjectId && /^[a-z0-9-]+$/i.test(rawProjectId) && rawProjectId !== 'your_project_id';
const projectId = isValid ? rawProjectId : 'abc123de';

export const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
