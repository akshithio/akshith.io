# akshith.io

🔨: You can run it by simply cloning, running `pnpm i` followed by `pnpm dev` and visiting `localhost:3000`. You will also need to create a `.env` and fill in the environment variables listed in `.env.example` for all functionality to work as expected. Built with Next, Tailwind & Typescript.

---

`akshith.io` is my personal website. It is primarily a visual home for personal context and location, alongside a notes section. Notes live in `src/notes`, and each one is registered in `src/notes/registry.ts` — routing, the index, metadata, and the sitemap all follow from that.

This website implicitly relies on my CLI tool [`adot`](https://github.com/akshithio/adot) for the `<LocationStatus>` component to work as expected. The project structure is as follows:

```
src/
├── app/                   # Next.js app directory
│   ├── api/location/      # Location endpoint behind <LocationStatus>
│   ├── notes/             # Notes index and per-note routes
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── layout/            # Shared layout components (SiteMenu, Eyes)
│   ├── notes/             # Note layout and figures
│   └── pages/             # Page-specific components
├── hooks/                 # React hooks
├── notes/                 # Note registry and loaders
├── styles/                # Global styles
└── types/                 # Type declarations
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

&nbsp;<img src="./akshithio/light-logo.png#gh-dark-mode-only" alt="Akshith Garapati's Personal Icon - Doodle of Two Eyes Dark Mode" width ="24px" align = "left" /><img src="./akshithio/dark-logo.png#gh-light-mode-only" alt="Akshith Garapati's Personal Icon - Doodle of Two Eyes Dark Mode" width ="24px" align = "left" /> that's where the username comes from! - akshithio - may 2025
