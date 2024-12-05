import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/user/selectors';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const MonthInfoChart = ({ data  }) => {

  const userData = useSelector(selectUser)

  return <div style={{ width: '100%', overflowX: 'auto' }}>
    <AreaChart
    data={data}
    margin={{
      top: 10,
      right: 30,
      left: 0,
      bottom: 0,
    }}
  >
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="40%" stopColor="var(--main-color)" stopOpacity={0.9} />
        <stop offset="100%" stopColor="var(--main-color)" stopOpacity={0} />
      </linearGradient>
    </defs>
    <XAxis dataKey="name" axisLine={false} tickLine={false} />
    <YAxis axisLine={false} tickLine={false} domain={[0, userData.data.dailyNorm]}/>
    <Tooltip />
    <Area type="linear" dataKey="amount" stroke="var(--hover-green-color)" strokeWidth={2} fill="url(#gradient1)" dot={{
      r: 10,
      stroke: "var(--hover-green-color)",
      strokeWidth: 3,
      fill: "#ffffff",
    }}
    activeDot={false}/>
  </AreaChart>
  </div>
}

export default MonthInfoChart