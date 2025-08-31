import React from 'react';

const Icon = ({ name, size = 24, className = '', ...props }) => {
  const [svgContent, setSvgContent] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadSvg = async () => {
      try {
        setLoading(true);
        setError(false);
        
        // Import the SVG file as a URL and fetch its content
        const svgModule = await import(`../../assets/icons/${name}.svg`);
        const svgUrl = svgModule.default;
        
        // Fetch the SVG content
        const response = await fetch(svgUrl);
        const svgText = await response.text();
        
        // Create a parser to extract the SVG content
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');
        
        if (svgElement) {
          // Extract viewBox and paths
          const viewBox = svgElement.getAttribute('viewBox');
          const paths = svgElement.querySelectorAll('path');
          const pathData = Array.from(paths).map(path => ({
            d: path.getAttribute('d'),
            fill: path.getAttribute('stroke') ? 'none' : 'currentColor',
            stroke: path.getAttribute('stroke') ? 'currentColor' : 'none',
            strokeWidth: path.getAttribute('stroke-width') || path.getAttribute('strokeWidth') || '1',
            strokeLinecap: path.getAttribute('stroke-linecap') || path.getAttribute('strokeLinecap') || 'butt',
            strokeLinejoin: path.getAttribute('stroke-linejoin') || path.getAttribute('strokeLinejoin') || 'miter',
            fillOpacity: path.getAttribute('fillOpacity') || path.getAttribute('fill-opacity') || '1'
          }));
          
          setSvgContent({ viewBox, paths: pathData });
        } else {
          throw new Error('Invalid SVG');
        }
        
        setLoading(false);
      } catch (err) {
        console.warn(`Icon "${name}" not found or invalid in assets/icons/ folder`);
        setError(true);
        setLoading(false);
        setSvgContent(null);
      }
    };

    loadSvg();
  }, [name]);

  if (error) {
    // Fallback: render a simple placeholder
    return (
      <div 
        className={`icon-wrapper icon-placeholder ${className}`} 
        style={{
          width: size,
          height: size,
          backgroundColor: 'currentColor',
          opacity: 0.3,
          borderRadius: '2px',
          display: 'inline-block'
        }}
        {...props}
      />
    );
  }

  if (loading || !svgContent) {
    // Loading state
    return (
      <div 
        className={`icon-wrapper icon-loading ${className}`} 
        style={{
          width: size,
          height: size,
          backgroundColor: 'currentColor',
          opacity: 0.1,
          borderRadius: '2px',
          display: 'inline-block'
        }}
        {...props}
      />
    );
  }

  return (
    <div className={`icon-wrapper ${className}`} {...props}>
      <svg
        width={size}
        height={size}
        viewBox={svgContent.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          display: 'block'
        }}
      >
        {svgContent.paths.map((pathData, index) => (
          <path
            key={index}
            d={pathData.d}
            fill={pathData.fill}
            stroke={pathData.stroke}
            strokeWidth={pathData.strokeWidth}
            strokeLinecap={pathData.strokeLinecap}
            strokeLinejoin={pathData.strokeLinejoin}
            fillOpacity={pathData.fillOpacity}
          />
        ))}
      </svg>
    </div>
  );
};

export default Icon;