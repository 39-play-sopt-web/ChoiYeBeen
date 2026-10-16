import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";

function ResultModal({ result, onConfirm }) {
  const confirmButtonRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;

    confirmButtonRef.current?.focus();

    return () => {
      previousFocus?.focus();
    };
  }, []);

  return createPortal(
    <Overlay>
      <Modal role="dialog" aria-modal="true" aria-labelledby="result-title">
        <h2 id="result-title">🎉게임 완료!</h2>
        <p>Level {result.level}</p>
        <PlayTime>{(result.playTime / 1000).toFixed(2)}초</PlayTime>

        <ConfirmButton
          ref={confirmButtonRef}
          type="button"
          onClick={onConfirm}
          onKeyDown={(event) => {
            if (event.key === "Tab") {
              event.preventDefault();
            }
          }}
        >
          확인
        </ConfirmButton>
      </Modal>
    </Overlay>,
    document.body,
  );
}

export default ResultModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.overlay};
`;

const Modal = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 32px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.surface};
  color: ${({ theme }) => theme.color.text};
  box-shadow: ${({ theme }) => theme.shadow.modal};
  text-align: center;

  h2 {
    margin: 0 0 16px;
  }
`;

const PlayTime = styled.p`
  margin: 20px 0;
  font-size: 32px;
  font-weight: 700;
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.primaryText};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
`;
