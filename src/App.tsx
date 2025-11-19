import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { GiftListPage } from './components/GiftListPage';
import { LoginPage } from './components/LoginPage';
import { Person, authenticatePerson } from './lib/airtable';

function App() {
  const [loggedInPerson, setLoggedInPerson] = useState<Person | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (firstName: string, code: string) => {
    setLoginError(null);
    const person = await authenticatePerson(firstName, code);

    if (person) {
      setLoggedInPerson(person);
    } else {
      setLoginError('Prénom ou code incorrect');
    }
  };

  const handleLogout = () => {
    setLoggedInPerson(null);
    setSelectedPerson(null);
  };

  if (!loggedInPerson) {
    return <LoginPage onLogin={handleLogin} error={loginError} />;
  }

  return (
    <>
      {selectedPerson ? (
        <GiftListPage
          person={selectedPerson}
          loggedInPerson={loggedInPerson!} // ← passer le loggedInPerson ici
          onBack={() => setSelectedPerson(null)}
        />
      ) : (
        <HomePage
          onSelectPerson={setSelectedPerson}
          loggedInPerson={loggedInPerson}
          onLogout={handleLogout}
        />
      )}
    </>
  );  
}

export default App;
