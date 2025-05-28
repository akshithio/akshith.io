# akshith.io

🔨: You can run it by simply cloning, running `pnpm i` followed by `pnpm dev` and visiting `localhost:3000`. You will also need to create a `.env` and fill in the environment variables listed in `.env.example` for all functionality to work as expected. Built with Next, Tailwind & Typescript.

---

`akshith.io` is my personal website. Much of the work on the website was spent primarily on the writing section of the website which relies on the `.mdx` files available in the `content` folder. If necessary, this system alongside the set of custom components can be succesfully adapted for alternative projects. Other aspects of the website remain primarily visual, with little external utility outside of this project.

![It shows a personal website for Akshith Garapati, a Purdue computer science student. Features navigation menu, bio describing his work with web systems and AI, project highlights including organizational tools and web archival systems, and a decorative tree illustration.](./akshithio/preview.png)

This website implicitly relies on my CLI tool [`adot`](https://github.com/akshithio/akshith.io) for the `<LocationStatus>` component to work as expected alongside the microblogging section on the `/writing` route. The project structure is as follows:

```
src/
├── app/                   # Next.js app directory
│   ├── writing/           # Writing section routes
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── layout/            # Layout components (Navbar, Tooltip, etc.)
│   └── pages/             # Page-specific components
├── content/               # MDX content for blog posts
├── icons/                 # SVG icons
└── utils/                 # Utility functions and fonts
```

### Contributing

Feel free to submit issues and enhancement requests! If you want to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### License


This project is licensed under the [MIT License](LICENSE).  
All blog content is licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).  
You are free to share and adapt the content, provided proper attribution is given.

<br />

&nbsp;<img src="./akshithio/light-logo.png#gh-dark-mode-only" alt="Logo of Boilerexams" width ="24px" align = "left" /><img src="./akshithio/dark-logo.png#gh-light-mode-only" alt="Logo of Boilerexams" width ="24px" align = "left" /> that's where the username comes from! - akshithio - may 2025
