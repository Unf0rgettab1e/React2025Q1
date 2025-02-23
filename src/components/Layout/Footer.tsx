const Footer = () => {
  return (
    <footer data-testid="footer" className="p-3 mt-8 border-t border-slate-700 bg-slate-800 ">
      <div className="container flex flex-col items-center justify-between mx-auto md:flex-row text-slate-300">
        <div className="flex items-center gap-4 ">
          © 2025 Made with ❤️ by
          <a href="https://github.com/Unf0rgettab1e" className="hover:underline">
            <img src="https://github.com/Unf0rgettab1e.png" alt="Unf0rgettab1e" className="h-10 w-10 rounded-full" />
          </a>
        </div>

        <p>
          Anime data provided by{' '}
          <a
            href="https://jikan.moe"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-yellow-400"
          >
            Jikan API
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
