import css from "./WaterChart.module.css";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

import { useSelector } from "react-redux";
import { selectMonth, selectMonthWater } from "../../redux/water/selectors";
import { selectDaylyNorm } from "../../redux/auth/selectors";

export default function WaterChart() {
  const currentMonth = useSelector(selectMonth);
  const monthWater = useSelector(selectMonthWater);
  const daylyNorm = useSelector(selectDaylyNorm);

  const dailyGoalMl = Number(daylyNorm) || 0;
  const dailyMl = monthWater || [];

  const [mRaw, yRaw] = (currentMonth || "").split(".").map(Number);
  const month =
    Number.isFinite(mRaw) && mRaw >= 1 && mRaw <= 12
      ? mRaw
      : new Date().getMonth() + 1;
  const year = Number.isFinite(yRaw) ? yRaw : new Date().getFullYear();
  const daysInMonth = new Date(year, month, 0).getDate();

  const data = useMemo(
    () =>
      Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,
        ml: Number(dailyMl[i + 1]) || 0,
      })),
    [dailyMl, daysInMonth]
  );

  const maxMl = useMemo(
    () => Math.max(dailyGoalMl, ...data.map(d => d.ml), 1000),
    [data, dailyGoalMl]
  );
  const yMax = useMemo(() => Math.ceil((maxMl * 1.15) / 250) * 250, [maxMl]);

  const mlToLiters = v => `  ${(v / 1000).toFixed(1)} L`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const ml = payload[0].value;
    return (
      <div className={css.tooltipBox}>
        <div className={css.tooltipLabel}>Day {label}</div>
        <div className={css.tooltipValue}>{ml} ml</div>
      </div>
    );
  };

  const boxRef = useRef(null);
  const [size, setSize] = useState({ width: 247, height: 373 });

  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const measure = () => {
      const style = getComputedStyle(el);
      const w = el.clientWidth;

      const h = el.clientHeight || parseFloat(style.height) || 373;
      if (w > 0 && h > 0) setSize({ width: w, height: h });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={boxRef} className={css.chart}>
      <AreaChart
        width={size.width}
        height={size.height}
        data={data}
        margin={{ top: 24, right: 12, bottom: 24, left: 0 }}
      >
        <defs>
          <linearGradient id="waterGradientMonth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <CartesianGrid
          vertical={false}
          strokeDasharray="3 3"
          strokeOpacity={0.25}
        />

        <XAxis
          dataKey="day"
          tickMargin={8}
          axisLine={false}
          tickLine={false}
          interval={Math.ceil(daysInMonth / 14)}
        />

        <YAxis
          width={50}
          domain={[0, yMax]}
          tickFormatter={mlToLiters}
          tickMargin={8}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: "#94a3b8", strokeDasharray: "3 3" }}
        />

        <ReferenceLine y={dailyGoalMl} stroke="#16a34a" strokeDasharray="4 4" />

        <Area
          type="monotone"
          dataKey="ml"
          stroke="#16a34a"
          fill="url(#waterGradientMonth)"
          strokeWidth={3}
          dot={{ r: 3, strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </div>
  );
}
