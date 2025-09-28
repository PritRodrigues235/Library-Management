const express = require('express');
const cors = require('cors');
const fuzzysort = require('fuzzysort');

const app = express();
const port = 3000;


app.use(cors({ origin: 'http://192.168.0.104:5500' }));
app.use(express.json());

const items = [
  {
    name: "Brave New World",
    type: "Dystopian",
    description: "A futuristic society driven by pleasure, conformity, and genetic engineering.",
    author: "Aldous Huxley",
    funFact: "Huxley wrote it in just four months.",
    readingTip: "Compare its themes with Orwell’s 1984.",
    available: true,
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780060850524-M.jpg"
  },
  {
    name: "The Catcher in the Rye",
    type: "Coming-of-Age",
    description: "Holden Caulfield’s cynical journey through adolescence and alienation.",
    author: "J.D. Salinger",
    funFact: "It’s one of the most frequently banned books in schools.",
    readingTip: "Focus on Holden’s internal monologue and symbolism.",
    available: false,
    imageUrl: "https://covers.openlibrary.org/b/id/14894937-M.jpg"
  },
  {
    name: "The Book Thief",
    type: "Historical Fiction",
    description: "A young girl in Nazi Germany finds solace in stolen books and storytelling.",
    author: "Markus Zusak",
    funFact: "Narrated by Death, a unique literary choice.",
    readingTip: "Watch for color symbolism and poetic language.",
    available: true,
    imageUrl: "https://covers.openlibrary.org/b/id/11473616-M.jpg"
  },
  {
    name: "Thinking, Fast and Slow",
    type: "Psychology",
    description: "Explores how we think, make decisions, and fall into cognitive traps.",
    author: "Daniel Kahneman",
    funFact: "Kahneman won the Nobel Prize in Economics.",
    readingTip: "Apply the concepts to your own decision-making.",
    available: false,
    imageUrl: "https://covers.openlibrary.org/b/id/12571352-M.jpg"
  },
  {
    name: "The Road",
    type: "Post-Apocalyptic Fiction",
    description: "A father and son journey through a bleak, ruined world.",
    author: "Cormac McCarthy",
    funFact: "Won the Pulitzer Prize for Fiction in 2007.",
    readingTip: "Focus on the sparse prose and emotional depth.",
    available: true,
    imageUrl: "https://covers.openlibrary.org/b/id/14818120-M.jpg"
  },
  {
    name: "Dune",
    type: "Science Fiction",
    description: "A desert planet, political intrigue, and the rise of a messianic figure.",
    author: "Frank Herbert",
    funFact: "Inspired by ecological concerns and desert cultures.",
    readingTip: "Pay attention to the themes of power and prophecy.",
    available: false,
    imageUrl: "https://covers.openlibrary.org/b/id/15092781-M.jpg"
  },
  {
    name: "The Power of Now",
    type: "Spirituality",
    description: "A guide to living in the present moment and transcending ego.",
    author: "Eckhart Tolle",
    funFact: "Oprah Winfrey helped popularize the book.",
    readingTip: "Read slowly and reflect on each chapter.",
    available: true,
    imageUrl: "https://covers.openlibrary.org/b/id/6887772-M.jpg"
  },
  {
    name: "The Kite Runner",
    type: "Drama",
    description: "A story of friendship, betrayal, and redemption set in Afghanistan.",
    author: "Khaled Hosseini",
    funFact: "It was Hosseini’s debut novel.",
    readingTip: "Explore the theme of guilt and forgiveness.",
    available: false,
    imageUrl: "https://covers.openlibrary.org/b/id/14846875-M.jpg"
  },
  {
    name: "Becoming",
    type: "Memoir",
    description: "Michelle Obama’s journey from Chicago to the White House.",
    author: "Michelle Obama",
    funFact: "It became the best-selling book of 2018.",
    readingTip: "Focus on her reflections on identity and resilience.",
    available: true,
    imageUrl: "https://covers.openlibrary.org/b/id/10618645-M.jpg"
  },
  {
    name: "The Subtle Art of Not Giving a F*ck",
    type: "Self-Help",
    description: "A counterintuitive approach to living a better life.",
    author: "Mark Manson",
    funFact: "It started as a blog post.",
    readingTip: "Embrace the idea of choosing your struggles wisely.",
    available: false,
    imageUrl: "https://covers.openlibrary.org/b/id/14832143-M.jpg"
  },
  {
    name: "The Four Agreements",
    type: "Spirituality",
    description: "A practical guide to personal freedom based on ancient Toltec wisdom.",
    author: "Don Miguel Ruiz",
    funFact: "The agreements are deceptively simple yet profound.",
    readingTip: "Reflect on how each agreement applies to your life.",
    available: true,
    imageUrl: "https://covers.openlibrary.org/b/id/15089889-M.jpg"
  },
  {
    name: "Where the Crawdads Sing",
    type: "Mystery",
    description: "A girl raised in the wild marshes becomes entangled in a murder case.",
    author: "Delia Owens",
    funFact: "Owens is a wildlife scientist.",
    readingTip: "Enjoy the lyrical descriptions of nature.",
    available: false,
    imageUrl: "https://covers.openlibrary.org/b/id/8743774-M.jpg"
  },
  {
    name: "A Man Called Ove",
    type: "Contemporary Fiction",
    description: "A grumpy old man’s life changes through unexpected friendships.",
    author: "Fredrik Backman",
    funFact: "It was adapted into a Swedish film and later a Tom Hanks movie.",
    readingTip: "Look for the emotional layers beneath Ove’s gruff exterior.",
    available: true,
    imageUrl: "https://covers.openlibrary.org/b/id/12673833-M.jpg"
  },
  {
    name: "The 5 AM Club",
    type: "Productivity",
    description: "A morning routine to maximize performance and well-being.",
    author: "Robin Sharma",
    funFact: "Sharma also wrote 'The Monk Who Sold His Ferrari'.",
    readingTip: "Try implementing the 20/20/20 formula.",
    available: false,
    imageUrl: "https://covers.openlibrary.org/b/id/15121386-L.jpg"
  },
  {
    name: "The Giver",
    type: "Young Adult",
    description: "A boy discovers the dark truths behind his utopian society.",
    author: "Lois Lowry",
    funFact: "It’s often used in school curricula.",
    readingTip: "Think about the role of memory and emotion.",
    available: true,
    imageUrl: "https://covers.openlibrary.org/b/id/14847572-M.jpg"
  },
  {
    name: "The Little Prince",
    type: "Philosophical Fiction",
    description: "A poetic tale about childhood, imagination, and human nature.",
    author: "Antoine de Saint-Exupéry",
    funFact: "It’s one of the most translated books in the world.",
    readingTip: "Read it with a childlike sense of wonder.",
    available: true,
    imageUrl: "https://covers.openlibrary.org/b/id/14994367-M.jpg"
  },
  {
    name: "The Girl on the Train",
    type: "Thriller",
    description: "A woman’s daily commute turns into a tangled mystery.",
    author: "Paula Hawkins",
    funFact: "Sold over 20 million copies worldwide.",
    readingTip: "Pay attention to the unreliable narration.",
    available: false,
    imageUrl: "https://covers.openlibrary.org/b/id/13078078-M.jpg"
  },
  {
    name: "The Art of War",
    type: "Strategy",
    description: "Ancient Chinese military tactics with applications in business and life.",
    author: "Sun Tzu",
    funFact: "It’s over 2,500 years old.",
    readingTip: "Think metaphorically—many lessons apply beyond warfare.",
    available: true,
    imageUrl: "https://covers.openlibrary.org/b/id/14847775-M.jpg"
  },
  {
    name: "Norwegian Wood",
    type: "Romance",
    description: "A nostalgic tale of love and loss in 1960s Tokyo.",
    author: "Haruki Murakami",
    funFact: "Named after the Beatles song.",
    readingTip: "Immerse yourself in the melancholic atmosphere.",
    available: false,
    imageUrl: "https://covers.openlibrary.org/b/id/6391163-M.jpg"
  },
  {
    name: "The Great Gatsby",
    type: "Classic Novel",
    description: "A tale of wealth, love, and illusion in the roaring twenties.",
    author: "F. Scott Fitzgerald",
    funFact: "It was almost titled 'Trimalchio in West Egg'.",
    readingTip: "Watch for symbolism in the green light and the eyes of Dr. T.J. Eckleburg.",
    available: true,
    imageUrl: "https://covers.openlibrary.org/b/id/12364437-M.jpg"
  },
  {
    name: "To Kill a Mockingbird",
    type: "Historical Fiction",
    description: "A powerful story of racial injustice and moral growth in the Deep South.",
    author: "Harper Lee",
    funFact: "It was her only published novel for 55 years.",
    readingTip: "Focus on Atticus Finch’s moral compass and Scout’s evolving perspective.",
    available: false,
    imageUrl: "https://covers.openlibrary.org/b/id/15113050-M.jpg"
  },
  {
    name: "1984",
    type: "Dystopian",
    description: "A chilling vision of a totalitarian future ruled by surveillance and control.",
    author: "George Orwell",
    funFact: "The year 1984 was chosen to invert 1948, when Orwell wrote the book.",
    readingTip: "Pay attention to Newspeak and the concept of doublethink.",
    available: true,
    imageUrl: "https://covers.openlibrary.org/b/id/15115831-M.jpg"
  },
  {
    name: "The Hobbit",
    type: "Fantasy",
    description: "Bilbo Baggins embarks on an epic quest filled with dragons, dwarves, and adventure.",
    author: "J.R.R. Tolkien",
    funFact: "Tolkien wrote it as a bedtime story for his children.",
    readingTip: "Enjoy the whimsical tone and look for themes of courage and growth.",
    available: false,
    imageUrl: "https://covers.openlibrary.org/b/id/14627222-M.jpg"
  },
  {
    name: "Atomic Habits",
    type: "Self-Help",
    description: "A guide to building good habits and breaking bad ones through small changes.",
    author: "James Clear",
    funFact: "The book sold over 10 million copies worldwide.",
    readingTip: "Focus on the 1% improvement principle and habit stacking.",
    available: false,
    imageUrl: "https://covers.openlibrary.org/b/id/12993845-M.jpg"
  },
  {
    name: "Sapiens",
    type: "Non-Fiction",
    description: "A sweeping history of humankind from evolution to modern civilization.",
    author: "Yuval Noah Harari",
    funFact: "It was originally written in Hebrew and translated into over 60 languages.",
    readingTip: "Think critically about the myths and narratives that shape societies.",
    available: true,
    imageUrl: "https://covers.openlibrary.org/b/id/8284312-M.jpg"
  },
  {
    name: "The Alchemist",
    type: "Philosophical Fiction",
    description: "A young shepherd's journey to discover his personal legend and destiny.",
    author: "Paulo Coelho",
    funFact: "It was initially a commercial failure before becoming a global bestseller.",
    readingTip: "Reflect on the idea that 'when you want something, all the universe conspires…'",
    available: false,
    imageUrl: "https://covers.openlibrary.org/b/id/15121528-M.jpg"
  },
  {
    name: "The Silent Patient",
    type: "Thriller",
    description: "A gripping psychological mystery about a woman who refuses to speak after a shocking crime.",
    author: "Alex Michaelides",
    funFact: "Inspired by Greek tragedy and the myth of Alcestis.",
    readingTip: "Watch for subtle clues in Theo’s narration.",
    available: true,
    imageUrl: "https://covers.openlibrary.org/b/id/15105887-M.jpg"
  },
  {
    name: "Educated",
    type: "Memoir",
    description: "A woman raised in isolation pursues education and discovers the power of knowledge.",
    author: "Tara Westover",
    funFact: "She earned a PhD from Cambridge despite never attending school until age 17.",
    readingTip: "Notice the tension between loyalty to family and personal growth.",
    available: false,
    imageUrl: "https://covers.openlibrary.org/b/id/14656755-M.jpg"
  },
  {
    name: "The Midnight Library",
    type: "Contemporary Fiction",
    description: "A woman explores alternate lives through a magical library between life and death.",
    author: "Matt Haig",
    funFact: "The book was inspired by Haig’s own struggles with mental health.",
    readingTip: "Think about the impact of small choices and regrets.",
    available: true,
    imageUrl: "https://covers.openlibrary.org/b/id/14825926-M.jpg"
  }
];

app.get('/search', (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase().trim() : '';
  console.log('Received query:', query);

  if (query.length > 50) return res.status(400).json({ error: 'Query too long' });
  if (!query) return res.json([]);

  try {
    const results = fuzzysort.go(query, items, {
      key: 'name',
      threshold: -1000,
      limit: 10
    });

    let sortedResults = results.map(result => ({
      ...result.obj,
      score: result.score,
      isTopMatch: result.obj.name.toLowerCase().startsWith(query)
    }));

    if (sortedResults.length === 0) {
      sortedResults = items.filter(item =>
        item.name.toLowerCase().includes(query)
      ).map(item => ({
        ...item,
        score: 0,
        isTopMatch: item.name.toLowerCase().startsWith(query)
      }));
    }

    res.json(sortedResults);
  } catch (error) {
    console.error(`Search error: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});