import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP, FaTiktok } from "react-icons/fa";
import "./Footer.css"; // 👈 import css file

const Footer = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "your_service_id", // replace
        "your_template_id", // replace
        form.current,
        "your_public_key"  // replace
      )
      .then(
        () => alert("Message Sent Successfully!"),
        () => alert("Failed to send, please try again.")
      );
  };

  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-top">
        {/* Right (Black section with form) */}
        <div className="footer-right">
          <h2>T SHOP</h2>
          <p>info@mysite.com</p>
          <p>Tel: 123-456-7890</p>

          <form ref={form} onSubmit={sendEmail} className="footer-form">
            <input type="text" name="user_name" placeholder="Your Name" required />
            <input type="email" name="user_email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows="3" required></textarea>
            <button type="submit">Send</button>
          </form>
        </div>

        {/* Left (White section with links) */}
        <div className="footer-left">
          <div>
            <h3>Shop</h3>
            <ul>
              <li><a href="/new">New</a></li>
              <li><a href="/woman">Woman</a></li>
              <li><a href="/men">Men</a></li>
            </ul>
          </div>
          <div>
            <h3>Our Store</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/subscribe">Subscribe</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3>Terms & Conditions</h3>
            <ul>
              <li><a href="/policy">Store Policy</a></li>
              <li><a href="/shipping">Shipping & Returns</a></li>
              <li><a href="/payments">Payment Methods</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className="footer-social">
        <a href="#"><FaFacebookF /></a>
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaYoutube /></a>
        <a href="#"><FaPinterestP /></a>
        <a href="#"><FaTiktok /></a>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        © 2035 by T Shop. Powered and secured by{" "}
        <a href="https://wix.com" target="_blank" rel="noreferrer">Wix</a>
      </div>
    </footer>
  );
};

export default Footer;
