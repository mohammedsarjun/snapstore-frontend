"use client";

import { useRouter } from "next/navigation";
import styles from "../home.module.css";

const DUMMY_IMAGES = [
  { id: 1, title: "Mountain Sunrise", desc: "Golden hues over a misty mountain range", emoji: "🏔️" },
  { id: 2, title: "Ocean Waves", desc: "Crystal clear waves hitting the shore", emoji: "🌊" },
  { id: 3, title: "City Lights", desc: "A vibrant cityscape at night", emoji: "🌃" },
  { id: 4, title: "Forest Path", desc: "A quiet trail through ancient woods", emoji: "🌲" },
  { id: 5, title: "Desert Dunes", desc: "Smooth sand dunes at golden hour", emoji: "🏜️" },
  { id: 6, title: "Northern Lights", desc: "Aurora borealis dancing across the sky", emoji: "🌌" },
];

export default function HomeContent() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className={styles["home-container"]}>
      {/* Navbar */}
      <nav className={styles["home-nav"]}>
        <div className={styles["home-logo"]}>
          SnapStore<span>.</span>
        </div>
        <div className={styles["home-nav-actions"]}>
          <button className={styles["home-logout-btn"]} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles["home-hero"]}>
        <h1 className={styles["home-hero-title"]}>Your Gallery</h1>
        <p className={styles["home-hero-sub"]}>
          Welcome to SnapStore — your personal space to collect, curate, and arrange images exactly the way you want them.
        </p>
      </section>

      {/* Image Grid */}
      <section className={styles["home-grid"]}>
        {DUMMY_IMAGES.map((img) => (
          <div key={img.id} className={styles["home-card"]}>
            <div className={styles["home-card-img"]}>
              {img.emoji}
            </div>
            <div className={styles["home-card-body"]}>
              <div className={styles["home-card-title"]}>{img.title}</div>
              <div className={styles["home-card-desc"]}>{img.desc}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
