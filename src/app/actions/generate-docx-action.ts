
'use server';

import htmlToDocx from 'html-to-docx';

export async function generateDocx(htmlString: string): Promise<string> {
  try {
    // Remove the body and html tags for html-to-docx
    const content = htmlString.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] || htmlString;

    const fileBuffer = await htmlToDocx(content, undefined, {
      font: 'Arial',
      fontSize: 12,
    });

    if (fileBuffer instanceof Buffer) {
      return fileBuffer.toString('base64');
    }

    // Handle Blob case for different environments, convert to Buffer
    if (fileBuffer instanceof Blob) {
        const arrayBuffer = await fileBuffer.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return buffer.toString('base64');
    }

    throw new Error('Unexpected file buffer type');

  } catch (error) {
    console.error('Error generating DOCX on server:', error);
    throw new Error('Failed to generate Word document.');
  }
}

    