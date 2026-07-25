import React, { useEffect, useRef, useState } from "react";
import "./homepage.css";
import Hero from "../../components/hero/home/hero";
import Banner from "../../assets/images/banner.png";
import cambridge from "../../assets/images/cambridge.png";
import { useNavigate } from "react-router-dom";

// ================= CURRICULUM LIST =================
const CURRICULUMS = [
  {
    id: "american",
    name: "American State Curriculum",
    logo: cambridge,
    info:
      "The American State Curriculum varies state to state and emphasizes creativity, electives, project learning, SAT/ACT prep, and overall skill development.",
  },
  {
    id: "ap",
    name: "Advanced Placement (AP)",
    logo: cambridge,
    info:
      "AP courses offer university-level learning for high schoolers with exams graded 1–5, accepted globally for credit.",
  },
  {
    id: "australian",
    name: "Australian National Curriculum",
    logo: cambridge,
    info:
      "Australia’s national curriculum provides standards F–12 with emphasis on practical learning, real-world skills, and structured progression.",
  },
  {
    id: "bangladeshi",
    name: "Bangladeshi National Curriculum",
    logo: cambridge,
    info:
      "NCTB-administered curriculum including Bangla, English, Math, Science, ICT, Social Science; focuses mainly on theoretical learning.",
  },
  {
    id: "ib",
    name: "International Baccalaureate (IB)",
    logo: cambridge,
    info:
      "IB focuses on research, critical thinking, CAS, TOK, and the EE; known as one of the toughest pre-university programs.",
  },
  {
    id: "cambridge",
    name: "Cambridge IGCSE",
    logo: cambridge,
    info:
      "Cambridge IGCSE is a global qualification offering 70+ subjects with analytical skill-building and strong exam preparation.",
  },
  {
    id: "edexcel",
    name: "Edexcel IGCSE",
    logo: cambridge,
    info:
      "Pearson Edexcel IGCSE is known for simple exam patterns, clearer marking schemes, and strong international recognition.",
  },
];

// ================= TILE COMPONENT =================
const CurriculumTile = ({ item, openId, setOpenId }) => {
  const isOpen = openId === item.id;

  return (
    <div className="curriculum-tile">
      <img src={item.logo} className="curriculum-logo" alt={item.name} />
      <h3>{item.name}</h3>

      <button className="info-icon" onClick={() => setOpenId(item.id)}>
        ❕
      </button>

      {isOpen && (
        <div className="popup-overlay" onClick={() => setOpenId(null)}>
          <div className="popup-window" onClick={(e) => e.stopPropagation()}>
            <h3>{item.name}</h3>
            <p>{item.info}</p>

            <button className="close-popup" onClick={() => setOpenId(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ================= MAIN PAGE =================
const Homepage = () => {
  const [openId, setOpenId] = useState(null);
  const sliderRef = useRef(null);
  const whyRef = useRef(null);
  const statsRef = useRef(null);
  const [counts, setCounts] = useState({ students: 0, tutors: 0 });
  const [triggered, setTriggered] = useState({ why: false, stats: false });
  const navigate = useNavigate();

  // Scroll animation for WHY section
  useEffect(() => {
    const whyEl = whyRef.current;
    if (!whyEl) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTriggered((s) => ({ ...s, why: true }));
          obs.unobserve(whyEl);
        }
      });
    }, { threshold: 0.25 });

    obs.observe(whyEl);
    return () => obs.disconnect();
  }, []);

  // Stats section trigger
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTriggered((s) => ({ ...s, stats: true }));
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Count-up animation
  useEffect(() => {
    if (!triggered.stats) return;

    const duration = 1800;
    const start = performance.now();
    let rafId;

    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      setCounts({
        students: Math.floor(1500 * ease),
        tutors: Math.floor(200 * ease),
      });

      if (t < 1) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [triggered.stats]);

  const scrollSlider = (dir) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const amount = slider.clientWidth * 0.7;
    slider.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="homepage">
      <Hero />

      {/* WHY SECTION */}
      <section className="why-section" ref={whyRef}>
        <div className={`why-content ${triggered.why ? "slide-up" : ""}`}>
          <h2>Why SlightEdge Academics?</h2>
          <p>
            At SlightEdge Academics, we focus on strong foundations, guided mentorship,
            and personalized learning strategies to ensure student excellence.
          </p>
          <button className="learn-more-btn">
            Learn More <span className="arrow-icon">→</span>
          </button>
        </div>

        <div className="why-image-wrap">
          <img src={Banner} alt="Why SlightEdge Academics" className="why-image" />
        </div>
      </section>

      {/* CURRICULUM SLIDER */}
      <section className="academics-overview">
        <h2>Academic Overview</h2>
        <p className="academics-subline">
          Explore our wide range of curriculums designed for global standards.
        </p>

        <div className="curriculum-controls">
          <button className="arrow left" onClick={() => scrollSlider("left")}>‹</button>

          <div className="curriculum-slider" ref={sliderRef}>
            {CURRICULUMS.map((cur) => (
              <CurriculumTile key={cur.id} item={cur} openId={openId} setOpenId={setOpenId} />
            ))}
          </div>

          <button className="arrow right" onClick={() => scrollSlider("right")}>›</button>
        </div>

        <div className="view-more-wrap">
          <button className="view-more-btn"
           onClick={() => navigate("/curriculum_details")}>
            View More
            </button>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section" ref={statsRef}>
        <div className="stat-box">
          <h3 className="stat-num">{counts.students.toLocaleString()}</h3>
          <p>Enrolled Students</p>
        </div>

        <div className="stat-gap" />

        <div className="stat-box">
          <h3 className="stat-num">{counts.tutors.toLocaleString()}</h3>
          <p>Qualified Tutors</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <h2>What Our Students & Tutors Say</h2>

        <div className="testimonial-grid">
          <div className="testimonial-tile">
            <p>"The classes are so interactive! I improved my grades drastically."</p>
            <span>- Ayesha, Student</span>
          </div>
          <div className="testimonial-tile">
            <p>"As a tutor, I love the flexibility and student engagement."</p>
            <span>- Rahim, Tutor</span>
          </div>
          <div className="testimonial-tile">
            <p>"This platform connects the right tutors to the right learners."</p>
            <span>- Mahmud, Student</span>
          </div>
          <div className="testimonial-tile">
            <p>"Support and curriculum quality are top-notch."</p>
            <span>- Farzana, Parent</span>
          </div>
        </div>

        <button className="show-more-btn">Show More</button>
      </section>
    </div>
  );
};

export default Homepage;
