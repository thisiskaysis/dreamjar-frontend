import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glass">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/DreamJar.svg" alt="DreamJar Logo" className="footer-logo" />
            <p>Where little dreams grow big.</p>
          </div>

          <div className="footer-about">
            <p>DreamJar began as a React & JavaScript project at She Codes Australia and grew into a reflection of my approach to development — creative, intentional, and built with a little magic.</p>
            <p>© 2026 DreamJar • Built with imagination 💫</p>
          </div>

          <div className="footer-social">
            <h4>Connect with me</h4>
            <div className="social-icons">
              <a href="https://www.linkedin.com/in/kaysisdigital/">
                <img src="/linkedin.png" alt="LinkedIn" className="social-icon" />
              </a>
              <a href="https://www.instagram.com/thisiskaysis/">
                <img src="/instagram.png" alt="Instagram" className="social-icon" />
              </a>
              <a href="https://github.com/thisiskaysis">
                <img src="/github.png" alt="GitHub" className="social-icon" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
        </div>
      </div>
    </footer>
  );
}

export default Footer;
