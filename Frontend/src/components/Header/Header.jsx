import "./Header.css";

//lista de links do header

const navLinks = [
    {
        label: "Início",
        href: "#inicio",
    },
    {
        label: "Serviços",
        href: "#servicos",
    },
    {
        label: "Quem somos",
        href: "#quemsomos",
    },
    {
        label: "Localização",
        href: "#localizacao",
    },
];

function Header({ buninessName = "Barbearia" }) {
    return (
        <header className="site-header">
            <div className="header-container">
                {/*Nem Barber*/}
                <a
                    className="brand"
                    href="#inicio"
                    aria-label={` ${buninessName} - Voltar ao início`}
                >
                    <span className="brand-mark">B</span>
                    <span className="brand-name">{buninessName}</span>
                </a>

                {/*Menu de navegação*/}

                <nav className="main-nav" aria-label="Menu principal">
                    {navLinks.map((link) =>
                        <a key={link.href} className="nav-link" href={link.href}>
                            {link.label}
                        </a>
                    )}
                </nav>

                {/*Ações da direita*/}

                <div className="header-actions">
                    <a className="barber-area-link" href="#area-barbeiro">
                        Área do barbeiro
                    </a>

                    <a className="booking-link" href="#agendamento">
                        Agende já
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;