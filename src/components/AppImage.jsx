import React from 'react';

function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) {

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><rect width="150" height="150" fill="%23e5e7eb"/><text x="75" y="80" font-family="sans-serif" font-size="12" fill="%236b7280" text-anchor="middle">No Image</text></svg>')}`;
      }}
      {...props}
    />
  );
}

export default Image;
