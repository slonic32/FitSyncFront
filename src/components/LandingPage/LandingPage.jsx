import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCheck, FaWater, FaChartLine, FaRobot, FaMobileAlt, FaSync } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import css from './LandingPage.module.css';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={css.landingPage}>
      {/* Navigation Bar */}
      <nav className={`${css.navbar} ${scrolled ? css.navbarScrolled : ''}`}>
        <div className={css.navContainer}>
          <Link to="/" className={css.logo}>
            FITSYNC
          </Link>
          <NavLink to="/signin" className={css.signInBtn}>
            Sign In
          </NavLink>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={css.hero}>
        <video
          className={css.heroVideo}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/images/4761768-uhd_4096_2160_25fps.mp4" type="video/mp4" />
        </video>
        <div className={css.heroOverlay}></div>
        <div className={css.heroContent}>
          <h1 className={css.heroTitle}>Your Fitness Journey,</h1>
          <h1 className={css.heroTitle}>Simplified</h1>
          <p className={css.heroSubtitle}>
            Track your workouts, monitor hydration, and get AI-powered health insights—all in one place.
          </p>
          <div className={css.heroButtons}>
            <NavLink to="/signup" className={css.ctaPrimary}>
              Get Started
            </NavLink>
            <NavLink to="/signin" className={css.ctaSecondary}>
              Sign In
            </NavLink>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={css.features}>
        <div className={css.container}>
          <h2 className={css.sectionTitle}>Everything You Need to Stay Fit</h2>
          <div className={css.featuresGrid}>
            <div className={css.featureCard}>
              <div className={css.featureIcon}>
                <FaWater />
              </div>
              <h3 className={css.featureTitle}>Water Tracking</h3>
              <p className={css.featureDescription}>
                Monitor your daily hydration with smart reminders and detailed analytics.
              </p>
            </div>
            <div className={css.featureCard}>
              <div className={css.featureIcon}>
                <FaChartLine />
              </div>
              <h3 className={css.featureTitle}>Progress Analytics</h3>
              <p className={css.featureDescription}>
                Visualize your fitness journey with comprehensive charts and insights.
              </p>
            </div>
            <div className={css.featureCard}>
              <div className={css.featureIcon}>
                <FaRobot />
              </div>
              <h3 className={css.featureTitle}>AI Health Guide</h3>
              <p className={css.featureDescription}>
                Get personalized nutrition advice and meal analysis powered by AI.
              </p>
            </div>
            <div className={css.featureCard}>
              <div className={css.featureIcon}>
                <FaMobileAlt />
              </div>
              <h3 className={css.featureTitle}>Mobile Friendly</h3>
              <p className={css.featureDescription}>
                Access your fitness data anywhere, anytime on any device.
              </p>
            </div>
            <div className={css.featureCard}>
              <div className={css.featureIcon}>
                <FaSync />
              </div>
              <h3 className={css.featureTitle}>Real-time Sync</h3>
              <p className={css.featureDescription}>
                Your data syncs instantly across all your devices seamlessly.
              </p>
            </div>
            <div className={css.featureCard}>
              <div className={css.featureIcon}>
                <FaCheck />
              </div>
              <h3 className={css.featureTitle}>Goal Tracking</h3>
              <p className={css.featureDescription}>
                Set and achieve your fitness goals with personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={css.howItWorks}>
        <div className={css.container}>
          <h2 className={css.sectionTitle}>How It Works</h2>
          <div className={css.stepsContainer}>
            <div className={css.step}>
              <div className={css.stepNumber}>1</div>
              <h3 className={css.stepTitle}>Sign Up</h3>
              <p className={css.stepDescription}>
                Create your free account in seconds. No credit card required.
              </p>
            </div>
            <div className={css.step}>
              <div className={css.stepNumber}>2</div>
              <h3 className={css.stepTitle}>Set Your Goals</h3>
              <p className={css.stepDescription}>
                Define your fitness objectives and customize your tracking preferences.
              </p>
            </div>
            <div className={css.step}>
              <div className={css.stepNumber}>3</div>
              <h3 className={css.stepTitle}>Start Tracking</h3>
              <p className={css.stepDescription}>
                Log your activities, water intake, and get AI-powered insights.
              </p>
            </div>
            <div className={css.step}>
              <div className={css.stepNumber}>4</div>
              <h3 className={css.stepTitle}>Achieve Results</h3>
              <p className={css.stepDescription}>
                Watch your progress and reach your fitness goals faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={css.stats}>
        <div className={css.container}>
          <div className={css.statsGrid}>
            <div className={css.statItem}>
              <div className={css.statNumber}>10K+</div>
              <div className={css.statLabel}>Active Users</div>
            </div>
            <div className={css.statItem}>
              <div className={css.statNumber}>1M+</div>
              <div className={css.statLabel}>Liters Tracked</div>
            </div>
            <div className={css.statItem}>
              <div className={css.statNumber}>50K+</div>
              <div className={css.statLabel}>Goals Achieved</div>
            </div>
            <div className={css.statItem}>
              <div className={css.statNumber}>24/7</div>
              <div className={css.statLabel}>AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={css.ctaSection}>
        <div className={css.container}>
          <h2 className={css.ctaTitle}>Ready to Transform Your Fitness Journey?</h2>
          <p className={css.ctaSubtitle}>
            Join thousands of users who are already achieving their fitness goals.
          </p>
          <NavLink to="/signup" className={css.ctaButton}>
            Start Free Trial
          </NavLink>
        </div>
      </section>
    </div>
  );
}

