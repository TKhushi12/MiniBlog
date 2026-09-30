import Post from '../models/Post.js';

export const samplePosts = [
  {
    title: 'Architecting MERN Applications for High-Concurrency & Performance',
    category: 'Software Architecture',
    author: 'Khushi Tyagi',
    coverColor: 'stone',
    isFeatured: true,
    likes: 42,
    tags: ['Node.js', 'MongoDB', 'Architecture', 'Performance'],
    content: `When building applications with Node.js and MongoDB, the temptation is always to start coding endpoints immediately without considering how the data layer behaves under stress.

### 1. The Cost of Over-fetching
In traditional relational models, developers normalize every table and rely on heavy SQL joins. But in document stores like MongoDB, embedding related sub-documents rather than splitting into 5 collections often yields a 10x read improvement.

### 2. Micro-Aggregations Over In-Memory Filtering
One classic pitfall in full-stack engineering is fetching 1,000 documents into the Node.js event loop and running JavaScript \`.filter()\` or \`.reduce()\`. By pushing transformation logic into MongoDB's native \`$group\` and \`$match\` aggregation pipelines, the CPU workload shifts to the database engine where it belongs.

### 3. Graceful Database Decoupling
Always build resilient fallback mechanisms. If your cloud cluster suffers temporary connection timeouts, your backend should fail over cleanly or utilize caching layers rather than throwing unhandled promise rejections to the client.`,
  },
  {
    title: 'Why I Prefer Native React 18 Hooks Over Complex State Libraries',
    category: 'React & Node',
    author: 'Khushi Tyagi',
    coverColor: 'amber',
    isFeatured: false,
    likes: 29,
    tags: ['React', 'JavaScript', 'Hooks', 'State Management'],
    content: `There was a time when installing Redux was the very first step in initializing any React project. Over time, state management libraries grew so boilerplate-heavy that simple form submissions required actions, reducers, dispatched events, and thunks.

### The Power of \`useState\` & \`useEffect\`
With React 18 and clean functional components, 90% of medium-scale applications only need thoughtful component composition and state lifting.

By co-locating state close to where it is consumed, component re-renders remain predictable. We can handle search debounce, optimistic UI updates, and modal transitions cleanly without adding 150KB of external dependencies.`,
  },
  {
    title: 'The Art of Editorial Web Design: Moving Past Generic Framework Templates',
    category: 'Design & UI',
    author: 'Khushi Tyagi',
    coverColor: 'emerald',
    isFeatured: false,
    likes: 38,
    tags: ['CSS', 'Typography', 'UI/UX', 'Minimalism'],
    content: `Walk through any modern developer showcase, and you will notice a familiar pattern: saturated purple gradients, oversized glassmorphic cards, and chaotic floating buttons.

### Why Restraint Wins
Great editorial design is built on three core pillars:
1. **Typographic Hierarchy:** Let high-contrast serif headlines guide the eye through content, balanced by crisp sans-serif body typography.
2. **Warm Canvas Palette:** Harsh pure black on blinding white causes visual fatigue. Softer tones like warm ivory (\`#FAF8F5\`) and deep espresso (\`#1C1917\`) create a relaxed, tactile reading experience.
3. **Intentional White Space:** Give elements room to breathe. Margins and padding should feel like margins in a physical book.`,
  },
  {
    title: 'From College Labs to Production Code: Lessons in Full-Stack Engineering',
    category: 'Career & Growth',
    author: 'Khushi Tyagi',
    coverColor: 'slate',
    isFeatured: false,
    likes: 54,
    tags: ['Career', 'WebDev', 'Learnings', 'Engineering'],
    content: `Transitioning from classroom assignments to building end-to-end full-stack applications teaches you things no textbook covers.

Here are the 3 biggest lessons I learned while building production-ready projects:
- **Error Handling Is Half the Code:** Anyone can write code that works when inputs are perfect. The mark of real software engineering is how gracefully your application responds when the network drops or a payload is malformed.
- **RESTful Discipline:** Naming endpoints predictably (\`GET /api/posts\`, \`DELETE /api/posts/:id\`) and returning standardized JSON structures makes frontend integration effortless.
- **Ship Working Prototypes Early:** Perfect is the enemy of shipped. Get the core CRUD loop working, test it end-to-end, and iterate continuously.`,
  },
  {
    title: 'Mastering MongoDB Aggregation Pipelines: Beyond Basic Queries',
    category: 'Web Development',
    author: 'Khushi Tyagi',
    coverColor: 'indigo',
    isFeatured: false,
    likes: 19,
    tags: ['MongoDB', 'Backend', 'Database', 'Mongoose'],
    content: `Most beginner developers learn \`find()\`, \`findById()\`, and \`save()\`. While these are sufficient for basic prototypes, real-world data reporting demands aggregation pipelines.

### Understanding the Pipeline Concept
Think of an aggregation pipeline like an assembly line:
1. **Stage 1 (\`$match\`):** Filters documents down to the relevant subset.
2. **Stage 2 (\`$group\`):** Groups items by category, author, or time period to compute counts, averages, and sums.
3. **Stage 3 (\`$project\`):** Reshapes the output fields to match the exact JSON contract expected by the client.

Mastering this single concept will immediately elevate your backend engineering skills above 90% of your peers.`,
  },
];

export const seedPosts = async (force = false) => {
  const count = await Post.countDocuments();
  if (count > 0 && !force) {
    console.log(`[Seed Service] Database contains ${count} blog posts. Skipping initial seed.`);
    return;
  }

  if (force) {
    await Post.deleteMany({});
  }

  console.log('[Seed Service] Seeding initial editorial blog posts...');
  for (const postData of samplePosts) {
    const post = new Post(postData);
    await post.save();
  }
  console.log(`[Seed Service] Seeded ${samplePosts.length} posts successfully.`);
};
