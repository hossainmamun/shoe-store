import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';

const Dashboard = () => {
   return (
      <div>
         <div className='md:flex justify-start md:relative'>
            <Sidebar />
            <Outlet />
         </div>
      </div>
   );
};

export default Dashboard;
