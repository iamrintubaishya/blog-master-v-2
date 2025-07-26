const sampleCategories = [
  { name: 'Technology', description: 'Latest tech trends and innovations', slug: 'technology' },
  { name: 'Programming', description: 'Coding tutorials and best practices', slug: 'programming' },
  { name: 'Design', description: 'UI/UX design insights and inspiration', slug: 'design' },
  { name: 'Productivity', description: 'Tips for better work and life efficiency', slug: 'productivity' },
  { name: 'Business', description: 'Entrepreneurship and business insights', slug: 'business' },
  { name: 'AI & Machine Learning', description: 'Artificial intelligence and ML developments', slug: 'ai-machine-learning' }
];

const samplePosts = [
  {
    title: "The Future of Web Development: What to Expect in 2024",
    slug: "future-of-web-development-2024",
    excerpt: "Exploring the emerging trends, technologies, and frameworks that will shape web development in the coming year.",
    content: `<h2>Introduction</h2>
<p>Web development continues to evolve at a rapid pace, with new technologies and frameworks emerging every year. As we look ahead to 2024, several trends are becoming clear that will significantly impact how we build web applications.</p>

<h2>1. Server-Side Rendering Renaissance</h2>
<p>The pendulum is swinging back toward server-side rendering (SSR) as developers recognize the benefits of faster initial page loads and better SEO. Frameworks like Next.js, Nuxt.js, and SvelteKit are leading this charge.</p>

<h2>2. Edge Computing Integration</h2>
<p>Edge computing is becoming more accessible, allowing developers to run code closer to users for improved performance. Platforms like Cloudflare Workers and Vercel Edge Functions are making this technology mainstream.</p>

<h2>3. WebAssembly Adoption</h2>
<p>WebAssembly (WASM) is gaining traction for performance-critical applications, enabling languages like Rust and Go to run in the browser with near-native performance.</p>

<h2>Conclusion</h2>
<p>The future of web development looks exciting, with technologies that promise better performance, developer experience, and user satisfaction. Staying informed about these trends will be crucial for any web developer.</p>`,
    categoryId: 1,
    status: 'published',
    readTime: 8,
    viewCount: 0,
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop'
  },
  {
    title: "Mastering React Hooks: A Complete Guide",
    slug: "mastering-react-hooks-complete-guide",
    excerpt: "Deep dive into React Hooks with practical examples and best practices for modern React development.",
    content: `<h2>Understanding React Hooks</h2>
<p>React Hooks revolutionized how we write React components by allowing us to use state and other React features in functional components.</p>

<h2>useState Hook</h2>
<p>The useState hook is the most fundamental hook that allows you to add state to functional components:</p>
<pre><code>const [count, setCount] = useState(0);</code></pre>

<h2>useEffect Hook</h2>
<p>useEffect lets you perform side effects in functional components, replacing lifecycle methods from class components.</p>

<h2>Custom Hooks</h2>
<p>Creating custom hooks allows you to extract component logic into reusable functions, promoting code reuse and separation of concerns.</p>

<h2>Best Practices</h2>
<p>Always follow the rules of hooks, use the ESLint plugin, and keep your hooks simple and focused on a single responsibility.</p>`,
    categoryId: 2,
    status: 'published',
    readTime: 12,
    viewCount: 0,
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop'
  },
  {
    title: "Design Systems: Building Consistency at Scale",
    slug: "design-systems-building-consistency-scale",
    excerpt: "Learn how to create and maintain design systems that scale across large organizations and multiple products.",
    content: `<h2>What is a Design System?</h2>
<p>A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.</p>

<h2>Core Components</h2>
<p>Every design system should include typography scales, color palettes, spacing systems, and component libraries that ensure consistency across all touchpoints.</p>

<h2>Implementation Strategy</h2>
<p>Start small with basic components like buttons and forms, then gradually expand to more complex patterns. Documentation is crucial for adoption.</p>

<h2>Measuring Success</h2>
<p>Track adoption rates, development velocity improvements, and design consistency metrics to measure the impact of your design system.</p>`,
    categoryId: 3,
    status: 'published',
    readTime: 10,
    viewCount: 0,
    featuredImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop'
  },
  {
    title: "Productivity Hacks for Software Developers",
    slug: "productivity-hacks-software-developers",
    excerpt: "Proven strategies and tools to boost your coding productivity and maintain work-life balance.",
    content: `<h2>Time Management Techniques</h2>
<p>The Pomodoro Technique and time-blocking can significantly improve focus and prevent burnout in software development.</p>

<h2>Development Environment Setup</h2>
<p>Invest time in setting up your IDE, learning keyboard shortcuts, and creating custom snippets to speed up common tasks.</p>

<h2>Code Organization</h2>
<p>Maintain clean, well-documented code and use version control effectively to reduce time spent debugging and collaborating.</p>

<h2>Continuous Learning</h2>
<p>Stay updated with industry trends, but be selective about new technologies to avoid productivity-killing technology churn.</p>`,
    categoryId: 4,
    status: 'published',
    readTime: 7,
    viewCount: 0,
    featuredImage: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=800&h=400&fit=crop'
  },
  {
    title: "Building a Successful SaaS Product from Scratch",
    slug: "building-successful-saas-product-scratch",
    excerpt: "A comprehensive guide to launching and scaling a Software as a Service business in today's competitive market.",
    content: `<h2>Market Research and Validation</h2>
<p>Before writing a single line of code, validate your idea through customer interviews, surveys, and market analysis.</p>

<h2>MVP Development</h2>
<p>Build a minimum viable product that solves one core problem well, rather than trying to build everything at once.</p>

<h2>Pricing Strategy</h2>
<p>Choose a pricing model that aligns with your customer's value perception and allows for sustainable growth.</p>

<h2>Customer Acquisition</h2>
<p>Focus on building a sustainable customer acquisition strategy through content marketing, SEO, and customer referrals.</p>`,
    categoryId: 5,
    status: 'published',
    readTime: 15,
    viewCount: 0,
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'
  },
  {
    title: "Machine Learning in Production: Best Practices",
    slug: "machine-learning-production-best-practices",
    excerpt: "Essential practices for deploying and maintaining machine learning models in production environments.",
    content: `<h2>Model Deployment Strategies</h2>
<p>Learn about different deployment patterns including blue-green deployments, canary releases, and A/B testing for ML models.</p>

<h2>Monitoring and Observability</h2>
<p>Implement comprehensive monitoring for model performance, data drift, and system health to catch issues early.</p>

<h2>Data Pipeline Management</h2>
<p>Build robust data pipelines that can handle scale, ensure data quality, and maintain reproducibility.</p>

<h2>Model Versioning</h2>
<p>Use proper versioning strategies for both models and data to enable rollbacks and ensure reproducible results.</p>`,
    categoryId: 6,
    status: 'published',
    readTime: 13,
    viewCount: 0,
    featuredImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop'
  }
];

console.log('Sample data prepared for', samplePosts.length, 'posts and', sampleCategories.length, 'categories');