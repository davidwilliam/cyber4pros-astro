// /src/pages/api/sections.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { db } from '~/utils/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { type, pageId } = await request.json();

    if (!type || !pageId) {
      return new Response(JSON.stringify({ error: 'Missing type or pageId' }), { status: 400 });
    }

    // Basic template data per section type
    const initialData: Record<string, any> = {
      hero: {
        title: 'Welcome to our site',
        subtitle: 'This is the hero section.',
        image: { src: '', alt: '' },
        actions: [],
      },
      features: {
        tagline: 'Why Choose Us',
        title: 'Our Features',
        subtitle: '',
        features: [],
      },
      bullets: {
        tagline: '',
        title: '',
        subtitle: '',
        items: [],
        image: { src: '', alt: '' },
        side: 'right',
      },
      team: {
        tagline: 'Leadership',
        title: 'Meet the Team',
        subtitle: '',
        members: [],
      },
      cta: {
        tagline: '',
        title: 'Ready to talk?',
        subtitle: 'Let\'s build something great.',
        actions: [],
      },
      numbers: {
        title: 'By the Numbers',
        stats: [],
      },
      features3: {
        title: 'More Features',
        subtitle: '',
        items: [],
      },
      numberedList: {
        title: '',
        subtitle: '',
        items: [],
      },
      largeCard: {
        title: 'Core Platform Capabilities',
        subtitle: 'Explore the building blocks of our secure, AI‑driven infrastructure.',
        items: [],
      },
      textBlocks: {
        blocks: [
          {
            title: 'Sample Title',
            body: '<p>This is an editable paragraph. You can format it with bold, italic, or links.</p>'
          }
        ]
      },
      form: {
        title: 'Submit Your Application',
        subtitle: 'Our HR team typically responds within 2 business days.',
        disclaimer: {
          label: 'By applying, you consent to Cyber4Pros collecting and using your information for recruitment purposes.'
        },
        footer: 'We value your privacy and will use your data solely to process your application.',
        recipient: '',
        fields: [
          { type: 'text', name: 'name', label: 'Full Name' },
          { type: 'email', name: 'email', label: 'Email Address' },
          { type: 'text', name: 'phone', label: 'Phone Number' },
          { type: 'text', name: 'address', label: 'Address' },
          { type: 'text', name: 'subject', label: 'Subject (enter "Job Wanted")' }
        ],
        textarea: {
          label: 'Qualifications & Experience'
        }
      },      
    };    

    const sectionData = initialData[type] ?? {};

    // Get the next order value for the page
    const result = await db.query(
      `SELECT MAX("order") as max_order FROM sections WHERE page_id = $1`,
      [pageId]
    );

    const nextOrder = (result.rows[0].max_order ?? 0) + 1;

    const insert = await db.query(
      `INSERT INTO sections (page_id, type, "order", data) VALUES ($1, $2, $3, $4) RETURNING id`,
      [pageId, type, nextOrder, sectionData]
    );

    return new Response(JSON.stringify({ id: insert.rows[0].id }), { status: 200 });
  } catch (err: any) {
    console.error('Error creating section:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};
