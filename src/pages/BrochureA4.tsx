import React from "react";
import "../styles/brochure-a4.css";

export default function BrochureA4() {
  return (
    <div className="brochure-wrapper">
      {/* 앞면Spread */}
      <div className="spread spread-front">
        <div className="panel page-4">{/* 4번(뒷표지) */}</div>

        {/* 1번(앞표지) */}
        <div className="panel page-1 bg-hero-here">
          {/* 텍스트/이미지는 Canva에서 따로 얹을 것이므로 이 div는 배경만 보이도록 */}
        </div>
      </div>

      {/* 뒷면Spread */}
      <div className="spread spread-back">
        <div className="panel page-2">{/* 2번(안쪽 왼쪽) */}</div>
        <div className="panel page-3">{/* 3번(안쪽 오른쪽) */}</div>
      </div>
    </div>
  );
}
