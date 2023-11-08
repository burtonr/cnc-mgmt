export function getSortedDesignData() {
    // TODO: This is a modified version of the tutorial "Posts" that uses .md files

    // TODO: Get all designs
    const designs = []; // Design meta data (title, date, etc)
    
    const allDesignsData = designs.map((design) => {
      const id = design.id;
  
      // Combine the data with the id
      return {
        id,
        ...design.data, // This is from the tutorial that uses gray-matter to parse markdown files
      };
    });

    // Sort designs by date
    return allDesignsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  }

export function getDesignIds() {
    // TODO: Call API to return all available designs
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    // 
    // Important: The returned list is not just an array of strings — it must be an array of objects that look like the comment above.
    // Each object must have the params key and contain an object with the id key (because we’re using [id] in the file name).
}

export function getDesignData(designId) {
    // TODO: Call API with designId to get details
}