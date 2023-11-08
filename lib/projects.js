export function getSortedProjectData() {
    // TODO: This is a modified version of the tutorial "Posts" that uses .md files

    // TODO: Get all projects
    const projects = []; // Project meta data (title, date, etc)
    
    const allProjectsData = projects.map((project) => {
      const id = project.id;
  
      // Combine the data with the id
      return {
        id,
        ...project.data, // This is from the tutorial that uses gray-matter to parse markdown files
      };
    });

    // Sort projects by date
    return allProjectsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  }

export function getProjectIds() {
    // TODO: Call API to return all available projects
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

export function getProjectData(projectId) {
    // TODO: Call API with projectId to get details
}