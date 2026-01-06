"use client";

import styles from "./User.module.css";
import { authService } from "src/services";
import { useUser } from "src/hooks/useUser";
import { useState, useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";
import { clearInterval, setInterval } from "worker-timers";
import { IdleModal } from "src/components/modals";
import { OverlayBackground } from "src/components/backgrounds";

const UserLayout = ({ children }) => {
  const sessionIntervalRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isModalLocked, setIsModalLocked] = useState(false);

  const { settings } = useUser();

  const idleTimer = useIdleTimer({
    onIdle: handleIdle,
    onActive: handleActive,
    timeout: (settings?.notifications.timeoutAlerts || 15) * 60 * 1000,
  });

  function handleActive() {
    if (!isModalLocked) {
      idleTimer.reset();
    }
  }

  function handleStayLoggedIn() {
    clearInterval(sessionIntervalRef.current);
    setShowModal(false);
    setCountdown(60);
    setIsModalLocked(false);
    idleTimer.reset();
  }

  async function handleLogout() {
    clearInterval(sessionIntervalRef.current);
    await authService.logout();
  }

  function handleIdle() {
    setShowModal(true);
    setIsModalLocked(true);

    sessionIntervalRef.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
  }

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(sessionIntervalRef.current);
      handleLogout();
    }
  }, [countdown]);

  return (
    <main className={styles.layout}>
      {showModal && (
        <>
          <OverlayBackground position="fixed" isBlur />
          <div className={styles.modal}>
            <IdleModal
              text={countdown}
              onSubmit={handleStayLoggedIn}
              onCancel={handleLogout}
            />
          </div>
        </>
      )}
      {children}
    </main>
  );
};

export default UserLayout;
