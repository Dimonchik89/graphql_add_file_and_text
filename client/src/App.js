import { useQuery } from '@apollo/client';
import { GET_USERS } from './api/userApi';
import AddUser from './components/AddUser';
import './App.css';

function App() {
  const { data, loading } = useQuery(GET_USERS, {
    onCompleted: data => console.log(data)
  })

  if(loading) {
    return <h3>Loading...</h3>
  }

  const content = data?.getUsers.map(item => <li key={item.id}>{item.name}</li>)

  return (
    <div className="App">
      <ul>
        {content}
      </ul>
      <AddUser users={data?.getUsers}/>
    </div>
  );
}

export default App;
