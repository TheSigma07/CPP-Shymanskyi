function Header({ cartCount, cartTotal }) {
    return (
        <>
            <nav className="sticky top-0 z-50 bg-[#182848] shadow-md">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 max-sm:flex-col max-sm:gap-3">
                    <a href="#" className="text-xl font-bold text-white">
                        PaperCraft ✏️
                    </a>
                    <ul className="flex gap-5 text-sm font-medium text-slate-200 max-sm:flex-wrap max-sm:justify-center">
                        <li>
                            <a href="#" className="transition hover:text-rose-400">
                                Головна
                            </a>
                        </li>
                        <li>
                            <a href="#catalog" className="transition hover:text-rose-400">
                                Каталог
                            </a>
                        </li>
                        <li>
                            <a href="#features" className="transition hover:text-rose-400">
                                Переваги
                            </a>
                        </li>
                        <li>
                            <a href="#tech-stack" className="transition hover:text-rose-400">
                                Стек технологій
                            </a>
                        </li>
                        <li>
                            <a href="#about" className="transition hover:text-rose-400">
                                Про нас
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <header className="bg-gradient-to-r from-[#2b5876] to-[#4e4376] px-6 py-14 text-center text-white shadow-md">
                <div className="mx-auto max-w-4xl">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                        PaperCraft ✏️
                    </h1>
                    <p className="mt-3 text-lg text-slate-200">
                        Сучасний онлайн-магазин канцтоварів для навчання, творчості та офісу.
                    </p>
                    <a
                        href="#catalog"
                        className="mt-6 inline-block rounded-full bg-rose-500 px-8 py-3 text.base font-bold text-white shadow-lg transition hover:bg-rose-600 hover:-translate-y-0.5"
                    >
                        Переглянути каталог
                    </a>
                </div>
            </header>
        </>
    );
}

export default Header;
