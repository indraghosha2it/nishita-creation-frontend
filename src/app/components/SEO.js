// app/components/SEO.js
import Head from 'next/head';

export default function SEO({ 
  title, 
  description, 
  keywords = [],
  image,
  url,
  publishedTime,
  author,
  type = 'website'
}) {
  const siteTitle = "Asian Clothify";
  const fullTitle = title ? `${title} || ${siteTitle}` : siteTitle;
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const ogImage = image || '/og-image.jpg';

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Article specific */}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {author && <meta name="author" content={author} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Head>
  );
}