import { useState, useEffect } from "react";

export function useUpgradeTimer(
  upgradeEndTime: number | null,
  onFinish: () => void
) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!upgradeEndTime) return;

    const updateTimer = () => {
      const remaining = Math.max(
        Math.ceil((upgradeEndTime - Date.now()) / 1000),
        0
      );
      setTimer(remaining);
      if (remaining === 0) onFinish();
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [upgradeEndTime]);

  return timer;
}
