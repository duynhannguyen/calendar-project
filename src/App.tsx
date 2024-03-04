import './App.css';
import Calendar from './components/Calendar/Calendar';
import { EventsProvider } from './context/Event';

function App() {
  return (
    <EventsProvider>
      <Calendar />
    </EventsProvider>
  );
}

export default App;
