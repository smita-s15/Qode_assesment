const sectors = [
  "Equities",
  "Bonds",
  "Cryptocurrency",
  "ESG Investing",
  "Derivatives",
  "Commodities",
];
const actions = [
  "Trends",
  "Analysis",
  "Strategies",
  "Insights",
  "Opportunities",
  "Tips",
];
const keywords = [
  "portfolio",
  "returns",
  "risk",
  "growth",
  "investment",
  "market",
  "allocation",
  "strategy",
];
const verbs = [
  "maximize",
  "optimize",
  "analyze",
  "understand",
  "explore",
  "leverage",
];

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateDescription() {
  const verb = getRandomItem(verbs);
  const keyword1 = getRandomItem(keywords);
  const keyword2 = getRandomItem(keywords);
  return `Learn how to ${verb} your ${keyword1} and ${verb} your ${keyword2} in the current market.`;
}

function generateFullText(title) {
  const sentences = [];
  const lines = 100 + Math.floor(Math.random() * 50); // 100-150 lines
  for (let i = 0; i < lines; i++) {
    sentences.push(generateDescription());
  }
  return `Full content for "${title}":\n\n${sentences.join("\n\n")}`;
}

function generateBlogs(count = 15) {
  const blogs = [];
  for (let i = 1; i <= count; i++) {
    const sector = getRandomItem(sectors);
    const action = getRandomItem(actions);
    const title = `${sector} ${action} ${i}`;

    const date = new Date(
      2025,
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 28) + 1
    );
    const dateStr = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const author = `Author ${i}`;
    const category = sector;
    const tags = [getRandomItem(keywords), getRandomItem(keywords)];

    const description = generateDescription();
    const fullText = generateFullText(title);

    blogs.push({
      id: i,
      date: dateStr,
      title,
      description,
      fullText,
      author,
      category,
      tags,
    });
  }
  return blogs;
}

export const blogs = generateBlogs(15);

export const introBlogs = [
  {
    id: "a1",
    title: "Get Started",
    description:
      "Learn how to use our portfolio tools and set up your account easily.",
    link: "#",
  },
  {
    id: "a2",
    title: "Community",
    description: "Join our growing investment community and share insights.",
    link: "#",
  },
  {
    id: "a3",
    title: "Visit Website",
    description: "Explore our official site for more resources and services.",
    link: "#",
  },
];
