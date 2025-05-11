import { db } from '~/utils/db';
export const prerender = false;

export async function PUT({ params, request }) {
  const sectionId = parseInt(params.id, 10);
  if (isNaN(sectionId)) {
    return new Response(JSON.stringify({ error: 'Invalid section ID' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const data = await request.json();
    
    // Debug logging
    console.log('Received section data:', JSON.stringify(data, null, 2));
    
    // Ensure proper handling of the image object
    if (data.image && typeof data.image === 'object') {
      console.log('Image object detected:', data.image);
      
      // Make sure image object has proper src and alt properties
      if (!data.image.src) {
        data.image.src = '';
      }
      if (!data.image.alt) {
        data.image.alt = '';
      }
    }
    
    // Stringify with better error handling
    let dataJson;
    try {
      dataJson = JSON.stringify(data);
    } catch (jsonErr) {
      console.error('JSON stringify error:', jsonErr);
      console.error('Data causing error:', data);
      return new Response(JSON.stringify({ 
        error: 'Failed to process section data', 
        details: jsonErr.message 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await db.query(
      `UPDATE sections
       SET data = $1
       WHERE id = $2`,
      [dataJson, sectionId]
    );

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Section updated successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error updating section:', err);
    return new Response(JSON.stringify({ 
      error: 'Server error while saving section', 
      details: err.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export const DELETE = async ({ params }) => {
  const sectionId = Number(params.id);
  if (!sectionId) return new Response(JSON.stringify({ error: 'Invalid ID' }), { 
    status: 400,
    headers: { 'Content-Type': 'application/json' }
  });

  try {
    await db.query('DELETE FROM sections WHERE id = $1', [sectionId]);
    return new Response(JSON.stringify({ message: 'Section deleted' }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Failed to delete section', err);
    return new Response(JSON.stringify({ error: 'Failed to delete section' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};