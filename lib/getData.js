import eventsData from '../data/events.json';
import chaptersData from '../data/chapters.json';
import blogData from '../data/blog.json';
import resourcesData from '../data/resources.json';

// Try Sanity first, fall back to mock data
import { client } from './sanity.client';

export async function getFeaturedEvents() {
  try {
    const data = await client.fetch(
      `*[_type=="event" && featured==true] | order(startDate asc) {
        _id, name, tagline, "slug": slug.current, startDate, endDate, eventType,
        chapter->{ name }, location->{ name },
        "heroImage": image[0]{ alt, caption, asset, crop, hotspot }
      }`, {}, { next: { revalidate: 300 } }
    );
    if (data && data.length > 0) return data;
  } catch {}
  return eventsData.filter(e => e.featured).map(normalizeEvent);
}

export async function getEvents() {
  try {
    const data = await client.fetch(
      `*[_type=="event"] | order(startDate asc) {
        _id, name, tagline, featured, "slug": slug.current, startDate, endDate,
        eventType, status, category, domains, skillLevel,
        chapter->{ name }, location->{ name },
        "heroImage": image[0]{ alt, caption, asset, crop, hotspot }
      }`, {}, { next: { revalidate: 300 } }
    );
    if (data && data.length > 0) return data;
  } catch {}
  return eventsData.map(normalizeEvent);
}

export async function getEventBySlug(slug) {
  try {
    const data = await client.fetch(
      `*[_type=="event" && slug.current==$slug][0]{
        _id, name, tagline, "slug": slug.current, startDate, endDate, eventType, status,
        category, domains, skillLevel, description, virtualLink,
        stats { registrations, attendance, projects },
        program[]{ time, title, description },
        speakers[]->{ name, company, profiles },
        chapter->{ name, "slug": slug.current },
        location->{ name },
        "heroImage": image[0]{ alt, caption, asset, crop, hotspot }
      }`, { slug }
    );
    if (data) return data;
  } catch {}
  const event = eventsData.find(e => e.slug === slug);
  return event ? normalizeEvent(event) : null;
}

export async function getChapters() {
  try {
    const data = await client.fetch(
      `*[_type=="chapter"]{ _id, name, "slug": slug.current, "location": location->name, image }`
    );
    if (data && data.length > 0) return data;
  } catch {}
  return chaptersData.map(normalizeChapter);
}

export async function getChapterBySlug(slug) {
  try {
    const data = await client.fetch(
      `*[_type=="chapter" && slug.current==$slug][0]{ _id, name, "slug": slug.current, "location": location->name, image }`,
      { slug }
    );
    if (data) return data;
  } catch {}
  const chapter = chaptersData.find(c => c.slug === slug);
  return chapter ? normalizeChapter(chapter) : null;
}

export async function getEventsByChapterId(id) {
  try {
    const data = await client.fetch(
      `*[_type=="event" && chapter._ref==$chapterId] | order(startDate asc) {
        _id, name, tagline, "slug": slug.current, featured, startDate, endDate,
        eventType, status, category, domains, skillLevel,
        chapter->{ name, "slug": slug.current }, location->{ name },
        "heroImage": image[0]{ alt, caption, asset, crop, hotspot }
      }`, { chapterId: id }
    );
    if (data) return data;
  } catch {}
  // For mock data, match by chapter slug embedded in the id
  const chapter = chaptersData.find(c => c.id === id || c.slug === id);
  if (!chapter) return [];
  return eventsData
    .filter(e => e.chapter?.slug === chapter.slug)
    .map(normalizeEvent);
}

export async function getEventsByChapterSlug(slug) {
  return eventsData.filter(e => e.chapter?.slug === slug).map(normalizeEvent);
}

// Blog
export async function getAllBlogs() {
  try {
    const data = await client.fetch(
      `*[_type=="blog"] | order(publishedAt desc) {
        _id, title, "slug": slug.current, publishedAt, mainImage, author->{ name }
      }`
    );
    if (data && data.length > 0) return data;
  } catch {}
  return blogData;
}

export async function getBlogBySlug(slug) {
  try {
    const data = await client.fetch(
      `*[_type=="blog" && slug.current==$slug][0]{ _id, title, "slug": slug.current, publishedAt, mainImage, body, author->{ name, image, bio } }`,
      { slug }
    );
    if (data) return data;
  } catch {}
  return blogData.find(b => b.slug === slug) || null;
}

// Resources
export async function getResources() {
  return resourcesData;
}

export async function getFeedbackByEvent() { return []; }
export async function getSuccessStoriesByEvent() { return []; }
export async function getSponsorsByEvent() { return []; }
export async function getMembers() { return []; }

// Normalizers
function normalizeEvent(e) {
  return {
    _id: e.id,
    name: e.name,
    slug: e.slug,
    tagline: e.tagline,
    eventType: e.eventType,
    status: e.status,
    category: e.category,
    skillLevel: e.skillLevel,
    featured: e.featured,
    startDate: e.startDate,
    endDate: e.endDate,
    domains: e.domains || [],
    description: e.description || '',
    stats: e.stats,
    program: e.program || [],
    speakers: e.speakers || [],
    chapter: e.chapter,
    location: e.location,
    heroImage: e.image ? { url: e.image } : null,
  };
}

function normalizeChapter(c) {
  return {
    _id: c.id,
    name: c.name,
    slug: c.slug,
    location: c.location,
    description: c.description,
    memberCount: c.memberCount,
    eventCount: c.eventCount,
    established: c.established,
    image: c.image ? { url: c.image } : null,
  };
}
