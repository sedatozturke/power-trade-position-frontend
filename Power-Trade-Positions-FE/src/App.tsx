import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import ReportsList from './pages/Reports';
import ReportDetail from './pages/Reports/Detail';
import Error404 from './pages/Error404';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/reports" element={<ReportsList />} />
        <Route path="/reports/:id" element={<ReportDetail />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )


}

export default App
