import './header.component.css'

export const HeaderComponent = () => {
  return (
    <header className="header">
      <div className="header__top">
        <div className="container header__topInner">
          <div />
          <nav className="header__links">
            <a href="#login">Log in</a>
            <a href="#account">Create an account</a>
            <a href="#checkout">Check out</a>
          </nav>

          <div className="header__cart">
            <span className="header__cartIcon">🛒</span>
            <span className="header__cartText">My cart: 0 item(s) – $0.00</span>
          </div>
        </div>
      </div>

      <div className="header__main">
        <div className="container header__mainInner">
          <div className="brand">
            <div className="brand__title">
              Furniture<span>Store</span>
            </div>
            <div className="brand__sub">The biggest choice on the web</div>
          </div>

          <div className="search">
            <input className="search__input" placeholder="Search store..." />
            <button className="search__btn" aria-label="Search">🔍</button>
          </div>
        </div>
      </div>
    </header>
  )
}
