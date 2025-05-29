// # VolleyDevByMaubry [V1/1] "Image: a silent storyteller, a window to another world framed in pixels."
import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string; // src is mandatory
  // Custom style-related props that are not standard for <img> tag
  bgColor?: string;
  textColor?: string; // Less common for img, but if text is overlaid or for alt text styling by browser
  rounded?: string;
  shadow?: string;
  align?: string; // align is deprecated on img, use CSS (handled by text-align on parent or margin auto)
  padding?: string; // padding is via style/className
  margin?: string;  // margin is via style/className
}

export default function Image(props: ImageProps) {
  const {
    // Destructure our custom props to prevent them from being spread onto the <img> element
    bgColor,
    textColor,
    rounded,
    shadow,
    align, // align is not a valid img attribute, handled by classes/style if needed
    padding,
    margin,
    // Standard ImgHTMLAttributes handled separately or part of ...restImgProps
    src, // src is explicitly used
    alt = '', // Default alt text
    className = '',
    // style, // style from props will be merged if passed by renderer
    ...restImgProps // Should now mostly contain valid <img> attributes
  } = props;

  if (!src) {
    // Renderer already handles this, but as a safeguard in the component too.
    return <div className="text-red-500 text-sm">[Image: Missing src]</div>;
  }

  const baseClasses = 'inline-block my-1 align-middle max-w-full h-auto';

  // Note: className from props (derived from general styling attributes) is applied.
  // Style from props (derived from general styling attributes) is also applied by spreading restImgProps if it includes 'style'.
  // If specific width/height HTML attributes are in restImgProps, they will be applied.
  // If width/height CSS styles are in props.style, they will also be applied.
  return (
    <img
      src={src}
      alt={alt}
      {...restImgProps} 
      className={`${baseClasses} ${className}`}
    />
  );
}
