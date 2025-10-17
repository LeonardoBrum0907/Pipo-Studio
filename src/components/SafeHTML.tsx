import DOMPurify from 'isomorphic-dompurify';

interface SafeHTMLProps {
  html: string;
  className?: string;
  allowedTags?: string[];
  allowedAttributes?: string[];
}

export function SafeHTML({ 
  html, 
  className,
  allowedTags = ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  allowedAttributes = ['href', 'class', 'id', 'target']
}: SafeHTMLProps) {
  const sanitizeConfig = {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: allowedAttributes,
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ['target'],
    FORBID_TAGS: ['script', 'style', 'iframe', 'form', 'input'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick'],
  };

  const sanitizedHTML = DOMPurify.sanitize(html, sanitizeConfig);

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      className={className}
    />
  );
}
