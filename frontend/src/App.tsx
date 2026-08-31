import { useState } from 'react';
import Login from './Login';
import Sidebar from './Sidebar';
import Dashboard from './pages/dashboard/Dashboard';
import Pos from './pages/pos/Pos';
import Bookshop from './pages/bookshop/Bookshop';
import Accounts from './pages/accounts/Accounts';
import Hr from './pages/hr/Hr';
import Settings from './pages/settings/Settings';
import ClientPortal from './pages/client-portal/ClientPortal';
import ClientOrders from './pages/client-orders/ClientOrders';
import Inventory from './pages/inventory/Inventory';
import Customers from './pages/customers/Customers';
import Finance from './pages/finance/Finance';
import './App.css';

const PAGES: Record<string, React.JSX.Element> = {
  dashboard: <Dashboard />,
  bookshop: <Bookshop />,
  pos: <Pos />,
  accounts: <Accounts />,
  hr: <Hr />,
  settings: <Settings />,
  'client-portal': <ClientPortal />,
  'client-orders': <ClientOrders />,
    inventory: <Inventory />,
      customers: <Customers />,
        finance: <Finance />,
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive] = useState('dashboard');

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <div className="app-layout">
      <Sidebar active={active} setActive={setActive} />
      <div className="main-content">{PAGES[active]}</div>
    </div>
  );
}

export default App;