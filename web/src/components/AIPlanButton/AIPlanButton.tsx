"use client"

import {Button} from "@/components/ui/button"
import styles from "./AIPlanButton.module.scss";

export default function AIPlanButton() {
    return (
        <Button className={styles.aiPlanButton} onClick={click}>Naplánovat Trasu</Button>
    );
}

const click = () => {
    open("/planner");
}