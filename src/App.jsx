import SharedLayout from './components/SharedLayout/SharedLayout.jsx';
import { lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import ModalWindow from './components/Modal/Modal.jsx';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

Modal.setAppElement('#root');

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <SharedLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </SharedLayout>

      <ModalWindow />
    </>
  );
}

export default App;
