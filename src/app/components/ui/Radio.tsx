// src/components/ui/Radio/Radio.tsx

import React from 'react';
import styled from 'styled-components';
import { RadioProps } from './Radio.types';

const Radio: React.FC<RadioProps> = ({ options, value, onChange }) => {
  return (
    <StyledWrapper>
      <div className="glass-radio-group">
        {options.map((opt) => (
          <React.Fragment key={opt.value}>
            <input
              type="radio"
              name="glass-radio"
              id={`glass-${opt.value}`}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange(e.target.value)}
            />
            <label htmlFor={`glass-${opt.value}`}>{opt.label}</label>
          </React.Fragment>
        ))}
        <div
          className="glass-glider"
          style={{ width: `calc(100% / ${options.length})` }}
        />
      </div>
    </StyledWrapper>
  );
};

export default Radio;

// styled-component styles
const StyledWrapper = styled.div`
  .glass-radio-group {
    --bg: rgba(255, 255, 255, 0.06);
    --text: #e5e5e5;
    display: flex;
    position: relative;
    background: #525252;
    border-radius: 1rem;
    backdrop-filter: blur(12px);
    box-shadow:
      inset 1px 1px 4px rgba(255, 255, 255, 0.2),
      inset -1px -1px 6px rgba(0, 0, 0, 0.3),
      0 4px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    width: fit-content;
  }

  .glass-radio-group input {
    display: none;
  }

  .glass-radio-group label {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 80px;
    font-size: 14px;
    padding: 0.8rem 1.6rem;
    cursor: pointer;
    font-weight: 600;
    letter-spacing: 0.3px;
    color: #ebb433;
    position: relative;
    z-index: 2;
    transition: color 0.3s ease-in-out;
  }

  .glass-radio-group label:hover {
    color: #010203;
  }

  .glass-radio-group input:checked + label {
    color: #fff;
  }

  .glass-glider {
    position: absolute;
    top: 0;
    bottom: 0;
    width: calc(100% / 3); /* dynamically overwritten in inline style */
    border-radius: 1rem;
    z-index: 1;
    transition:
      transform 0.5s cubic-bezier(0.37, 1.95, 0.66, 0.56),
      background 0.4s ease-in-out,
      box-shadow 0.4s ease-in-out;
  }

  ${'' /* These selectors assume fixed IDs. You may make them dynamic later */}
  #glass-createdAt:checked ~ .glass-glider {
    transform: translateX(0%);
    background: linear-gradient(135deg, #ffd70055, #ffcc00);
    box-shadow: 0 0 18px rgba(255, 215, 0, 0.5), 0 0 10px rgba(255, 235, 150, 0.4) inset;
  }

  #glass-productPrice:checked ~ .glass-glider {
    transform: translateX(100%);
    background: linear-gradient(135deg, #ffd70055, #ffcc00);
    box-shadow: 0 0 18px rgba(255, 215, 0, 0.5), 0 0 10px rgba(255, 235, 150, 0.4) inset;
  }

  #glass-productViews:checked ~ .glass-glider {
    transform: translateX(200%);
    background: linear-gradient(135deg, #ffd70055, #ffcc00);
    box-shadow: 0 0 18px rgba(255, 215, 0, 0.5), 0 0 10px rgba(255, 235, 150, 0.4) inset;
  }
`;