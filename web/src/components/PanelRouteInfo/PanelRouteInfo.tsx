import styles from "./PanelRouteInfo.module.scss";

const averageSpeed = 60; // kmph

interface IPanelRouteProps {
  distance: number;
}

export default function PanelRouteInfo({ distance }: IPanelRouteProps) {
  const hours = distance / 1000 / averageSpeed;
  const minutes = (hours % 1) * 60;
  const roundedMinutes = Math.round(minutes);

  return (
    <div className={styles.root}>
      <div className={styles.line}></div>
      <p className={styles.text}>
        <span>
          {distance < 2000
            ? `${distance}m`
            : `${Math.floor(distance / 10) / 100} km`}
        </span>
        <br />~ {Math.floor(hours)}h {roundedMinutes}min
      </p>
    </div>
  );
}
