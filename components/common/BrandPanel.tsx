
import styles from "./styles/brand-panel.module.css";

const TILES = Array.from({ length: 6 });

export default function BrandPanel() {
    return (
        <>

            <div className={styles["brand-panel"]}>
                <div className={styles["brand-logo"]}>Frame<span>.</span></div>
                <div className={styles["brand-tag"]}>
                    Your personal gallery — collect, curate, and arrange images exactly the way you want them.
                </div>
                <div className={styles["brand-tiles"]}>
                    {TILES.map((_, i) => <div key={i} className={styles["brand-tile"]} />)}
                </div>
            </div>
        </>
    );
}
