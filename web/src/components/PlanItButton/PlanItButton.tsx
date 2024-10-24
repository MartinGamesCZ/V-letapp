"use client"

import {Button} from "@/components/ui/button"
import styles from "./PlanItButton.module.scss";

export default function PlanItButton() {
    return (
        <Button className={styles.planItButton} onClick={click}>Naplánovat Manuálně</Button>
    );
}

const click = () => {
    open("/planner");
}