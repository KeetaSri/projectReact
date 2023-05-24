import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [editedItem, setEditedItem] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  };

  const handleInputChange = (event, id) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return { ...item, name: event.target.value };
      }
      return item;
    });
    setData(updatedData);
  };

  const handleEditItem = (id) => {
    setEditedItem(id);
  };

  const handleSaveItem = (id) => {
    const updatedItem = data.find(item => item.id === id);
    if (updatedItem && updatedItem.name.trim() !== '') {
      fetch(`http://localhost:5000/api/data/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: updatedItem.name.trim() }),
      })
        .then(response => response.json())
        .then(() => {
          setEditedItem('');
          fetchData();
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div>
      <h1>Frontend Web App</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <input
              type="text"
              value={item.id === editedItem ? item.name : item.name}
              readOnly={item.id !== editedItem}
              onChange={event => handleInputChange(event, item.id)}
            />
            {item.id !== editedItem && (
              <button onClick={() => handleEditItem(item.id)}>Edit</button>
            )}
            {item.id === editedItem && (
              <button onClick={() => handleSaveItem(item.id)}>Save</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;