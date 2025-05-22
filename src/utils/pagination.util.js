export const getPagination = (page = 1, limit = 10) => {
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
  
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;
  
    const skip = (page - 1) * limit;
    return { page, limit, skip };
  };
  
  /**
   * Build a standard paginated response
   */
  export const buildPaginatedResponse = ({ docs, total, page, limit }) => ({
    docs,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    totalDocs: total,
  });  