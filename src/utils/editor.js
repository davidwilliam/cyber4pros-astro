export async function uploadImage(file) {
  console.log('Starting image upload process for file:', file.name);
  
  try {
    const res = await fetch('/api/upload-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: file.name, contentType: file.type })
    });

    if (!res.ok) {
      console.error('Failed to get upload URL, status:', res.status);
      throw new Error('Failed to get upload URL');
    }
    
    const { uploadUrl, publicUrl } = await res.json();
    console.log('Got upload URL:', uploadUrl);
    console.log('Public URL will be:', publicUrl);

    const uploadRes = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file
    });

    if (!uploadRes.ok) {
      console.error('Image upload failed, status:', uploadRes.status);
      throw new Error('Image upload failed');
    }

    const imageObject = { 
      src: publicUrl, 
      alt: file.name || 'Uploaded image' 
    };
    
    console.log('Image upload successful, returning:', imageObject);
    return imageObject;
  } catch (error) {
    console.error('Error in uploadImage function:', error);
    throw error;
  }
}

export async function saveSection(id, body, onSuccess = () => {}, onError = () => {}) {
  try {
    console.log('Saving section with ID:', id);
    console.log('Section data being sent:', JSON.stringify(body, null, 2));
    
    // Ensure image object has correct structure if present
    if (body.image) {
      if (typeof body.image === 'string') {
        body.image = { src: body.image, alt: 'Image' };
      } else if (typeof body.image === 'object') {
        if (!body.image.src) body.image.src = '';
        if (!body.image.alt) body.image.alt = '';
      }
    }
    
    const response = await fetch(`/api/sections/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Section saved successfully:', result);
      onSuccess(result);
    } else {
      console.error('Error saving section, server response:', result);
      onError(result.error || 'Failed to save changes.');
    }
  } catch (err) {
    console.error('Save error:', err);
    onError('Something went wrong while saving.');
  }
}
