import styled from 'styled-components';
import { BookingType } from '../../types';
import Heading from '../../ui/Heading';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { useDarkMode } from '../../context/DarkModeContext';
import { START_DATA_DARK, START_DATA_LIGHT } from '../../const';

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

type PieChartStartData = {
  duration: string;
  value: number;
  color: string;
};
// Prepare data for a chart
function prepareData(startData: PieChartStartData[], stays: BookingType[]) {
  function incArrayValue(arr: PieChartStartData[], field: string) {
    return arr.map((obj) => (obj.duration === field ? { ...obj, value: obj.value + 1 } : obj));
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.num_nights;
      if (num === 1) return incArrayValue(arr, '1 night');
      if (num === 2) return incArrayValue(arr, '2 nights');
      if (num === 3) return incArrayValue(arr, '3 nights');
      if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 nights');
      if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 nights');
      if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 nights');
      if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21 nights');
      if (num >= 21) return incArrayValue(arr, '21+ nights');
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

type DurationChartProps = {
  confirmedStays: BookingType[];
};

function DurationChart({ confirmedStays }: DurationChartProps) {
  const { isDarkMode } = useDarkMode();
  
  const startData = isDarkMode ? START_DATA_DARK : START_DATA_LIGHT;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {startData.map((entry) => (
              <Cell fill={entry.color} stroke={entry.color} key={entry.duration} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="middle" align="right" width={100} layout="vertical" iconSize={15} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
