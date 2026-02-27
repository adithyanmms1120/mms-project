/**
 * Pagination SEO Helper
 * Generates canonical URLs and rel=next/prev meta tags for paginated content
 */

export interface PaginationMeta {
  canonical: string;
  relNext?: string;
  relPrev?: string;
  xDefault?: string;
}

/**
 * Get pagination meta tags for paginated content
 * @param currentPage - Current page number (1-indexed)
 * @param totalPages - Total number of pages
 * @param baseUrl - Base URL without query params (e.g., '/blog/' or '/blog/category/news/')
 * @returns Object with canonical, relNext, relPrev URLs
 */
export function getPaginationMeta(
  currentPage: number,
  totalPages: number,
  baseUrl: string
): PaginationMeta {
  // Ensure baseUrl ends with /
  const url = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  
  // Page 1 should have canonical without ?page param
  const canonical = currentPage === 1 
    ? url 
    : `${url}?page=${currentPage}`;

  const result: PaginationMeta = {
    canonical,
    xDefault: url // Always point first page for hreflang x-default
  };

  // Add rel="next" if not on last page
  if (currentPage < totalPages) {
    result.relNext = `${url}?page=${currentPage + 1}`;
  }

  // Add rel="prev" if not on first page
  if (currentPage > 1) {
    result.relPrev = currentPage === 2 
      ? url // Second page's prev should point to page 1 without ?page param
      : `${url}?page=${currentPage - 1}`;
  }

  return result;
}

/**
 * Helper to determine if page should be indexed
 * @param currentPage - Current page number
 * @param config - Configuration object
 * @returns true if page should be indexed
 */
export function shouldIndexPage(
  currentPage: number,
  config?: { maxPaginatedPages?: number }
): boolean {
  // Google typically indexes up to 50 pages, but common limit is 20-30
  const maxPages = config?.maxPaginatedPages ?? 25;
  return currentPage <= maxPages;
}

/**
 * Generate URL for a paginated page
 * @param baseUrl - Base URL
 * @param page - Page number
 * @returns Full URL with query parameter if page > 1
 */
export function getPaginatedUrl(baseUrl: string, page: number): string {
  const url = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return page === 1 ? url : `${url}?page=${page}`;
}
