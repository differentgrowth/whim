import { ImageResponse } from 'next/server';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'WHIM';
export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

// Image generation
const Image = async () => {

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={ {
          fontSize: 128,
          background: '#fafaf9',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0c0a09'
        } }
      >
        WHIM
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size
    }
  );
};

export default Image;