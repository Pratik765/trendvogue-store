import { FaFacebookSquare, FaTwitterSquare, FaYoutubeSquare, FaInstagramSquare } from "react-icons/fa";
import { RiShieldCheckLine, RiTruckLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="site-footer">
      {/* Trust badges strip */}
      <div className="footer-trust-strip">
        <div className="trust-item">
          <RiShieldCheckLine className="trust-icon" />
          <div>
            <strong>100% ORIGINAL</strong>
            <p>guarantee for all products at trendvogue.com</p>
          </div>
        </div>
        <div className="trust-item">
          <RiTruckLine className="trust-icon" />
          <div>
            <strong>Return within 14 days</strong>
            <p>of receiving your order hassle-free</p>
          </div>
        </div>
      </div>

      <div className="footer_container">
        <div className="footer_column">
          <h3>ONLINE SHOPPING</h3>
          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Kids</a>
          <a href="#">Home & Living</a>
          <a href="#">Beauty</a>
          <a href="#">Gift Cards</a>
          <a href="#">TrendVogue Insider</a>
        </div>

        <div className="footer_column">
          <h3>CUSTOMER POLICIES</h3>
          <a href="#">Contact Us</a>
          <a href="#">FAQ</a>
          <a href="#">T&C</a>
          <a href="#">Terms Of Use</a>
          <a href="#">Track Orders</a>
          <a href="#">Shipping & Returns</a>
          <a href="#">Cancellation</a>
        </div>

        <div className="footer_column">
          <h3>EXPERIENCE TRENDVOGUE APP</h3>
          <p className="app-download-text">Search, discover and shop latest trends directly on our mobile app.</p>
          <div className="app-download-badges">
            <span className="download-badge">Google Play</span>
            <span className="download-badge">App Store</span>
          </div>

          <h3 className="social-heading">KEEP IN TOUCH</h3>
          <div className="social-icons-row">
            <a href="#" aria-label="Facebook"><FaFacebookSquare className="social-icon" /></a>
            <a href="#" aria-label="Twitter"><FaTwitterSquare className="social-icon" /></a>
            <a href="#" aria-label="YouTube"><FaYoutubeSquare className="social-icon" /></a>
            <a href="#" aria-label="Instagram"><FaInstagramSquare className="social-icon" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p className="copyright">
          © 2024 www.trendvogue.com. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
