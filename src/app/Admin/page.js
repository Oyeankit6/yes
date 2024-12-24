import Head from "next/head";
import "./Admin.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Betting App - Win Big!</title>
        <meta name="description" content="Your ultimate betting destination." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="landing-page">
        <header className="header">
          <div className="container">
            <h1 className="logo">BettingApp</h1>
            <nav className="nav">
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#contact">Contact</a>
              <button className="btn btn-primary">Sign Up</button>
            </nav>
          </div>
        </header>
        <main>
          <section className="hero">
            <div className="hero-content">
              <h1>Experience the Thrill of Betting!</h1>
              <p>
                Place your bets, track your winnings, and enjoy the excitement
                of every game.
              </p>
              <button className="btn btn-secondary">Total Income</button>
            </div>
            <div className="hero-image">
              <img src="/hero-image.png" alt="Betting excitement" />
            </div>
          </section>
          <section id="features" className="features">
            <h2>Why Choose Us?</h2>
            <div className="features-grid">
              {/* Recharge Requests Card */}
              <div className="feature-card">
                <img
                  src="https://tse4.mm.bing.net/th?id=OIP.VjQ-wf2AQ8b-eRdDe5LG5QHaGW&pid=Api&P=0&h=180"
                  alt="Secure"
                />
                <Link href="/Admin/Recharge">
                  <h3>Recharge Requests</h3>
                </Link>
                <p>Your money and data are safe with us.</p>
              </div>
              {/* Total Users Card */}
              <div className="feature-card">
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.isMiRzNuox6kx5IuWDJO3QHaHa&pid=Api&P=0&h=180"
                  alt="Best Odds"
                />
                <h3>
                  <Link href="">Total Users</Link>
                </h3>
                <p>Competitive odds to maximize your winnings.</p>
              </div>
              {/* Withdrawal Requests Card */}
              <div className="feature-card">
                <img
                  src="https://tse4.mm.bing.net/th?id=OIP.DqUKQbIgdbnrTb0rBcizsAHaHa&pid=Api&P=0&h=180"
                  alt="Withdrawals"
                />
                <Link href="/Admin/Withdrawal">
                  <h3>Withdrawal Requests</h3>
                </Link>
                <p>Manage all user withdrawal requests in one place.</p>
              </div>
            </div>
          </section>
          <section id="how-it-works" className="how-it-works">
            <h2>How It Works</h2>
            <ol>
              <li>Create an account and log in.</li>
              <li>Choose your favorite games and place bets.</li>
              <li>Track your bets and enjoy the winnings!</li>
            </ol>
          </section>
          <footer id="contact" className="footer">
            <div className="container">
              <h3>Contact Us</h3>
              <p>Email: support@bettingapp.com</p>
              <p>Phone: +123 456 7890</p>
              <div className="social-icons">
                <a href="#">
                  <img src="/" alt="Facebook" />
                </a>
                <a href="#">
                  <img src="/" alt="Twitter" />
                </a>
                <a href="#">
                  <img src="/" alt="Instagram" />
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
